from flask import Blueprint, render_template, request, redirect, url_for
from os import getcwd, path, remove
from flask import jsonify, session
from models.usuario import Usuario
import time
import random

# es un enrutador
# ojo cuando agas una redirecion usa index.luego la funcion
usuario = Blueprint('usuario', __name__)
# para mover la imagen
PATH_FILE = getcwd() + "/static/uploads/usuario/"
PATH_EMPRESA = getcwd() + "/static/uploads/empresa/"

# controlador para verificar el correo del usuario
@usuario.route('/verificar_correo', methods=['POST'])
def verificar_correo():
    if request.method == 'POST':
        correo = request.form['correo']
        dato = Usuario.Verificar_correo(correo)
        if dato == 0:
            return jsonify(dato)
        else:
            minus = "abcdefghijklmnopqrstuvwxyz"
            mayus = minus.upper()
            numeros = "0123456789"
            simbolos = "@-&+.=/"

            base = minus+mayus+numeros+simbolos
            longitud = 12

            for _ in range(10):
                muestra = random.sample(base, longitud)
                password = "".join(muestra)

            return jsonify(password)

# controlador para restablecer el password del usuario mediante su correo
@usuario.route('/restablecer_password', methods=['POST'])
def restablecer_password():
    if request.method == 'POST':
        correo = request.form['correo']
        password = request.form['password']
        dato = Usuario.Restablecer_password(correo, password)
        return jsonify(dato)

# controlador para crear un nuevo rol
@usuario.route('/crear_rol', methods=['POST'])
def crear_rol():
    if request.method == 'POST':
        _rol = request.form['rol']
        dato = Usuario.crear_rol(_rol)
        return jsonify(dato)

# controlador para registrar los permisos del rol
@usuario.route('/crear_permisos_rol', methods=['POST'])
def crear_permisos_rol():
    if request.method == 'POST':
        id = request.form['id']
        usuario = request.form['usuario']
        config = request.form['config']
        cerdo = request.form['cerdo']
        galpon = request.form['galpon']
        cergal = request.form['cergal']
        compraventa = request.form['compraventa']
        alicerdo = request.form['alicerdo']
        insumo = request.form['insumo']
        medicamento = request.form['medicamento']
        alimentacion = request.form['alimentacion']
        alimcerdo = request.form['alimcerdo']
        pesaje = request.form['pesaje']
        enfertrata = request.form['enfertrata']
        cerdosenfer = request.form['cerdosenfer']
        tratamiento = request.form['tratamiento'] 
    
        dato = Usuario.Crear_permisos_rol(id, usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento)
        return str(dato)

# controlador para listar el rol
@usuario.route('/listar_rol', methods=['GET'])
def listar_rol():
    if request.method == 'GET':
        dato = Usuario.Listar_rol()
        return jsonify(dato)

# controlador para estado del rol
@usuario.route('/estado_rol', methods=['POST'])
def estado_rol():
    if request.method == 'POST':
        _id = request.form['id']
        _dato = request.form['dato']
        dato = Usuario.Estado_rol(_id, _dato)
        return str(dato)

# controlador para editar rol
@usuario.route('/editar_rol', methods=['POST'])
def editar_rol():
    if request.method == 'POST':
        _rol = request.form['rol']
        _id = request.form['id']
        dato = Usuario.Editar_rol(_rol, _id)
        return jsonify(dato)

# controlador para obtener los permisso del rol
@usuario.route('/obtener_permisos', methods=['POST'])
def obtener_permisos():
    if request.method == 'POST':
        id = request.form['id']
        dato = Usuario.Obtener_permisos(id)
        return jsonify(dato)

# controlador para editar los permisos del rol
@usuario.route('/editar_permisos_rol', methods=['POST'])
def editar_permisos_rol():
    if request.method == 'POST':
        id_rol = request.form['id_rol']
        id_permiso = request.form['id_permiso']
        usuario = request.form['usuario']
        config = request.form['config']
        cerdo = request.form['cerdo']
        galpon = request.form['galpon']
        cergal = request.form['cergal']
        compraventa = request.form['compraventa']
        alicerdo = request.form['alicerdo']
        insumo = request.form['insumo']
        medicamento = request.form['medicamento']
        alimentacion = request.form['alimentacion']
        alimcerdo = request.form['alimcerdo']
        pesaje = request.form['pesaje']
        enfertrata = request.form['enfertrata']
        cerdosenfer = request.form['cerdosenfer']
        tratamiento = request.form['tratamiento'] 
    
        dato = Usuario.Editar_permisos_rol(id_rol, id_permiso, usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento)
        return str(dato)

# controlador para validara los datos existetes de un usuario
@usuario.route('/validar_datos_usuario_register', methods=['POST'])
def validar_datos_usuario_register():
    if request.method == 'POST':
        usuario = request.form['usuario']
        correo = request.form['correo']
        cedula = request.form['cedula']
        dato = Usuario.Validar_datos_usuario_register(usuario, correo, cedula)
        if str(dato) == '1':
            minus = "abcdefghijklmnopqrstuvwxyz"
            mayus = minus.upper()
            numeros = "0123456789"
            simbolos = "@-&+.=/"
            base = minus+mayus+numeros+simbolos
            longitud = 12
            for _ in range(10):
                muestra = random.sample(base, longitud)
                password = "".join(muestra)
            return jsonify(password)
        else:
            return str(dato)

# controlador para crear un producto
@usuario.route('/crear_user', methods=['POST'])
def crear_user():
    if request.method == 'POST':
        _nombres = request.form['nombres']
        _apellidos = request.form['apellidos']
        _domicilio = request.form['domicilio']
        _telefono = request.form['telefono']
        _tipo_rol = request.form['tipo_rol']
        _usuario = request.form['usuario']
        _password = request.form['password']
        _correo = request.form['correo']
        _cedula = request.form['cedula']
        _foto = request.files.get("foto", False)

        if _foto:
            # usuario con foto
            hora_ac = time.strftime('%Y%m%d%H%M%S_', time.localtime())
            archivo = hora_ac + _foto.filename             
            dato = Usuario.Craer_usuario(_nombres, _apellidos, _domicilio, _telefono, _tipo_rol, _usuario, _password, archivo, _correo, _cedula)
            if dato == 1:
                _foto.save(PATH_FILE + archivo)
                return str(dato)
            else:
                return str(dato)
        
        else:
            # usuario sin foto
            archivo = "user.png"
            dato = Usuario.Craer_usuario(_nombres, _apellidos, _domicilio, _telefono, _tipo_rol, _usuario, _password, archivo, _correo, _cedula)
            return str(dato)

# controlador para listar los usuarios
@usuario.route('/listar_usuarios', methods=['GET'])
def listar_usuarios():
    if request.method == 'GET':
        dato = Usuario.Listar_usuarios()
        return jsonify(dato)

# controlador para el estado del usuario
@usuario.route('/estado_usuario', methods=['POST'])
def estado_usuario():
    if request.method == 'POST':
        _id = request.form['id']
        _dato = request.form['dato']
        dato = Usuario.Estado_usuario(_id, _dato)
        return str(dato)

# controlador para editar un producto
@usuario.route('/editar_usurio', methods=['POST'])
def editar_usurio():
    if request.method == 'POST':
        _id = request.form['id']
        _nombres = request.form['nombres']
        _apellidos = request.form['apellidos']
        _domicilio = request.form['domicilio']
        _telefono = request.form['telefono']
        _tipo_rol = request.form['tipo_rol']
        _usuario = request.form['usuario'] 
        _correo = request.form['correo'] 
        _cedula = request.form['cedula'] 
         
        dato = Usuario.Editar_usuario(_id, _nombres, _apellidos, _domicilio, _telefono, _tipo_rol, _usuario, _correo, _cedula)
        return str(dato)
   
# para editar la foto del usuario
@usuario.route('/cambiar_foto_usuario', methods=['POST'])
def cambiar_foto_usuario():
    if request.method == 'POST':
        try:
            _id = request.form['id']
            foto_ac = request.form['ruta_actual']
            file = request.files.get("foto", False)

            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename

            data = Usuario.Editar_photo_user(_id, archivo)

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

# controlador para editar la empresa
@usuario.route('/editar_empresa', methods=['POST'])
def editar_empresa():
    if request.method == 'POST':
        _nombres = request.form['nombres']
        _ruc = request.form['ruc']
        _telefono = request.form['telefono']
        _direccion = request.form['direccion']
        _correo = request.form['correo']
        _encargado = request.form['encargado'] 
        _descripcion = request.form['descripcion'] 
         
        dato = Usuario.Editar_empresa(_nombres, _ruc, _telefono, _direccion, _correo, _encargado, _descripcion)
        return str(dato)

# para editar la foto del usuario
@usuario.route('/cambiar_foto_empresa', methods=['POST'])
def cambiar_foto_empresa():
    if request.method == 'POST':
        try:

            foto_ac = request.form['ruta_actual']
            file = request.files.get("foto", False)

            hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
            archivo = hora_ac + file.filename

            data = Usuario.Editar_photo_empresa(archivo)

            if data == 1:
                file.save(PATH_EMPRESA + archivo)
                # esto es paar saber si el archivo existe y elimiarlo
                if path.isfile(PATH_EMPRESA + foto_ac) == True:
                    remove(PATH_EMPRESA + foto_ac)
                
                return str(data)
            else:
                return str(data)
        except Exception as e:
            error = "Error " + str(e)
            return error

# controlador para listar los usuarios
@usuario.route('/datos_usuarios_logeo', methods=['GET'])
def datos_usuarios_logeo():
    if request.method == 'GET':
        if 'id_usu' in session and 'id_rol' in session:
            _id = session['id_usu']
            _id_rol = session['id_rol']
            dato = Usuario.Datos_usuarios_logeo(_id, _id_rol)
            return jsonify(dato)

# controlador para editar un producto
@usuario.route('/editar_usuario_logeado', methods=['POST'])
def editar_usuario_logeado():
    if request.method == 'POST':
        if 'id_usu' in session and 'id_rol' in session:
            _id = session['id_usu']
            _nombres = request.form['nombres']
            _apellidos = request.form['apellidos']
            _domicilio = request.form['domicilio']
            _telefono = request.form['telefono']
            _usuario = request.form['usuario'] 
            _correp = request.form['correo_l']
            _cedula = request.form['cedula_l'] 
            
            dato = Usuario.Editar_usuario_loegado(_id, _nombres, _apellidos, _domicilio, _telefono, _usuario, _correp, _cedula)
            return str(dato)

# para editar la foto del usuario loegado
@usuario.route('/cambiar_foto_usuario_logeo', methods=['POST'])
def cambiar_foto_usuario_logeo():
    if request.method == 'POST':
        try:
             if 'id_usu' in session and 'id_rol' in session:
                _id = session['id_usu']
                foto_ac = request.form['ruta_actual']
                file = request.files.get("foto", False)

                hora_ac = time.strftime('%Y%m%d%H%M%S', time.localtime())
                archivo = hora_ac + file.filename

                data = Usuario.Editar_photo_user(_id, archivo)

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

# controlador para editar el password del usuario
@usuario.route('/cambiar_password', methods=['POST'])
def cambiar_password():
    if request.method == 'POST':
        if 'id_usu' in session and 'id_rol' in session:
            _id = session['id_usu']
            _password = request.form['password_n'] 
            
            dato = Usuario.Cambiar_password(_id, _password)
            return str(dato)
