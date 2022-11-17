from flask import Blueprint, request
from flask import jsonify
from models.vacunas import Vacunas  

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
vacunas = Blueprint('vacunas', __name__)

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
