from flask import Blueprint, render_template, request, redirect, url_for
from flask import jsonify, session

#----- MODULOS -------
from models.alimento import Alimento
from models.usuario import Usuario
from models.cerdo import Cerdo
from models.galpon import Galpon 
from models.compras import Compras 
from models.enfermedad import Enfermedad 
from models.vacunas import Vacunas 
from models.web import Web  
#-------------------

from utils.Complemento import Complement
from datetime import datetime
import random

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
index = Blueprint('index', __name__)

# esto es el index que muestra cuando inicia el sistema
@index.route('/')
def Index():
    dato = Web.Traer_datos_web()
    razas = Web.Traer_datos_razas_cerdo()
    cerdo = Web.Traer_datos_cerdos()
    data = { 
        'raza': razas,
        'cerdo': cerdo
    } 
    return render_template('Web/index.html', dato = dato, data = data)

# esto es el login que muestra cuando inicia el sistema
@index.route('/Login')
def Login():
    if 'id_usu' in session and 'id_rol' in session:
        return redirect(url_for('index.Admin'))
    else:
        return render_template('Login/index.html')

# esto es el Admin que muestra cuando inicia el sistema
@index.route('/Admin')
def Admin():
    if 'id_usu' in session and 'id_rol' in session:
        ahora = datetime.now()
        now = Complement.current_date_format(ahora)
        dasboard = Usuario.Traer_datos_dashboard()
        data = {
            'dasboard': dasboard
        }
        return render_template('view/home/index.html', now = now, data = data)
    else:
        return redirect(url_for('index.Login'))

# controlador del inicio de sesión
@index.route('/diez_cerdos_gordos', methods=['GET'])
def diez_cerdos_gordos():
    dato = Usuario.Diez_cerdos_gordos()
    return jsonify(dato)

#vista para recuperara password 
@index.route('/recuperar')
def recuperar():  
    return render_template('Login/recuperar.html')

#vista pagina web
@index.route('/pag_web')
def pag_web(): 
    dato = Web.Traer_datos_web()
    return render_template('view/home/pag_web.html', dato = dato)

# controlador del inicio de sesión
@index.route('/Ingreso', methods=['POST'])
def Ingreso():
    _usuario = request.form['usuario']
    _pass = request.form['password']
    dato = Usuario.login(_usuario, _pass)
    return jsonify(dato)

# crear sesiones de usuario
@index.route('/Crear_variable', methods=['POST'])
def Crear_variable():
    session['id_usu'] = request.form['id_usu']
    session['id_rol'] = request.form['id_rol']
    return str(1)

#vista cerar sesion
@index.route('/cerrar_sesion')
def cerrar_sesion():
    session.clear()
    return redirect(url_for('index.Login'))

## vistas crear rol
@index.route('/vista_rol')
def vista_rol():
    return render_template('view/usuario/rol.html')

#vista listar rol
@index.route('/listar_rol')
def listar_rol():
    return render_template('view/usuario/listar_rol.html')

# vista crear usuario
@index.route('/create_user')
def create_user():
    if 'id_usu' in session and 'id_rol' in session:
        data = Usuario.Listar_rol_combo() 
    return render_template('view/usuario/crear_user.html', data = data )

#vista listar usuario
@index.route('/lista_usuario')
def lista_usuario():
    if 'id_usu' in session and 'id_rol' in session:
        data = Usuario.Listar_rol_combo()
    return render_template('view/usuario/listar_usuario.html', data = data)

#vista listar usuario
@index.route('/hacienda')
def hacienda():
    if 'id_usu' in session and 'id_rol' in session:
        data = Usuario.Traer_hacienda()
    return render_template('view/home/empresa.html', data = data)

#vista de razas
@index.route('razas')
def razas():
    return  render_template('view/cerdo/razas.html')

#vista crear cerdos
@index.route('/new_cerdo')
def new_cerdo():
    if 'id_usu' in session and 'id_rol' in session:
        data = Cerdo.Traer_razas_combo()
        codigo = random.randint(0, 999999999)
    return render_template('view/cerdo/registro_cerdo.html', data = data, codigo = codigo)

#vista listar cerdo
@index.route('/list_cerdo')
def list_cerdo():
    data = Cerdo.Traer_razas_combo()
    return render_template('view/cerdo/listado_cerdos.html',  data = data)

#vista crear galpón
@index.route('/create_galpon')
def create_galpon(): 
    data = Galpon.Traer_tipo_galpon_combo()
    return render_template('view/galpon/new_galpon.html', data = data)

#vista listar el galpón
@index.route('/list_galpon')
def list_galpon(): 
    data = Galpon.Traer_tipo_galpon_combo()
    return render_template('view/galpon/list_galpon.html', data = data)

#vista tipo de galpon
@index.route('/tipo_galpon')
def tipo_galpon(): 
    return render_template('view/galpon/tipo_galpon.html')

#vista del galpon del cerdo
@index.route('/list_galpon_cerdo')
def list_galpon_cerdo(): 
    data = Galpon.Listar_cerdo_galpon_LIST()
    return render_template('view/galpon/list_galpon_cerdo.html', data = data)

#crear galpon cerdo
@index.route('/create_galpon_cerdo')
def create_galpon_cerdo(): 
    data = Galpon.Listar_galpon_combo()
    return render_template('view/galpon/create_galpon_cerdo.html', data = data)

#ver los cerdos del galpon
@index.route('/ver_cerdos_galpo/<int:id>')
def ver_cerdos_galpo(id): 
    data = Galpon.Listar_galpon_combo()
    cerdos = Galpon.Listar_cerdos_galpon_tabla(id)
    dicc = {
        'data': data,
        'cerdos': cerdos,
        'id': id
    }
    return render_template('view/galpon/cerdos_galpo.html', dicc = dicc)

#ver los cerdos del galpon por ajax
@index.route('/cedos_galpon', methods=['POST'])
def cedos_galpon(): 
    id = request.form['id'] 
    data = Galpon.Listar_cerdos_galpon(id) 
    return jsonify(data)

#vista movimientos de cerdos de galpones
@index.route('/movimientos_cerdo')
def movimientos_cerdo():  
    cerdos = Galpon.Movimientos_cerdo()
    dicc = { 
        'cerdos': cerdos
    }
    return render_template('view/galpon/movimientos_cerdo.html', dicc = dicc)

#vista movimientos de cerdos de galpones por fechas
@index.route('/movimientos_cerdo_fecha/<string:f_i>/<string:f_f>')
def movimientos_cerdo_fecha(f_i, f_f):  
    cerdos = Galpon.Movimientos_cerdo_fecha(f_i, f_f)
    print(cerdos)
    dicc = { 
         'cerdos': cerdos
    }
    return render_template('view/galpon/movimientos_cerdo.html', dicc = dicc)

#vista tipo de alimento
@index.route('/tipo_alimento')
def tipo_alimento():  
    return render_template('view/alimento/tipo_alimento.html')

#vista marca de alimento
@index.route('/marca_alimento')
def marca_alimento():  
    return render_template('view/alimento/marca_alimento.html')

#vista alimento de cerdos
@index.route('/alimento')
def alimento():  
    codigo = random.randint(0, 999999999)
    data = Alimento.Traer_tipo_alimento_select()
    marca = Alimento.Traer_marca_alimento_select()
    return render_template('view/alimento/alimento.html', codigo = codigo, data = data, marca = marca)

#vista alimento de cerdos
@index.route('/proveedor')
def proveedor():    
    return render_template('view/compras/proveedor.html')

#vista compras de alimentoa
@index.route('/compra_alimento')
def compra_alimento():   
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    proveedor = Compras.Select_proveedor()
    alimentos = Compras.Table_alimentos()
    list_compras = Compras.Listar_compras_alimentos()
    data = {
        'fecha': now,
        'proveedor': proveedor,
        'alimentos': alimentos,
        'lista': list_compras
    }
    return render_template('view/compras/compra_alimento.html', data = data)

#vista tipo de alimentacion
@index.route('/tipo_alimentacion')
def tipo_alimentacion():    
    return render_template('view/alimento/tipo_alimentacion.html')

#vista alimentaion de cerdos
@index.route('/alimentacion_cerdos')
def alimentacion_cerdos():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    tipo = Alimento.Traer_tipo_alimento_select() 
    tipo_a = Alimento.Traer_tipo_alimentacion_select() 
    galpon = Galpon.Listar_galpon_combo() 
    alimentacion = Alimento.Listar_alimentacion()
    cerdo = Galpon.Select_cerdos() 
    data = {
        'fecha': now,
        'tipo': tipo, 
        'tipo_a': tipo_a,
        'galpon': galpon,
        'alimentacion': alimentacion,
        'cerdo': cerdo, 
    }  
    return render_template('view/alimento/alimentacion_cerdos.html', data = data)

#vista movimientos de cerdos de galpones por fechas
@index.route('/alimentacion_cerdos_fecha/<string:f_i>/<string:f_f>')
def alimentacion_cerdos_fecha(f_i, f_f):  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    tipo = Alimento.Traer_tipo_alimento_select() 
    tipo_a = Alimento.Traer_tipo_alimentacion_select() 
    galpon = Galpon.Listar_galpon_combo() 
    alimentacion = Alimento.Listar_alimentacion_fecha(f_i,f_f)
    cerdo = Galpon.Select_cerdos() 
    data = {
        'fecha': now,
        'tipo': tipo, 
        'tipo_a': tipo_a,
        'galpon': galpon,
        'alimentacion': alimentacion,
        'cerdo': cerdo, 
    }  
    return render_template('view/alimento/alimentacion_cerdos.html', data = data)

#vista del pesaje de los cerdos
@index.route('/peso_cerdo')
def peso_cerdo():    
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    pesaje = Alimento.Listar_pesaje_cerdo()
    data = {
        'fecha': now,
        'cerdo': cerdo,  
        'pesaje': pesaje
    } 
    return render_template('view/alimento/peso_cerdo.html', data = data)

#vista movimientos de cerdos de galpones por fechas
@index.route('/peso_cerdos_fecha/<string:f_i>/<string:f_f>')
def peso_cerdos_fecha(f_i, f_f):  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    pesaje = Alimento.Listar_pesaje_cerdo_fecha(f_i, f_f)
    data = {
        'fecha': now,
        'cerdo': cerdo,  
        'pesaje': pesaje
    } 
    return render_template('view/alimento/peso_cerdo.html', data = data)

#vista tipo de insumo
@index.route('/tipo_insumo')
def tipo_insumo():    
    return render_template('view/compras/tipo_insumo.html')

#vista de insumo
@index.route('/insumo')
def insumo():
    codigo = random.randint(0, 999999999)
    tipo = Compras.Combo_tipo_insumo()    
    return render_template('view/compras/insumo.html', codigo = codigo, tipo = tipo)

#vista compras de insumos
@index.route('/compra_insumos')
def compra_insumos():   
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    proveedor = Compras.Select_proveedor()
    insumos = Compras.Table_insumos()
    listar_compras = Compras.Listar_compras_insumos()
    data = {
        'fecha': now,
        'proveedor': proveedor,
        'insumo': insumos,
        'lista': listar_compras
    }
    return render_template('view/compras/compra_insumos.html', data = data)

#vista de veterinario
@index.route('/veterinario')
def veterinario():  
    return render_template('view/enfer_trata/veterinario.html')

#vista de tipo de enfermedad
@index.route('/tipo_enfermedad')
def tipo_enfermedad():  
    return render_template('view/enfer_trata/tipo_enfermedad.html')

#vista de tipo de tratamientos
@index.route('/tipo_tratamientos')
def tipo_tratamientos():  
    return render_template('view/enfer_trata/tipo_tratamientos.html')

#vista de registro cerdos enfermos
@index.route('/registro_enfermos')
def registro_enfermos():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    veterinario = Enfermedad.Select_veterinario()
    enfermedades = Enfermedad.Select_enfermedades()
    data = {
        'fecha': now,
        'cerdo': cerdo,
        'vete': veterinario,
        'enfer': enfermedades
    }
    return render_template('view/enfer_trata/registro_enfermos.html', data = data)

#vista para listar loscerdos enfermos en espera
@index.route('/cerdos_enfermos_espera')
def cerdos_enfermos_espera():       
    enfermos = Enfermedad.Listra_cerdos_enfermos_espera()
    data = {
        'enfer': enfermos
    }
    return render_template('view/enfer_trata/cerdos_enfermos_espera.html', data = data)

#vista para listar loscerdos enfermos en espera
@index.route('/tratar_cerdos')
def tratar_cerdos(): 
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")      
    enfermos = Enfermedad.Listra_cerdos_enfermos_espera()
    insumo = Compras.Table_insumos()
    tratamiento = Enfermedad.Combo_tratamiento()
    medicamento = Enfermedad.Combo_medicamento()
    data = {
        'fecha': now,
        'enfer': enfermos,
        'insumo': insumo,
        'tratamiento': tratamiento,
        'medicamento': medicamento
    }
    return render_template('view/enfer_trata/tratar_cerdos.html', data = data)

#vista de tipo de tratamientos
@index.route('/tipo_medicamento')
def tipo_medicamento():  
    return render_template('view/compras/tipo_medicamento.html')

#vista de medicamentos
@index.route('/medicamentos')
def medicamentos():  
    codigo = random.randint(0, 999999999)
    tipo = Compras.Combo_tipo_medicamento()  
    return render_template('view/compras/medicamentos.html', codigo = codigo, tipo = tipo)

#vista compras de medicamento
@index.route('/compra_medicamento')
def compra_medicamento():   
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    proveedor = Compras.Select_proveedor()
    medicamento = Compras.Table_medicamento()
    listar_compras = Compras.Listar_compras_medicamento()
    data = {
        'fecha': now,
        'proveedor': proveedor,
        'insumo': medicamento,
        'lista': listar_compras
    }
    return render_template('view/compras/compra_medicamento.html', data = data)

#vista para listar los cerdos tratados por enfermedad
@index.route('/cerdos_tratados')
def cerdos_tratados():       
    enfermos = Enfermedad.Listra_cerdos_tratados()
    data = {
        'enfer': enfermos
    }
    return render_template('view/enfer_trata/cerdos_tratados.html', data = data)

#vista para listado de trataiendos de los cerdos
@index.route('/listado_tratamientos')
def listado_tratamientos():      
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")  
    tratamiendos = Enfermedad.Listado_tratamientos()
    cerdo = Galpon.Select_cerdos() 
    data = {
        'fecha': now,
        'lista': tratamiendos,
        'cerdo': cerdo
    }
    return render_template('view/enfer_trata/listado_tratamientos.html', data = data)

#vista de cerdos muertos
@index.route('/cerdos_muertos')
def cerdos_muertos():      
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")   
    cerdo = Galpon.Select_cerdos() 
    muertos = Cerdo.Cerdos_muertos()

    data = {
        'fecha': now, 
        'cerdo': cerdo,
        'muertos': muertos
    }
    return render_template('view/cerdo/cerdos_muertos.html', data = data)

#vista de cerdos muertos
@index.route('/calendario_vacunas_despara')
def calendario_vacunas_despara():      
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")   
    cerdo = Galpon.Select_cerdos() 
    eventos = Vacunas.Listar_calendario()

    data = {
        'fecha': now, 
        'cerdo': cerdo,
        'evento': eventos
    }
    return render_template('view/vacuna_despara/calendario_vacunas_despara.html', data = data)

#vista informa de compras alimentos
@index.route('/informa_compra_alimento')
def informa_compra_alimento(): 
    return render_template('view/informe/informa_compra_alimento.html')

#vista informa de compras alimentos
@index.route('/informa_compra_insumos')
def informa_compra_insumos(): 
    return render_template('view/informe/informa_compra_insumos.html')

#vista informa de compras medcamentos
@index.route('/informa_compra_medicamentos')
def informa_compra_medicamentos(): 
    return render_template('view/informe/informa_compra_medicamentos.html')
    
#vista informa de control de peso del cerdo
@index.route('/informa_control_peso')
def informa_control_peso(): 
    cerdo = Galpon.Select_cerdos() 
    return render_template('view/informe/informa_control_peso.html', cerdo = cerdo)

#vista informa de control de peso del cerdo
@index.route('/informa_cerdo')
def informa_cerdo(): 
    raza = Cerdo.Traer_razas_combo()
    galpon = Galpon.Listar_galpon_combo()
    data = {
        'raza': raza,
        'galpon': galpon
    }
    return render_template('view/informe/informa_cerdo.html', data = data)

#vista tipo de vacunas
@index.route('/tipo_vacuna')
def tipo_vacuna(): 
    return render_template('view/vacuna_despara/tipo_vacuna.html')

#vista de vacunas
@index.route('/vacunas')
def vacunas():  
    codigo = random.randint(0, 999999999)
    tipo = Vacunas.Combo_tipo_vacuna()  
    data = {
        'codigo': codigo,
        'tipo': tipo
    } 
    return render_template('view/vacuna_despara/vacunas.html', data = data)

#vista compras de vacunas
@index.route('/compra_vacunas')
def compra_vacunas():   
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    proveedor = Compras.Select_proveedor()
    vacuna = Vacunas.Table_vacuna()
    listar_compras = Compras.Listar_compras_vacunas()
    data = {
        'fecha': now,
        'proveedor': proveedor,
        'vacuna': vacuna,
        'lista': listar_compras
    }
    return render_template('view/compras/compra_vacunas.html', data = data)

#vista de registro vacunas de cerdos
@index.route('/registro_vacunacion')
def registro_vacunacion():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    vacuna = Vacunas.Table_vacuna()
    calendario = Vacunas.Tabla_calendario_vacunas()
    data = {
        'fecha': now,
        'cerdo': cerdo,
        'vacuna': vacuna,
        'calendario': calendario
    }
    return render_template('view/vacuna_despara/registro_vacunacion.html', data = data)

#vista del listado de vacunaciones de cerdos
@index.route('/listado_vacunacion')
def listado_vacunacion():   
    vacunacion = Vacunas.Listar_vacunaciones_cerdos() 
    data = {
        'vacunacion': vacunacion
    }
    return render_template('view/vacuna_despara/listado_vacunacion.html', data = data)

#vista del listado de vacunaciones de cerdos por fechas
@index.route('/listado_vacunacion_fecha/<string:f_i>/<string:f_f>')
def listado_vacunacion_fecha(f_i, f_f):   
    vacunacion_f = Vacunas.Listar_vacunaciones_cerdos_fecha(f_i, f_f) 
    data = {
        'vacunacion': vacunacion_f,
        'f_i': f_i,
        'f_f': f_f
    }
    return render_template('view/vacuna_despara/listado_vacunacion_fecha.html', data = data)

#vista de historial de vacunacion de los cerdos
@index.route('/historial_de_vacunacion')
def historial_de_vacunacion():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    data = {
        'fecha': now,
        'cerdo': cerdo
    }
    return render_template('view/vacuna_despara/historial_de_vacunacion.html', data = data)

#vista de registro desparasitacion de cerdos
@index.route('/registro_desparasitacion')
def registro_desparasitacion():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    medicamento = Compras.Table_medicamento()
    calendario = Vacunas.Tabla_calendario_desparacitacion()
    data = {
        'fecha': now,
        'cerdo': cerdo,
        'medicamento': medicamento,
        'calendario': calendario
    }
    return render_template('view/vacuna_despara/registro_desparasitacion.html', data = data)

#vista del listado de desparasitacion de cerdos
@index.route('/listado_desparasitacion')
def listado_desparasitacion():   
    desparasitacion = Vacunas.Listar_desparasitacion_cerdos() 
    data = {
        'desparasitacion': desparasitacion
    }
    return render_template('view/vacuna_despara/listado_desparasitacion.html', data = data)

#vista del listado de desparasitacion de cerdos por fechas
@index.route('/listado_desparasitacion_fecha/<string:f_i>/<string:f_f>')
def listado_desparasitacion_fecha(f_i, f_f):   
    desparasitacion_f = Vacunas.Listar_desparasitacion_cerdos_fecha(f_i, f_f) 
    data = {
        'desparasitacion': desparasitacion_f,
        'f_i': f_i,
        'f_f': f_f
    }
    return render_template('view/vacuna_despara/listado_desparasitacion_fecha.html', data = data)

#vista de historial de desparasitacion de los cerdos
@index.route('/historia_desparasitacion')
def historia_desparasitacion():  
    fecha = datetime.now()
    now = fecha.strftime("%Y-%m-%d")
    cerdo = Galpon.Select_cerdos() 
    data = {
        'fecha': now,
        'cerdo': cerdo
    }
    return render_template('view/vacuna_despara/historia_desparasitacion.html', data = data)


