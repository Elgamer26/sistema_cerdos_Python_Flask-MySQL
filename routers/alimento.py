from flask import Blueprint, request, session
from flask import jsonify
from models.alimento import Alimento 
from os import getcwd, path, remove
import time

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
alimento = Blueprint('alimento', __name__)
# para mover la imagen
PATH_FILE = getcwd() + "/static/uploads/alimento/"

# controlador para listar tipo de alimento
@alimento.route('/listar_tipo_alimento', methods=['GET'])
def listar_tipo_alimento():
    if request.method == 'GET':
        dato = Alimento.Listar_tipio_alimento()
        return jsonify(dato)

# controlador para acciones de crear y editar el tipo de alimento
@alimento.route('/acciones_tipo_alimento', methods=['POST'])
def acciones_tipo_alimento():
    if request.method == 'POST':
        
        funcion = request.form['funcion']
        if funcion == 'registrar_tipo_a':       
            _valor = request.form['valor']
            dato = Alimento.Registrar_tipo_alimento(_valor)
            return jsonify(dato)

        elif funcion == 'estado_alimento':  
            _id = request.form['id']     
            _dato = request.form['dato']
            dato = Alimento.Estado_alimento(_id,_dato)
            return jsonify(dato)

        elif funcion == 'editar_tipo_a':   
            _id = request.form['id']    
            _valor = request.form['valor']
            dato = Alimento.Editar_tipo_alimento(_id,_valor)
            return jsonify(dato)

# controlador para listar marca de alimento
@alimento.route('/listar_marca_alimento', methods=['GET'])
def listar_marca_alimento():
    if request.method == 'GET':
        dato = Alimento.Listar_marca_alimento()
        return jsonify(dato)

# controlador para acciones de crear y editar la marca de alimento
@alimento.route('/acciones_marca_alimento', methods=['POST'])
def acciones_marca_alimento():
    if request.method == 'POST':
        
        funcion = request.form['funcion']
        if funcion == 'registrar_marca_a':       
            _valor = request.form['valor']
            dato = Alimento.Registrar_marca_alimento(_valor)
            return jsonify(dato)

        elif funcion == 'estado_marca':  
            _id = request.form['id']     
            _dato = request.form['dato']
            dato = Alimento.Estado_marca(_id,_dato)
            return jsonify(dato)

        elif funcion == 'editar_marca_a':   
            _id = request.form['id']    
            _valor = request.form['valor']
            dato = Alimento.Editar_marca_alimento(_id,_valor)
            return jsonify(dato)

# controlador para crear el alimento
@alimento.route('/registrar_alimento', methods=['POST'])
def registrar_alimento():
    if request.method == 'POST':
        _codigo = request.form['codigo']
        _nombre = request.form['nombre']
        _tipo = request.form['tipo']
        _marca = request.form['marca']
        _cantidad = request.form['cantidad']
        _precio = request.form['precio']
        _peso = request.form['peso']
        _detalle = request.form['detalle']
        _foto = request.files.get("foto", False)

        if _foto:
            # cerdo con foto
            hora_ac = time.strftime('%Y%m%d%H%M%S_', time.localtime())
            archivo = hora_ac + _foto.filename             
            dato = Alimento.Craer_alimento(_codigo, _nombre, _tipo, _marca, _cantidad, _precio, _peso, _detalle, archivo)
            if dato == 1:
                _foto.save(PATH_FILE + archivo)
                return str(dato)
            else:
                return str(dato)        
        else:
            # cerdo sin foto
            archivo = "alimento.jpg"
            dato = Alimento.Craer_alimento(_codigo, _nombre, _tipo, _marca, _cantidad, _precio, _peso, _detalle, archivo)
            return str(dato)

# controlador para listar marca de alimento
@alimento.route('/listar_alimentos', methods=['GET'])
def listar_alimentos():
    if request.method == 'GET':
        dato = Alimento.Listar_alimentos()
        return jsonify(dato)
        
# controlador para estado de alimento
@alimento.route('/estado_alimento', methods=['POST'])
def estado_alimento():
    if request.method == 'POST':
        _id = request.form['id']     
        _dato = request.form['dato']
        dato = Alimento.Estado_alimento(_id,_dato)
        return jsonify(dato)

# controlador para cambiar la foto del alimento
@alimento.route('/cambiar_foto_alimento', methods=['POST'])
def cambiar_foto_alimento():
    if request.method == 'POST':
        try:
            _id = request.form['id']
            foto_ac = request.form['ruta_actual']
            file = request.files.get("foto", False)

            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename

            data = Alimento.Cambiar_foto_alimento(_id, archivo)

            if data == 1:
                file.save(PATH_FILE + archivo)
                # para no eliminar la foto por defecto
                if foto_ac != "alimento.jpg":
                    # esto es paar saber si el archivo existe y elimiarlo
                    if path.isfile(PATH_FILE + foto_ac) == True:
                        remove(PATH_FILE + foto_ac)
                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para editar el alimento
@alimento.route('/editar_alimento', methods=['POST'])
def editar_alimento():
    if request.method == 'POST':
        _codigo = request.form['codigo']
        _nombre = request.form['nombre']
        _tipo = request.form['tipo']
        _marca = request.form['marca']
        _cantidad = request.form['cantidad']
        _precio = request.form['precio']
        _peso = request.form['peso']
        _detalle = request.form['detalle'] 
        _id = request.form['id']  
        
        dato = Alimento.Editar_alimento(_codigo, _nombre, _tipo, _marca, _cantidad, _precio, _peso, _detalle, _id)
        return str(dato)

# controlador para listar tipo de alimentacion
@alimento.route('/listar_tipo_alimentacion', methods=['GET'])
def listar_tipo_alimentacion():
    if request.method == 'GET':
        dato = Alimento.Listar_tipio_alimentacion()
        return jsonify(dato)

# controlador para acciones de crear y editar el tipo de alimentacion
@alimento.route('/acciones_tipo_alimentacionn', methods=['POST'])
def acciones_tipo_alimentacionn():
    if request.method == 'POST':
        
        funcion = request.form['funcion']
        if funcion == 'registrar_tipo_alimentacion':       
            _valor = request.form['valor']
            dato = Alimento.Registrar_tipo_alimentacion(_valor)
            return jsonify(dato)

        elif funcion == 'estado_alimentacion':  
            _id = request.form['id']     
            _dato = request.form['dato']
            dato = Alimento.Estado_alimentacion(_id,_dato)
            return jsonify(dato)

        elif funcion == 'editar_tipo_alimentacion':   
            _id = request.form['id']    
            _valor = request.form['valor']
            dato = Alimento.Editar_tipo_alimentacion(_id,_valor)
            return jsonify(dato)

# controlador para el select del alimento del cerdo
@alimento.route('/select_alimento_cerdo', methods=['POST'])
def select_alimento_cerdo():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.Select_alimento_cerdo(_id)
        return jsonify(dato)
    
# controlador para traer la cantidad de sacos de alimento
@alimento.route('/traer_cantida_saco_alimento', methods=['POST'])
def traer_cantida_saco_alimento():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.Traer_cantida_saco_alimento(_id)
        return jsonify(dato)

# controlador para el select de galpon cerdo
@alimento.route('/select_cerdo_galpon', methods=['POST'])
def select_cerdo_galpon():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.Select_cerdo_galpon(_id)
        return jsonify(dato)

# controlador para peso del cerdo
@alimento.route('/traer_peso_cerdo_actual', methods=['POST'])
def traer_peso_cerdo_actual():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.Traer_peso_cerdo_actual(_id)
        return jsonify(dato)

# controlador para guadar la alimentacion
@alimento.route('/guardar_la_alimentacion', methods=['POST'])
def guardar_la_alimentacion():
    if request.method == 'POST':
        _id = session['id_usu']
        _alimento_id = request.form['alimento_id']
        _tipo_id = request.form['tipo_id']
        _fecha_c = request.form['fecha_c']
        _cantidad_sacos = request.form['cantidad_sacos']
        _observacion = request.form['observacion'] 
        
        dato = Alimento.Guardar_la_alimentacion(_alimento_id, _tipo_id, _fecha_c, _cantidad_sacos, _observacion, _id)
        print(dato)
        return str(dato)

# controlador para registra el detalle de alimentacion del cerdo
@alimento.route('/guardar_detalle_alimentacion', methods=['POST'])
def guardar_detalle_alimentacion():
    if request.method == 'POST':

        _id = request.form['id']
        _idc = request.form['idc']
        _peso = request.form['peso']  

        idc = _idc.split(",")
        peso = _peso.split(",") 

        for valor in zip(idc, peso):
            dato = Alimento.Guardar_detalle_alimentacion(_id, valor[0], valor[1])  
        return jsonify(dato)

# controlador para registra el peso del cerdo
@alimento.route('/guardar_pesaje_cerdo', methods=['POST'])
def guardar_pesaje_cerdo():
    if request.method == 'POST':
        _id = request.form['cerdo_id']
        _fecha_c = request.form['fecha_c']
        _metodo = request.form['metodo']  
        _estado = request.form['estado_c']
        _observacion = request.form['observacion']
        _p_a = request.form['peso_actual']  
        
        _p_b = request.form['p_b']  
        _p_t = request.form['p_t']
        _l_c = request.form['l_c']
        _p_v = request.form['p_v'] 

        dato = Alimento.Guardar_peso_cerdo(_id,_fecha_c,_metodo,_estado,_observacion,_p_a,_p_b,_p_t,_l_c,_p_v)  
        return str(dato)

# controlador para traer los datos del pessaje del cerdo
@alimento.route('/traer_pesos_cerdo', methods=['POST'])
def traer_pesos_cerdo():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.Traer_pesos_cerdo(_id)  
        return jsonify(dato)

# controlador para traer los datos de la alimentacion del cerdo
@alimento.route('/traer_alimentos_del_cerdo', methods=['POST'])
def traer_alimentos_del_cerdo():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Alimento.traer_alimentos_del_cerdo(_id)  
        return jsonify(dato)

# controlador para eliminar peso del cerdo
@alimento.route('/eliminar_peso', methods=['POST'])
def eliminar_peso():
    if request.method == 'POST': 
        _id = request.form['id']  
        
        dato = Alimento.Eliminar_peso(_id)
        return str(dato)
