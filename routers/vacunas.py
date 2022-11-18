from flask import Blueprint, request
from flask import jsonify
from models.vacunas import Vacunas  
import time
from os import getcwd, path, remove

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
vacunas = Blueprint('vacunas', __name__)
PATH_FILE = getcwd() + "/static/uploads/vacuna/"

# controlador para registra el calendario
@vacunas.route('/calendario_registrar', methods=['POST'])
def calendario_registrar():
    if request.method == 'POST':
  
        titulo = request.form['titulo']
        cerdo = request.form['cerdo']
        descripcion = request.form['descripcion']
        tipo = request.form['tipo']
        fecha_evento = request.form['fecha_evento']
        color = request.form['color'] 
        color_etiqueta = request.form['color_etiqueta']  
        
        dato = Vacunas.Calendario_registrar(titulo, cerdo, descripcion, tipo, fecha_evento, color, color_etiqueta)
        return str(dato)

# controlador para listar los eventos del calendario
@vacunas.route('/listar_calendario', methods=['GET'])
def listar_calendario():
    if request.method == 'GET':
        
        dato = Vacunas.Listar_calendario()
        return jsonify(dato)

# controlador para editar el calendario
@vacunas.route('/calendario_editar', methods=['POST'])
def calendario_editar():
    if request.method == 'POST':
        
        id = request.form['id']
        titulo = request.form['titulo']
        cerdo = request.form['cerdo']
        descripcion = request.form['descripcion']
        tipo = request.form['tipo']
        fecha_evento = request.form['fecha_evento']
        color = request.form['color'] 
        color_etiqueta = request.form['color_etiqueta']  
        
        dato = Vacunas.Calendario_editar(id, titulo, cerdo, descripcion, tipo, fecha_evento, color, color_etiqueta)
        return str(dato)

# controlador para acciones de crear y editar el tipo de vacuna
@vacunas.route('/accion_tipo_vacuna', methods=['POST'])
def accion_tipo_insumo():
    if request.method == 'POST':
        
        funcion = request.form['funcion']
        if funcion == 'registra_tipo_vacuna':       
            _valor = request.form['valor']
            dato = Vacunas.Registrar_tipo_vacuna(_valor)
            return jsonify(dato)

        elif funcion == 'editar_tipo_vacuna':  
            _id = request.form['id']     
            _dato = request.form['valor']
            dato = Vacunas.Editar_tipo_vacuna(_id,_dato)
            return jsonify(dato)

        elif funcion == 'estado_tipo_vacuna':   
            _id = request.form['id']    
            _valor = request.form['dato']
            dato = Vacunas.Estado_tipo_vacuna(_id,_valor)
            return jsonify(dato)

# controlador para listar el tipo de vacuna
@vacunas.route('/Listar_tipo_vacuna', methods=['GET'])
def Listar_tipo_vacuna():
    if request.method == 'GET':
        dato = Vacunas.Listar_tipo_vacuna()
        return jsonify(dato)

# controlador para crear la vacuna
@vacunas.route('/crear_vacuna_cerdos', methods=['POST'])
def crear_vacuna_cerdos():
    if request.method == 'POST':
        _codigo = request.form['codigo']
        _nombre = request.form['nombre']
        _tipo = request.form['tipo'] 
        _cantidad = request.form['cantidad']
        _precio = request.form['precio'] 
        _detalle = request.form['detalle']
        _presentacion = request.form['presentacion']
        _foto = request.files.get("foto", False)

        if _foto:
            # cerdo con foto
            hora_ac = time.strftime('%Y%m%d%H%M%S_', time.localtime())
            archivo = hora_ac + _foto.filename             
            dato = Vacunas.Crear_vacuna(_codigo, _nombre, _tipo, _cantidad, _precio, _detalle, _presentacion, archivo)
            if dato == 1:
                _foto.save(PATH_FILE + archivo)
                return str(dato)
            else:
                return str(dato)        
        else:
            # cerdo sin foto
            archivo = "vacuna.jpg"
            dato = Vacunas.Crear_vacuna(_codigo, _nombre, _tipo, _cantidad, _precio, _detalle, _presentacion, archivo)
            return str(dato)

# controlador para listar la vacunas
@vacunas.route('/listar_vacunas', methods=['GET'])
def listar_vacunas():
    if request.method == 'GET':
        dato = Vacunas.Listar_vacunas()
        return jsonify(dato)

# controlador para cambiar el estado de la vacuna
@vacunas.route('/estado_vacuna', methods=['POST'])
def estado_vacuna():
    if request.method == 'POST':   
        _id = request.form['id']    
        _dato = request.form['dato']
        dato = Vacunas.Estado_vacuna(_id,_dato)
        return jsonify(dato)

# controlador para editar la vacuna
@vacunas.route('/editar_vacuna', methods=['POST'])
def editar_vacuna():
    if request.method == 'POST':
        _id = request.form['id']
        _codigo = request.form['codigo']
        _nombre = request.form['nombre']
        _tipo = request.form['tipo'] 
        _cantidad = request.form['cantidad']
        _precio = request.form['precio'] 
        _detalle = request.form['detalle']
        _presentacion = request.form['presentacion'] 

        dato = Vacunas.Editar_vacuna(_codigo, _nombre, _tipo, _cantidad, _precio, _detalle, _presentacion, _id)
        return str(dato)

# controlador para cambiar la foto de la vacuna
@vacunas.route('/cambiar_foto_vacuna', methods=['POST'])
def cambiar_foto_vacuna():
    if request.method == 'POST':
        try:
            _id = request.form['id']
            foto_ac = request.form['ruta_actual']
            file = request.files.get("foto", False)

            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename

            data = Vacunas.Editar_foto_vacuna(_id, archivo)

            if data == 1:
                file.save(PATH_FILE + archivo)
                # para no eliminar la foto por defecto
                if foto_ac != "vacuna.jpg":
                    # esto es paar saber si el archivo existe y elimiarlo
                    if path.isfile(PATH_FILE + foto_ac) == True:
                        remove(PATH_FILE + foto_ac)
                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para traer la cantidad de vacunas
@vacunas.route('/traer_cantidad_vacunas', methods=['POST'])
def traer_cantidad_vacunas():
    if request.method == 'POST':   
        _id = request.form['id']     
        dato = Vacunas.Traer_cantidad_vacunas(_id)
        return jsonify(dato)