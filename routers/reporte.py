from flask import Blueprint, Response
from models.reportes import Reportes
from models.enfermedad import Enfermedad
import time
from os import getcwd
from fpdf import FPDF
from utils.referencias import *

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
reporte = Blueprint('reporte', __name__)
PATH_FILE = getcwd() + "/static/uploads/empresa/"

def Empresa():
    empresa = Reportes.Traer_empresa()
    return empresa

#ver reporte de cerdos en galpon
@reporte.route('/reporte_galpo_cerdo/<int:id>')
def reporte_galpo_cerdo(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Reporte galpón cerdos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer el galpon de los cerdo
    data = Reportes.Listar_galpon(id)
    #para traer los cerdos del galpon
    lista_datos = Reportes.Cerdo_galpon(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Galpón', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='N° galpón: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=44, h=h_sep, txt='Tipo: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='Capacidad:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=45, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=63, h=h_sep, txt='Cerdos en galpón:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Cerdos dentro del galpón', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=10, h=10, txt='#', border=0, align='C', fill=1)
    pdf.cell(w=30, h=10, txt='Fecha', border=0, align='C', fill=1)
    pdf.cell(w=50, h=10, txt='Código', border=0, align='C', fill=1)
    pdf.cell(w=30, h=10, txt='Sexo', border=0, align='C',fill=1)
    pdf.cell(w=30, h=10, txt='Raza', border=0, align='C',fill=1)
    pdf.multi_cell(w=0, h=10, txt='Peso kg', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=10, h=10, txt=str(c), border='TBL', align='C', fill=1)
        pdf.cell(w=30, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)
        pdf.cell(w=50, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)
        pdf.cell(w=30, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)
        pdf.cell(w=30, h=10, txt=str(datos[3]), border='TB', align='C', fill=1)        
        pdf.multi_cell(w=0, h=10, txt=str(datos[4]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################

#ver reporte de compras alimentos
@reporte.route('/compra_alimento/<int:id>')
def compra_alimento(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Compra de alimentos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer la compra del alimento
    data = Reportes.Listar_compra_alimento(id)
    #para traer el detalle de la compra
    lista_datos = Reportes.Detalle_compra_alimento(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    if data[11] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA COMPRA FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Compra', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='Proveedor: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=44, h=h_sep, txt='Rúc: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Fecha:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=30, h=h_sep, txt='N° compra:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=45, h=h_sep, txt='Documento:', border=0, align='R', fill=0)

    if(data[6] == 'Factura'):
        tipo = "Factura"
    else:
        tipo = "Nota compra"

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(tipo), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Iva:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[7]) + "%", border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Alimentos comprados', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=7, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=75, h=10, txt='Alimento', border=0, align='C', fill=1)
    pdf.cell(w=25, h=10, txt='Precio', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Cantidad', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Descuento', border=0, align='C',fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=7, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=75, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt="$ " + str(datos[3]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt=str(datos[4]), border='TB', align='C', fill=1)   
        pdf.cell(w=25, h=10, txt="$ " + str(datos[5]), border='TB', align='C', fill=1)        
        pdf.multi_cell(w=0, h=10, txt="$ " + str(datos[6]), border='TBR', align='C', fill=1)

    tcol_set(pdf, 'black') 
    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="SubTotal: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[8]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Impuesto: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[9]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Total: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[10]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################

#ver reporte de alimentacion
@reporte.route('/reporte_alimentacion/<int:id>')
def reporte_alimentacion(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Alimentación de cerdos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer la compra del alimento
    data = Reportes.Listar_alimentacion(id)
    #para traer el detalle de la compra
    lista_datos = Reportes.Cerdos_alimentados(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Alimento', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=22, h=h_sep, txt='Alimento: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=60, h=h_sep, txt='Usuario: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Fecha:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=60, h=h_sep, txt='Cantidad sacos:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=45, h=h_sep, txt='', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt="", border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=28, h=h_sep, txt='Observación:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Cerdos alimentados', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=7, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=120, h=10, txt='Cerdos', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Peso (Kg)', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=7, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=120, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)       
        pdf.multi_cell(w=0, h=10, txt=str(datos[1]) + " Kg", border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################

#ver reporte de compras insumos
@reporte.route('/compra_insumo/<int:id>')
def compra_insumo(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Compra de insumos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer la compra del insumo
    data = Reportes.Listar_compra_insumos(id)
    #para traer el detalle de la compra
    lista_datos = Reportes.Detalle_compra_insumos(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    if data[11] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA COMPRA FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Compra', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='Proveedor: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=44, h=h_sep, txt='Rúc: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Fecha:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=30, h=h_sep, txt='N° compra:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=45, h=h_sep, txt='Documento:', border=0, align='R', fill=0)

    if(data[6] == 'Factura'):
        tipo = "Factura"
    else:
        tipo = "Nota compra"

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(tipo), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Iva:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[7]) + "%", border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Insumos comprados', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=7, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=75, h=10, txt='Insumos', border=0, align='C', fill=1)
    pdf.cell(w=25, h=10, txt='Precio', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Cantidad', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Descuento', border=0, align='C',fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=7, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=75, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt="$ " + str(datos[3]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt=str(datos[4]), border='TB', align='C', fill=1)   
        pdf.cell(w=25, h=10, txt="$ " + str(datos[5]), border='TB', align='C', fill=1)        
        pdf.multi_cell(w=0, h=10, txt="$ " + str(datos[6]), border='TBR', align='C', fill=1)

    tcol_set(pdf, 'black') 
    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="SubTotal: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[8]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Impuesto: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[9]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Total: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[10]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################

#ver reporte de compras medicamentos
@reporte.route('/compra_medicamento/<int:id>')
def compra_medicamento(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Compra de medicamento', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer la compra del medicamneto
    data = Reportes.Listar_compra_medicinas(id)
    #para traer el detalle de la compra
    lista_datos = Reportes.Detalle_compra_medicamneto(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    if data[11] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA COMPRA FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Compra', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='Proveedor: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=44, h=h_sep, txt='Rúc: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Fecha:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=30, h=h_sep, txt='N° compra:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=45, h=h_sep, txt='Documento:', border=0, align='R', fill=0)

    if(data[6] == 'Factura'):
        tipo = "Factura"
    else:
        tipo = "Nota compra"

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(tipo), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Iva:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[7]) + "%", border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Medicamentos comprados', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=7, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=75, h=10, txt='Medicamento', border=0, align='C', fill=1)
    pdf.cell(w=25, h=10, txt='Precio', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Cantidad', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Descuento', border=0, align='C',fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=7, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=75, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt="$ " + str(datos[3]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt=str(datos[4]), border='TB', align='C', fill=1)   
        pdf.cell(w=25, h=10, txt="$ " + str(datos[5]), border='TB', align='C', fill=1)        
        pdf.multi_cell(w=0, h=10, txt="$ " + str(datos[6]), border='TBR', align='C', fill=1)

    tcol_set(pdf, 'black') 
    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="SubTotal: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[8]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Impuesto: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[9]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Total: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[10]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################
    
#ver reporte de compras historias tratamientos del cerdo
@reporte.route('/historia_tratamiento_cerdo/<int:id>/<int:idd>')
def historia_tratamiento_cerdo(id, idd):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Tratamiendo del cerdo', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.tratamiendo_cerdo(id)
    enfermedad = Reportes.Detalle_enfermedad(idd)
    insumo = Enfermedad.Traer_insumo_enfermedad_detalle(id)
    medicamento = Enfermedad.Traer_insumo_medicamento_detalle(id)
    tratamiento = Enfermedad.Traer_insumo_tratamiento_detalle(id)

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Detalle', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 10
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Cerdo: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=110, h=h_sep, txt='Veterinario: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Peso:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=50, h=h_sep, txt='Tratamiento Fecha inicio:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=60, h=h_sep, txt='Tratamiento Fecha fin:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[6]), border=0, align='L', fill=0)

    # fila 3 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=22, h=h_sep, txt='Sintomas:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[9]), border=0, align='L', fill=0)

    # fila 4 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=27, h=h_sep, txt='Diagnostico:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[10]), border=0, align='L', fill=0)

    # fila 5 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=28, h=h_sep, txt='Observacion:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[7]), border=0, align='L', fill=0)

    pdf.ln(2)

    # tabla 1 ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Enfermedades', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.multi_cell(w=262, h=10, txt='Enfermedad', border=0, align='C', fill=1)
    # pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    # pdf.rect(x=10, y=60, w=50, h=53)
    c = 0
    
    for datos in enfermedad:
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)              
        pdf.multi_cell(w=0, h=10, txt= str(datos[1]), border='TBR', align='C', fill=1)
    
    pdf.ln(2)

    # tabla 2----

    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Insumos', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=200, h=10, txt='Insumo', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Cantidad', border=0, align='C', fill=1)
    # pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    # pdf.rect(x=10, y=60, w=50, h=53)
    c = 0
    
    for datos in insumo:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=200, h=10, txt=str(datos[0] + " " + datos[1]), border='TB', align='C', fill=1)              
        pdf.multi_cell(w=0, h=10, txt= str(datos[2]), border='TBR', align='C', fill=1)
    
    pdf.ln(2)

    # tabla 3 ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Medicamento', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=200, h=10, txt='Medicamento', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Cantidad', border=0, align='C', fill=1)
    # pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    # pdf.rect(x=10, y=60, w=50, h=53)
    c = 0
    
    for datos in medicamento:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=200, h=10, txt=str(datos[0] + " " + datos[1]), border='TB', align='C', fill=1)              
        pdf.multi_cell(w=0, h=10, txt= str(datos[2]), border='TBR', align='C', fill=1)

    pdf.ln(2)

    # tabla 3 ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Tratamiento', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Tratamiento', border=0, align='C', fill=1) 
    # pdf.multi_cell(w=0, h=10, txt='Cantidad', border=0, align='C', fill=1)
    # pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    # pdf.rect(x=10, y=60, w=50, h=53)
    c = 0
    
    for datos in tratamiento:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=14, h=10, txt=str(c), border='TBL', align='C', fill=1)                
        pdf.multi_cell(w=0, h=10, txt= str(datos[0]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de compra alimento por fechas
    
#ver informa de compra alimento por fechas
@reporte.route('/informa_c_alimento/<string:f_i>/<string:f_f>')
def informa_c_alimento(f_i, f_f):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe compra de alimento', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Informe_compras_alimento(f_i, f_f) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Fecha inicio: " + f_i + " - Fecha fin: " + f_f, border=0, align='C', fill=1)
    tfont(pdf, '')

    pdf.ln(2)
    tfont_size(pdf, 12)

    pdf.ln(2)

    # tabla 3 ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Compras de alimento', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Fecha', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='N° compra', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Iva%', border=0, align='C', fill=1) 
    pdf.cell(w=50, h=10, txt='Subtotal', border=0, align='C', fill=1) 
    pdf.cell(w=60, h=10, txt='Impuesto', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0
    valor = 0
    
    for datos in data:
        
        c += 1
        valor += datos[5]
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[2])+' %', border='TB', align='C', fill=1)                
        pdf.cell(w=50, h=10, txt="$. "+str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=60, h=10, txt="$. "+str(datos[4]), border='TB', align='C', fill=1) 
        pdf.multi_cell(w=0, h=10, txt="$. "+str(datos[5]), border='TBR', align='C', fill=1)
    
    tcol_set(pdf, 'black') 
    pdf.cell(w=15, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=50, h=10, txt="", border='TB', align='C', fill=1)  
    pdf.cell(w=60, h=10, txt="Total:", border='TB', align='C', fill=1)       
    pdf.multi_cell(w=0, h=10, txt="$. " + str(valor), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de compra insumos por fechas
    
#ver informa de compra insumos por fechas
@reporte.route('/informa_c_insumos/<string:f_i>/<string:f_f>')
def informa_c_insumos(f_i, f_f):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe compra de insumos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Informe_compras_insumo(f_i, f_f) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Fecha inicio: " + f_i + " - Fecha fin: " + f_f, border=0, align='C', fill=1)
    tfont(pdf, '')

    pdf.ln(2)
    tfont_size(pdf, 12)

    pdf.ln(2)

    # tabla 3 ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Compras de insumos', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Fecha', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='N° compra', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Iva%', border=0, align='C', fill=1) 
    pdf.cell(w=50, h=10, txt='Subtotal', border=0, align='C', fill=1) 
    pdf.cell(w=60, h=10, txt='Impuesto', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0
    valor = 0
    
    for datos in data:
        
        c += 1
        valor += datos[5]
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[2])+' %', border='TB', align='C', fill=1)                
        pdf.cell(w=50, h=10, txt="$. "+str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=60, h=10, txt="$. "+str(datos[4]), border='TB', align='C', fill=1) 
        pdf.multi_cell(w=0, h=10, txt="$. "+str(datos[5]), border='TBR', align='C', fill=1)
    
    tcol_set(pdf, 'black') 
    pdf.cell(w=15, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=50, h=10, txt="", border='TB', align='C', fill=1)  
    pdf.cell(w=60, h=10, txt="Total:", border='TB', align='C', fill=1)       
    pdf.multi_cell(w=0, h=10, txt="$. " + str(valor), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de compra medicamento por fechas
    
#ver informa de compra medicamento por fechas
@reporte.route('/informa_c_medicamentos/<string:f_i>/<string:f_f>')
def informa_c_medicamentos(f_i, f_f):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe compra de medicamentos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Informe_compras_medicamentos(f_i, f_f) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Fecha inicio: " + f_i + " - Fecha fin: " + f_f, border=0, align='C', fill=1)
    tfont(pdf, '')

    pdf.ln(2)
    tfont_size(pdf, 12)

    pdf.ln(2)

    # tabla 3 ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Compras de medicamentos', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Fecha', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='N° compra', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Iva%', border=0, align='C', fill=1) 
    pdf.cell(w=50, h=10, txt='Subtotal', border=0, align='C', fill=1) 
    pdf.cell(w=60, h=10, txt='Impuesto', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0
    valor = 0
    
    for datos in data:
        
        c += 1
        valor += datos[5]
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[2])+' %', border='TB', align='C', fill=1)                
        pdf.cell(w=50, h=10, txt="$. "+str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=60, h=10, txt="$. "+str(datos[4]), border='TB', align='C', fill=1) 
        pdf.multi_cell(w=0, h=10, txt="$. "+str(datos[5]), border='TBR', align='C', fill=1)
    
    tcol_set(pdf, 'black') 
    pdf.cell(w=15, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=40, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=50, h=10, txt="", border='TB', align='C', fill=1)  
    pdf.cell(w=60, h=10, txt="Total:", border='TB', align='C', fill=1)       
    pdf.multi_cell(w=0, h=10, txt="$. " + str(valor), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de control de peso del cerdo por fechas
    
#ver informa de control de peso del cerdo por fechas
@reporte.route('/informa_control_peso/<string:f_i>/<string:f_f>/<int:id>')
def informa_control_peso(f_i, f_f, id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe control de peso', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    cerdo = Reportes.Cerdos_reporte(id) 
    data = Reportes.Informe_control_peso(f_i, f_f, id) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()
    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Fecha inicio: " + f_i + " - Fecha fin: " + f_f, border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 10
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Cerdo: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(cerdo[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=110, h=h_sep, txt='N° de galpón: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=50, h=h_sep, txt=str(cerdo[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Peso:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=25, h=h_sep, txt=str(cerdo[2]) + " Kg", border=0, align='L', fill=0)
 
    pdf.ln(2)

    # tabla ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Control de peso', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=30, h=10, txt='Fecha', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Metodo', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Estado del cerdo', border=0, align='C', fill=1) 
    pdf.cell(w=55, h=10, txt='Peso anterior (Kg)', border=0, align='C', fill=1) 
    pdf.cell(w=60, h=10, txt='Peso (Bascula)', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Peso (Vivo)', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0
    metodo = ''
    estado = ''
    peso_v = ''
    peso_b = ''
    
    for datos in data:
        
        c += 1

        if(datos[1] == 'vivo'): 
            metodo = 'Peso vivo'
        else:
            metodo = 'Peso exacto'
        
        if(datos[2] == 'd_flaco'): 
            estado = 'Demasiado flaco'
        elif(datos[2] == 'flaco'): 
            estado = 'Flaco'
        elif(datos[2] == 'gordo'): 
            estado = 'Gordo'
        else:
            estado = 'Demasiado Gordo'

        if(datos[4] == ''): 
            peso_b = '0'
        else:
            peso_b = datos[4]

        if(datos[5] == ''): 
            peso_v = '0'
        else:
            peso_v = datos[5]
        
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=30, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=35, h=10, txt=str(metodo), border='TB', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(estado), border='TB', align='C', fill=1)                
        pdf.cell(w=55, h=10, txt=str(datos[3])+ ' Kg', border='TB', align='C', fill=1)   
        pdf.cell(w=60, h=10, txt=str(peso_b)+" Kg", border='TB', align='C', fill=1)  
        pdf.multi_cell(w=0, h=10, txt=str(peso_v)+' Kg', border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de cerdos por raza
    
#ver informa de cerdos por raza
@reporte.route('/informa_cerdo_raza/<int:id>/<string:cerdo>')
def informa_cerdo_raza(id,cerdo):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe cerdos por raza', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Cerdos_por_raza(id) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()
    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Raza seleccionada: " + cerdo, border=0, align='C', fill=1)
    tfont(pdf, '')

    pdf.ln(2)
    tfont_size(pdf, 12)

    pdf.ln(2)

    # tabla ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Cerdos por razas', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Código', border=0, align='C', fill=1) 
    pdf.cell(w=85, h=10, txt='Nombre', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Sexo', border=0, align='C', fill=1) 
    pdf.cell(w=45, h=10, txt='Raza', border=0, align='C', fill=1) 
    pdf.cell(w=20, h=10, txt='Peso', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Galpón', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0   
    for datos in data:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=85, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=35, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)                
        pdf.cell(w=45, h=10, txt=str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=20, h=10, txt=str(datos[4])+' Kg', border='TB', align='C', fill=1)  
        pdf.multi_cell(w=0, h=10, txt=str(datos[5]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#ver informa de todos los cerdos
@reporte.route('/informa_cerdo_full')
def informa_cerdo_full():
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe cerdos', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Cerdos_full() 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()
    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt="Cerdos disponibles", border=0, align='C', fill=1)
    tfont(pdf, '')

    pdf.ln(2)
    tfont_size(pdf, 12)

    pdf.ln(2)

    # tabla ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Cerdos', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Código', border=0, align='C', fill=1) 
    pdf.cell(w=85, h=10, txt='Nombre', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Sexo', border=0, align='C', fill=1) 
    pdf.cell(w=45, h=10, txt='Raza', border=0, align='C', fill=1) 
    pdf.cell(w=20, h=10, txt='Peso', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Galpón', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0   
    for datos in data:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=85, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=35, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)                
        pdf.cell(w=45, h=10, txt=str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=20, h=10, txt=str(datos[4])+' Kg', border='TB', align='C', fill=1)  
        pdf.multi_cell(w=0, h=10, txt=str(datos[5]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### informa de cerdo en galpon
    
#ver informa de cerdo en galpon por numero de galpon
@reporte.route('/informa_galpon_numero/<int:id>/<string:galpon>')
def informa_galpon_numero(id,galpon):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Informe cerdos por galpón', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt="Fecha de creación: " + fecha, border=0, ln=2, align='C', fill=0) 

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.Cerdos_por_galpon(id) 
    galpon_c = Reportes.Listar_galpon_cerdo(id)

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()
    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt=galpon, border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 10
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=23, h=h_sep, txt='N° galpón: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(galpon_c[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=70, h=h_sep, txt='Tipo de galpón: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=50, h=h_sep, txt=str(galpon_c[4]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=38, h=h_sep, txt='Capacidad:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=25, h=h_sep, txt=str(galpon_c[2]), border=0, align='L', fill=0)
 
    pdf.ln(2)

    # tabla ----
    
    tcol_set(pdf, 'black')
    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Cerdos por galpón', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=40, h=10, txt='Código', border=0, align='C', fill=1) 
    pdf.cell(w=85, h=10, txt='Nombre', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Sexo', border=0, align='C', fill=1) 
    pdf.cell(w=45, h=10, txt='Raza', border=0, align='C', fill=1) 
    pdf.cell(w=20, h=10, txt='Peso', border=0, align='C', fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Galpón', border=0, align='C', fill=1) 

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
 
    c = 0   
    for datos in data:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)   
        pdf.cell(w=40, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)   
        pdf.cell(w=85, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)   
        pdf.cell(w=35, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)                
        pdf.cell(w=45, h=10, txt=str(datos[3]), border='TB', align='C', fill=1)   
        pdf.cell(w=20, h=10, txt=str(datos[4])+' Kg', border='TB', align='C', fill=1)  
        pdf.multi_cell(w=0, h=10, txt=str(datos[5]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

####################### FACTURA DE COMPRA VACUNAS

#ver reporte de compras vacuna
@reporte.route('/compra_vacuna/<int:id>')
def compra_vacuna(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Compra de vacuna', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=65, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=55, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    #para traer la compra del vacunas
    data = Reportes.Listar_compra_vacuna(id)
    #para traer el detalle de la compra
    lista_datos = Reportes.Detalle_compra_vacuna(id)

    pdf = PDF(orientation='P', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)

    # 1er encabezado ----

    if data[11] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA COMPRA FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Compra', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 8
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=26, h=h_sep, txt='Proveedor: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=40, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=44, h=h_sep, txt='Rúc: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    # fila 2 --
    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Fecha:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=25, h=h_sep, txt=str(data[4]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=30, h=h_sep, txt='N° compra:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(data[5]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=45, h=h_sep, txt='Documento:', border=0, align='R', fill=0)

    if(data[6] == 'Factura'):
        tipo = "Factura"
    else:
        tipo = "Nota compra"

    tcol_set(pdf, 'black')
    pdf.cell(w=20, h=h_sep, txt=str(tipo), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=15, h=h_sep, txt='Iva:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[7]) + "%", border=0, align='L', fill=0)

    pdf.ln(2)
    # tabla ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Vacunas compradas', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')

    pdf.cell(w=7, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=75, h=10, txt='Vacuna', border=0, align='C', fill=1)
    pdf.cell(w=25, h=10, txt='Precio', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Cantidad', border=0, align='C',fill=1)
    pdf.cell(w=25, h=10, txt='Descuento', border=0, align='C',fill=1) 
    pdf.multi_cell(w=0, h=10, txt='Total', border=0, align='C',fill=1)

    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    pdf.rect(x=10, y=60, w=190, h=53)
    c = 0
    
    for datos in lista_datos:
        
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')

        pdf.cell(w=7, h=10, txt=str(c), border='TBL', align='C', fill=1) 
        pdf.cell(w=75, h=10, txt=str(datos[2]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt="$ " + str(datos[3]), border='TB', align='C', fill=1)
        pdf.cell(w=25, h=10, txt=str(datos[4]), border='TB', align='C', fill=1)   
        pdf.cell(w=25, h=10, txt="$ " + str(datos[5]), border='TB', align='C', fill=1)        
        pdf.multi_cell(w=0, h=10, txt="$ " + str(datos[6]), border='TBR', align='C', fill=1)

    tcol_set(pdf, 'black') 
    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="SubTotal: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[8]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Impuesto: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[9]), border='TBR', align='C', fill=1)

    pdf.cell(w=7, h=10, txt="", border='TBL', align='C', fill=1) 
    pdf.cell(w=75, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)
    pdf.cell(w=25, h=10, txt="", border='TB', align='C', fill=1)   
    pdf.cell(w=25, h=10, txt="Total: ", border='TB', align='C', fill=1)        
    pdf.multi_cell(w=0, h=10, txt="$ " + str(data[10]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################
    
#ver reporte de vacunacion de cerdos
@reporte.route('/vacunacion_cerdo_reporte/<int:id>')
def vacunacion_cerdo_reporte(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Vacunación del cerdo', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.vacunacion_cerdos(id)
    detalle = Reportes.Detalle_vacunacion_cerdos(id) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)
    
    if data[4] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA VACUNACIÓN FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Datos de la vacunación del cerdo', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 10
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Cerdo: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=70, h=h_sep, txt=str(data[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=110, h=h_sep, txt='Fecha vacunación: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    # fila 5 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=28, h=h_sep, txt='Observación:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    pdf.ln(2)

    # tabla 1 ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Vacunas', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')
    
    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=90, h=10, txt='Vacuna', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Cantidad', border=0, align='C', fill=1)  
    pdf.multi_cell(w=0, h=10, txt='Motivo de vacunación', border=0, align='C', fill=1) 
    
    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    c = 0
    for datos in detalle:
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')
        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)  
        pdf.cell(w=90, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)      
        pdf.cell(w=35, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)              
        pdf.multi_cell(w=0, h=10, txt= str(datos[2]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})

#######################
    
#ver reporte de desparasitacion de cerdos
@reporte.route('/desparasitacion_cerdo_reporte/<int:id>')
def desparasitacion_cerdo_reporte(id):
    fecha = time.strftime('%Y-%m-%d', time.localtime())
    empresa = Empresa()
    class PDF(FPDF):

        def header(self):

            self.image(PATH_FILE+str(empresa[4]),  x=10, y=10, w=30, h=30)
            self.set_font('Arial', '', 15)

            tcol_set(self, 'blue')
            tfont_size(self, 35)
            tfont(self, 'B')
            self.cell(w=0, h=20, txt='     Desparasitación del cerdo', border=0, ln=1, align='C', fill=0)

            tfont_size(self, 10)
            tcol_set(self, 'black')
            tfont(self, 'I')
            self.cell(w=0, h=10, txt=fecha, border=0, ln=2, align='C', fill=0)

            tfont_size(pdf, 10)
            bcol_set(pdf, 'white')

            pdf.cell(w=100, h=5, txt='Empresa: ' + str(empresa[0]) , border=0,  fill=1)
            pdf.cell(w=100, h=5, txt='Telefono: ' + str(empresa[1]) , border=0,  fill=1) 
            pdf.multi_cell(w=0, h=5, txt='Dirección: ' + str(empresa[3]) , border=0, fill=1)
            
            self.ln(5)

        # Page footer
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-20)

            # Arial italic 8
            self.set_font('Arial', 'I', 12)

            # Page number
            self.cell(w=0, h=10, txt='Pagina ' + str(self.page_no()) + '/{nb}', border=0, align='C', fill=0)
    
    data = Reportes.desparasitacion_cerdos(id)
    detalle = Reportes.Detalle_desparasitacion_cerdos(id) 

    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.alias_nb_pages()

    pdf.add_page()

    # TEXTO
    pdf.set_font('Arial', '', 15)
    
    if data[4] != True :              
        tcol_set(pdf, 'black')
        bcol_set(pdf, 'red')
        tfont_size(pdf, 15)
        tfont(pdf, 'B')
        pdf.multi_cell(w=0, h=10, txt='LA DESPARASITACIÓN FUE ANULADA', border=0, align='C', fill=1)
        tfont(pdf, '')

    # 1er encabezado ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.multi_cell(w=0, h=10, txt='Datos de la desparasitación del cerdo', border=0, align='C', fill=1)
    tfont(pdf, '')

    h_sep = 10
    pdf.ln(2)
    tfont_size(pdf, 12)

    # fila 1 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=17, h=h_sep, txt='Cerdo: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.cell(w=70, h=h_sep, txt=str(data[1]), border=0, align='L', fill=0)

    tcol_set(pdf, 'gray')
    pdf.cell(w=110, h=h_sep, txt='Fecha desparasitación: ', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[2]), border=0, align='L', fill=0)

    # fila 5 --

    tcol_set(pdf, 'gray')
    pdf.cell(w=28, h=h_sep, txt='Observación:', border=0, align='R', fill=0)

    tcol_set(pdf, 'black')
    pdf.multi_cell(w=0, h=h_sep, txt=str(data[3]), border=0, align='L', fill=0)

    pdf.ln(2)

    # tabla 1 ----

    bcol_set(pdf, 'green')
    tfont_size(pdf, 15)
    tfont(pdf, 'B')
    pdf.cell(w=0, h=10, txt='Medicamentos o desparasitantes', border=0, ln=1, align='C', fill=1)
    tfont(pdf, '')

    tfont_size(pdf, 13)
    bcol_set(pdf, 'blue')
    
    pdf.cell(w=15, h=10, txt='#', border=0, align='C', fill=1) 
    pdf.cell(w=90, h=10, txt='Desparasitantes', border=0, align='C', fill=1) 
    pdf.cell(w=35, h=10, txt='Cantidad', border=0, align='C', fill=1)  
    pdf.multi_cell(w=0, h=10, txt='Motivo desparasitación', border=0, align='C', fill=1) 
    
    tfont_size(pdf, 12)
    dcol_set(pdf, 'blue')
    tcol_set(pdf, 'gray')
    c = 0
    for datos in detalle:
        c += 1
        if(c % 2 == 0):
            bcol_set(pdf, 'gray2')
        else:
            bcol_set(pdf, 'white')
        pdf.cell(w=15, h=10, txt=str(c), border='TBL', align='C', fill=1)  
        pdf.cell(w=90, h=10, txt=str(datos[0]), border='TB', align='C', fill=1)      
        pdf.cell(w=35, h=10, txt=str(datos[1]), border='TB', align='C', fill=1)              
        pdf.multi_cell(w=0, h=10, txt= str(datos[2]), border='TBR', align='C', fill=1)

    return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf', headers={'Content-Disposition': 'inline;filename=Galpones_cerdos.pdf'})


