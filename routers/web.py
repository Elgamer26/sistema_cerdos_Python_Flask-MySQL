from flask import Blueprint, request
from os import getcwd, path, remove
from models.web import Web
import time

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
web = Blueprint('web', __name__)
# para mover la imagen
PATH_FILE = getcwd() + "/static/uploads/web/" 

# controlador para csubir la foto de la web 1
@web.route('/subir_foto_1', methods=['POST'])
def subir_foto_1():
    if request.method == 'POST':       
        try:
            foto_ac = request.form['ruta_actual']  
            file = request.files.get("foto", False)
            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename
            data = Web.Subir_foto_1(archivo)
            if data == 1:
                file.save(PATH_FILE + archivo)
                # para no eliminar la foto por defecto
                if foto_ac != "user.png":
                    # esto es paar saber si el archivo existe y elimiarlo
                    if path.isfile(PATH_FILE + foto_ac) == True:
                        remove(PATH_FILE + foto_ac)                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para csubir la foto de la web 2
@web.route('/subir_foto_2', methods=['POST'])
def subir_foto_2():
    if request.method == 'POST':       
        try:
            foto_ac = request.form['ruta_actual']  
            file = request.files.get("foto", False)
            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename
            data = Web.Subir_foto_2(archivo)
            if data == 1:
                file.save(PATH_FILE + archivo)
                # para no eliminar la foto por defecto
                if foto_ac != "user.png":
                    # esto es paar saber si el archivo existe y elimiarlo
                    if path.isfile(PATH_FILE + foto_ac) == True:
                        remove(PATH_FILE + foto_ac)                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para csubir la foto de la web 3
@web.route('/subir_foto_3', methods=['POST'])
def subir_foto_3():
    if request.method == 'POST':       
        try:
            foto_ac = request.form['ruta_actual']  
            file = request.files.get("foto", False)
            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename
            data = Web.Subir_foto_3(archivo)
            if data == 1:
                file.save(PATH_FILE + archivo)
                # para no eliminar la foto por defecto
                if foto_ac != "user.png":
                    # esto es paar saber si el archivo existe y elimiarlo
                    if path.isfile(PATH_FILE + foto_ac) == True:
                        remove(PATH_FILE + foto_ac)                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para editar el detalle de la web
@web.route('/detalle_de_web', methods=['POST'])
def detalle_de_web():
    if request.method == 'POST': 
        _detalle1 = request.form['detalle1']
        _detalle2 = request.form['detalle2']
        _detalle3 = request.form['detalle3'] 
         
        dato = Web.Detalle_de_web(_detalle1, _detalle2, _detalle3)
        return str(dato)
   