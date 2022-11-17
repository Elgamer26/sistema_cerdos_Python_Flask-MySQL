from flask import Blueprint, request
from flask import jsonify
from models.enfermedad import Enfermedad  
import time

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
enfermedad = Blueprint('enfermedad', __name__)

# controlador para crear el veterinrio
@enfermedad.route('/registrar_veterinario', methods=['POST'])
def registrar_veterinario():
    if request.method == 'POST':
        _nombre = request.form['nombre']
        _apellido = request.form['apellido']
        _numero_doc = request.form['numero_doc']
        _telefono = request.form['telefono']
        _direccion = request.form['direccion']
        _sucursal = request.form['sucursal']  
        
        dato = Enfermedad.Registrar_veterinario(_nombre, _apellido, _numero_doc, _telefono, _direccion, _sucursal)
        return str(dato)

# controlador para listar el veterinario
@enfermedad.route('/listar_veterinario', methods=['GET'])
def listar_veterinario():
    if request.method == 'GET':
        dato = Enfermedad.Listar_veterinario()
        return jsonify(dato)

# controlador para estado del veterinario
@enfermedad.route('/estado_veterinario', methods=['POST'])
def estado_veterinario():
    if request.method == 'POST':
        _id = request.form['id']
        _dato = request.form['dato']
        dato = Enfermedad.Estado_veterinario(_id,_dato)
        return str(dato)

# controlador para editar el veterinrio
@enfermedad.route('/editarr_veterinario', methods=['POST'])
def editarr_veterinario():
    if request.method == 'POST':
        _id = request.form['id']
        _nombre = request.form['nombre']
        _apellido = request.form['apellido']
        _numero_doc = request.form['numero_doc']
        _telefono = request.form['telefono']
        _direccion = request.form['direccion']
        _sucursal = request.form['sucursal']  
        
        dato = Enfermedad.Editar_veterinario(_nombre, _apellido, _numero_doc, _telefono, _direccion, _sucursal, _id)
        return str(dato)

# controlador para crear la enfermedad
@enfermedad.route('/registrar_tipo_enfermedad', methods=['POST'])
def registrar_tipo_enfermedad():
    if request.method == 'POST':
        _nombre = request.form['nombre']
        _descripcion = request.form['descripcion']  
        
        dato = Enfermedad.Registrar_tipo_enfermedad(_nombre, _descripcion)
        return str(dato)

# controlador para listar el veterinario
@enfermedad.route('/listar_enfermedad', methods=['GET'])
def listar_enfermedad():
    if request.method == 'GET':
        dato = Enfermedad.Listar_enfermedad()
        return jsonify(dato)

# controlador para estado de la enfermedad
@enfermedad.route('/estado_enfermedad', methods=['POST'])
def estado_enfermedad():
    if request.method == 'POST':
        _id = request.form['id']
        _dato = request.form['dato']
        dato = Enfermedad.Estado_enfermedad(_id,_dato)
        return str(dato)
    
# controlador para editar la enfermedad
@enfermedad.route('/editar_tipo_enfermedad', methods=['POST'])
def editar_tipo_enfermedad():
    if request.method == 'POST':
        _id = request.form['id']
        _nombre = request.form['nombre']
        _descripcion = request.form['descripcion']  
        
        dato = Enfermedad.Editar_tipo_enfermedad(_nombre, _descripcion, _id)
        return str(dato)

# controlador para crear el tipo de tratamiento
@enfermedad.route('/registrar_tipo_tratamiento', methods=['POST'])
def registrar_tipo_tratamiento():
    if request.method == 'POST':
        _nombre = request.form['nombre']
        _descripcion = request.form['descripcion']  
        
        dato = Enfermedad.Registrar_tipo_tratamiento(_nombre, _descripcion)
        return str(dato)

# controlador para listar el tipo tratamiento
@enfermedad.route('/listar_tipo_tratamiento', methods=['GET'])
def listar_tipo_tratamiento():
    if request.method == 'GET':
        dato = Enfermedad.Listar_tipo_tratamiento()
        return jsonify(dato)

# controlador para estado de la enfermedad
@enfermedad.route('/estado_tipo_tratamiento', methods=['POST'])
def estado_tipo_tratamiento():
    if request.method == 'POST':
        _id = request.form['id']
        _dato = request.form['dato']
        dato = Enfermedad.Estado_tipo_tratamiento(_id,_dato)
        return str(dato)
 
 # controlador para editar el tipo de tratamiento
@enfermedad.route('/editar_tipo_tratamiento', methods=['POST'])
def editar_tipo_tratamiento():
    if request.method == 'POST':
        _id = request.form['id']
        _nombre = request.form['nombre']
        _descripcion = request.form['descripcion']  
        
        dato = Enfermedad.Editar_tipo_tratamiento(_nombre, _descripcion, _id)
        return str(dato)

# controlador para crear la enfermedades del cerdo
@enfermedad.route('/guardar_enfermedad_cerdo', methods=['POST'])
def guardar_enfermedad_cerdo():
    if request.method == 'POST':
        _cerdo_id = request.form['cerdo_id']
        _fecha = request.form['fecha'] 
        _sintomas = request.form['sintomas']
        _diagnostico = request.form['diagnostico']  
        _veterinario = request.form['veterinario']  
        
        dato = Enfermedad.Guardar_enfermedad_cerdo(_cerdo_id,_fecha,_sintomas,_diagnostico,_veterinario)
        return str(dato)

# controlador para registrar el detalle de enfermedad del cerdo
@enfermedad.route('/guardar_detalle_enfermedad_cerdo', methods=['POST'])
def guardar_detalle_enfermedad_cerdo():
    if request.method == 'POST':
        _id = request.form['id']
        _ida = request.form['ida'] 

        ida = _ida.split(",") 

        for valor in zip(ida):
            dato = Enfermedad.Guardar_detalle_enfermedad_cerdo(_id, valor[0])  
        return jsonify(dato)
    
# controlador para traer el detalle de enfermedad del cerdo
@enfermedad.route('/modal_enfermedad_detalle', methods=['POST'])
def modal_enfermedad_detalle():
    if request.method == 'POST':
        _id = request.form['id'] 
 
        dato = Enfermedad.Modal_enfermedad_detalle(_id)  
        return jsonify(dato)

# controlador para eliminar el registro de cerdo enfermo
@enfermedad.route('/eliminar_cerdo_espera', methods=['POST'])
def eliminar_cerdo_espera():
    if request.method == 'POST':
        _id = request.form['id'] 
 
        dato = Enfermedad.Eliminar_cerdo_espera(_id)  
        return str(dato)

# controlador para eliminar el detalle de enfermedad de cerdo
@enfermedad.route('/eliminar_detalle_enfermedad_cerdo', methods=['POST'])
def eliminar_detalle_enfermedad_cerdo():
    if request.method == 'POST':
        _id = request.form['id'] 
 
        dato = Enfermedad.Eliminar_detalle_enfermedad_cerdo(_id)  
        return str(dato)

# controlador para traer los datos del cerdo enfermo
@enfermedad.route('/traer_cerdo_enfermo', methods=['POST'])
def traer_cerdo_enfermo():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Enfermedad.Traer_cerdo_enfermo(_id)
        return jsonify(dato)

# controlador para traer la cantidad del insumo
@enfermedad.route('/traer_cantidad_insumo', methods=['POST'])
def traer_cantidad_insumo():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Enfermedad.Traer_cantidad_insumo(_id)
        return jsonify(dato)

# controlador para traer la cantidad del medicamento
@enfermedad.route('/traer_cantidad_medicamento', methods=['POST'])
def traer_cantidad_medicamento():
    if request.method == 'POST':
        _id = request.form['id'] 
        dato = Enfermedad.Traer_cantidad_medicamento(_id)
        return jsonify(dato)

# controlador para crear el el tratamiendo del cerdo
@enfermedad.route('/guardar_tratamiendo_cerdoos', methods=['POST'])
def guardar_tratamiendo_cerdoos():
    if request.method == 'POST':
        _cerdo_id = request.form['cerdo_id']
        _peso = request.form['peso']
        _fecha_i = request.form['fecha_i']
        _fecha_f = request.form['fecha_f']
        _dobservacion = request.form['observacion'] 
        
        dato = Enfermedad.Guardar_tratamiendo_cerdoos(_cerdo_id, _peso, _fecha_i, _fecha_f, _dobservacion)
       
        return str(dato)

# controlador para registrar el detalle de insumo de enfermedad
@enfermedad.route('/guardar_detalle_insumo_enfermedad', methods=['POST'])
def guardar_detalle_insumo_enfermedad():
    if request.method == 'POST':
        _id = request.form['id']
        _ida = request.form['ida'] 
        _cantidad = request.form['cantidad'] 

        ida = _ida.split(",") 
        cantidad = _cantidad.split(",") 

        for valor in zip(ida,cantidad):
            dato = Enfermedad.Guardar_detalle_insumo_enfermedad(_id, valor[0], valor[1])
       
        return jsonify(dato)

# controlador para registrar el detalle de medicina de enfermedad
@enfermedad.route('/guardar_detalle_medicina_enfermedad', methods=['POST'])
def guardar_detalle_medicina_enfermedad():
    if request.method == 'POST':
        _id = request.form['id']
        _ida = request.form['ida'] 
        _cantidad = request.form['cantidad'] 

        ida = _ida.split(",") 
        cantidad = _cantidad.split(",") 

        for valor in zip(ida,cantidad):
            dato = Enfermedad.Guardar_detalle_medicina_enfermedad(_id, valor[0], valor[1])
       
        return jsonify(dato)

# controlador para registrar el detalle de tratamiendo de enfermedad
@enfermedad.route('/guardar_detalle_tratamiento_enfermedad', methods=['POST'])
def guardar_detalle_tratamiento_enfermedad():
    if request.method == 'POST':
        _id = request.form['id']
        _ida = request.form['ida']  

        ida = _ida.split(",")  

        for valor in zip(ida):
            dato = Enfermedad.guardar_detalle_tratamiento_enfermedad(_id, valor[0])  
       
        return jsonify(dato)
    
# controlador para traer el detalle del tratamiendo del cerdo
@enfermedad.route('/ver_detalle_tratamiendo_cerdo', methods=['POST'])
def ver_detalle_tratamiendo_cerdo():
    if request.method == 'POST':
        _id = request.form['id'] 
        _id_enfer = request.form['id_enfer'] 
 
        dato = Enfermedad.Ver_detalle_tratamiendo_cerdo(_id, _id_enfer)  
        return jsonify(dato)
    
@enfermedad.route('/traer_insumo_enfermedad_detalle', methods=['POST'])
def traer_insumo_enfermedad_detalle():
    if request.method == 'POST':
        _id = request.form['id']  
 
        dato = Enfermedad.Traer_insumo_enfermedad_detalle(_id)  
        return jsonify(dato)

@enfermedad.route('/traer_insumo_medicamento_detalle', methods=['POST'])
def traer_insumo_medicamento_detalle():
    if request.method == 'POST':
        _id = request.form['id']  
 
        dato = Enfermedad.Traer_insumo_medicamento_detalle(_id)  
        return jsonify(dato)

@enfermedad.route('/traer_insumo_tratamiento_detalle', methods=['POST'])
def traer_insumo_tratamiento_detalle():
    if request.method == 'POST':
        _id = request.form['id']  
 
        dato = Enfermedad.Traer_insumo_tratamiento_detalle(_id)  
        return jsonify(dato)

# controlador para traer el historial de tratamientos del cerdo
@enfermedad.route('/buscar_historia_tratamiendos_cerdo', methods=['POST'])
def buscar_historia_tratamiendos_cerdo():
    if request.method == 'POST':
        _id = request.form['id']  
        _f_i = request.form['f_i']  
        _f_f = request.form['f_f']  
 
        dato = Enfermedad.Buscar_historia_tratamiendos_cerdo(_id, _f_i, _f_f)  
        return jsonify(dato)