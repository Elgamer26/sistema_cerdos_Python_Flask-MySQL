from utils.db import mysql

class Usuario():
    # para e inicio de sesión
    def login(usuario, password):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT usuario_id, rol_id, estado  FROM usuario WHERE binary usuario = "{0}" AND binary passwordd = "{1}"'. format(
                usuario, password))
            data = query.fetchone()
            query.close()
            if not data:
                return 0
            else:
                return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # para verificar el correo del usuario
    def Verificar_correo(correo):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM usuario WHERE correo = "{0}"'. format(correo))
            data = query.fetchone()
            query.close()
            if not data:
                return 0
            else:
                return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para restablecer el password del usuario mediante su correo
    def Restablecer_password(correo, password):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE usuario SET passwordd = "{0}" WHERE correo = "{1}"'.format(password, correo))
            query.connection.commit()
            query.close()
            return 1  # se update correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # para los datos del dashboard
    def Traer_datos_dashboard():
        try:
            query = mysql.connection.cursor()
            query.execute('CALL sp_dasboard()')
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # para los datos del dashboard
    def Diez_cerdos_gordos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        CONCAT_WS( ' ', cerdo.codigo, ' - ', raza.raza ) AS cerdo,
                        cerdo.peso 
                        FROM
                            cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                            cerdo.estado = 1 
                        ORDER BY
                        cerdo.peso DESC""")
            data = query.fetchall()
            query.close()
            if not data:
                return 0
            else:
                return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para crear un nuevo rol
    def crear_rol(_rol):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM rol WHERE binary rol = "{0}"'. format(_rol))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO rol (rol) VALUES ("{0}")'.format(_rol))
                query.connection.commit()
                id = query.lastrowid
                query.close()
                return id # se inserto correcto
            else:
                query.close()
                return 2
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para registrar los permisos del rol
    def Crear_permisos_rol(id, usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO permisos (rol_id,usuario,config,cerdo,galpon,cerdo_galpon,compra_venta,alimento_cerdos,insumos_cerdo,medicamento,alimentacion,alimentaion_cerdo,pesaje,enfermedades_tratamiento,cerdo_enfermo,tratamiento) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}","{10}","{11}","{12}","{13}","{14}","{15}")'.format(id, usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar los permisos del rol
    def Editar_permisos_rol(id_rol, id_permiso, usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE permisos SET usuario = "{0}" ,config = "{1}" ,cerdo = "{2}" ,galpon = "{3}" ,cerdo_galpon = "{4}" ,compra_venta = "{5}" ,alimento_cerdos = "{6}" ,insumos_cerdo = "{7}" ,medicamento = "{8}" ,alimentacion = "{9}" ,alimentaion_cerdo = "{10}" ,pesaje = "{11}" ,enfermedades_tratamiento = "{12}" ,cerdo_enfermo = "{13}" ,tratamiento = "{14}" WHERE rol_id = "{15}" AND id = "{16}"'.format(usuario, config, cerdo, galpon, cergal, compraventa, alicerdo, insumo, medicamento, alimentacion, alimcerdo, pesaje, enfertrata, cerdosenfer, tratamiento, id_rol, id_permiso))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo de listar rol
    def Listar_rol():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM rol')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id_rol"] = datos[0]
                dic["rol"] = datos[1]
                dic["estado"] = datos[2]
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para obtener los permisso del rol
    def Obtener_permisos(id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM permisos WHERE rol_id = "{0}"'. format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del rol
    def Estado_rol(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE rol SET estado = "{0}" WHERE rol_id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el rol
    def Editar_rol(_rol, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM rol WHERE binary rol = "{0}" AND rol_id != "{1}"'. format(_rol, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE rol SET rol = "{0}" WHERE rol_id = "{1}"'.format(_rol, _id))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo de listar rol
    def Listar_rol_combo():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT rol_id, rol FROM rol WHERE estado = 1')
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para crear un nuevo usuario
    def Craer_usuario(_nombres, _apellidos, _domicilio, _telefono, _tipo_rol, _usuario, _password, archivo, _correo):
        try:
            query = mysql.connection.cursor()

            query.execute('SELECT * FROM usuario WHERE usuario = "{0}"'. format(_usuario))
            data = query.fetchone()
            if not data:

                query.execute('SELECT * FROM usuario WHERE correo = "{0}"'. format(_correo))
                datac = query.fetchone()
                if not datac:

                    query.execute('INSERT INTO usuario (nombres, apellidos, usuario, passwordd, rol_id, domicilio, telefono, foto, correo) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}")'.format(_nombres, _apellidos, _usuario, _password, _tipo_rol, _domicilio, _telefono, archivo, _correo))
                    query.connection.commit()
                    query.close()
                    return 1  # se inserto correcto

                else:

                    query.close()
                    return 3 # correo ya existe

            else:
                query.close()
                return 2 # usuario ya existe
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo de listar usuarios
    def Listar_usuarios():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        usuario.usuario_id,
                        usuario.nombres,
                        usuario.apellidos,
                        usuario.usuario,
                        usuario.passwordd,
                        usuario.rol_id,
                        usuario.domicilio,
                        usuario.telefono,
                        usuario.foto,
                        usuario.estado,
                        rol.rol,
                        usuario.correo
                        FROM
                        usuario
                        INNER JOIN rol ON usuario.rol_id = rol.rol_id""")
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["nombres"] = datos[1]
                dic["apellidos"] = datos[2]
                dic["usuario"] = datos[3]
                dic["passwordd"] = datos[4]
                dic["rol_id"] = datos[5]
                dic["domicilio"] = datos[6]
                dic["telefono"] = datos[7]
                dic["foto"] = datos[8]
                dic["estado"] = datos[9]
                dic["rol"] = datos[10]
                dic["correo"] = datos[11]
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del usuario
    def Estado_usuario(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE usuario SET estado = "{0}" WHERE usuario_id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el usuario
    def Editar_usuario(_id, _nombres, _apellidos, _domicilio, _telefono, _tipo_rol, _usuario, _correo):
        try:
            query = mysql.connection.cursor()

            query.execute('SELECT * FROM usuario WHERE usuario = "{0}" AND usuario_id != "{1}"'. format(_usuario, _id))
            data = query.fetchone()
            if not data:

                query.execute('SELECT * FROM usuario WHERE correo = "{0}" AND usuario_id != "{1}"'. format(_correo, _id))
                datac = query.fetchone()
                if not datac:

                    query.execute('UPDATE usuario SET nombres = "{0}", apellidos = "{1}", usuario = "{2}", rol_id = "{3}", domicilio = "{4}", telefono = "{5}", correo = "{6}" WHERE usuario_id = "{7}"'.format(_nombres, _apellidos, _usuario, _tipo_rol, _domicilio, _telefono, _correo, _id))
                    query.connection.commit()
                    query.close()
                    return 1  # se inserto correcto
                
                else:
                    query.close()
                    return 3 # correo ya existe

            else:
                query.close()
                return 2 # usuario ya existe
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del usuario
    def Editar_photo_user(_id, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE usuario SET foto = "{0}" WHERE usuario_id = {1}'.format(archivo, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modeloa para traer los datos de la hacienda
    def Traer_hacienda():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM empresa WHERE id_hacienda = 1')
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el usuario
    def Editar_empresa(_nombres, _ruc, _telefono, _direccion, _correo, _encargado, _descripcion):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE empresa SET nombre = "{0}", ruc = "{1}", telefono = "{2}", correo = "{3}", encargado = "{4}", descripcion = "{5}", direccion = "{6}" WHERE id_hacienda = 1'.format(_nombres, _ruc, _telefono, _correo, _encargado, _descripcion, _direccion))
            query.connection.commit()
            query.close()
            return 1  # editado correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar la imagen de empresa
    def Editar_photo_empresa(archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE empresa SET foto = "{0}" WHERE id_hacienda = 1'.format(archivo))
            query.connection.commit()
            query.close()
            return 1  # editado correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para traer los datos del usuario
    def Datos_usuarios_logeo(_id, _id_rol):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
            usuario.usuario_id,
            usuario.nombres,
            usuario.apellidos,
            usuario.usuario,
            usuario.passwordd,
            usuario.rol_id,
            usuario.domicilio,
            usuario.telefono,
            usuario.foto,
            usuario.estado,
            rol.rol 
            FROM
            usuario
            INNER JOIN rol ON usuario.rol_id = rol.rol_id WHERE usuario.usuario_id = '{0}' AND usuario.rol_id = '{1}'""".format(_id, _id_rol))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el usuario loegado
    def Editar_usuario_loegado(_id, _nombres, _apellidos, _domicilio, _telefono, _usuario):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM usuario WHERE usuario = "{0}" AND usuario_id != "{1}"'. format(_usuario, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE usuario SET nombres = "{0}", apellidos = "{1}", usuario = "{2}", domicilio = "{3}", telefono = "{4}" WHERE usuario_id = "{5}"'.format(_nombres, _apellidos, _usuario, _domicilio, _telefono, _id))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2 # usuario ya existe
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el password del usuario
    def Cambiar_password(_id, _password):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE usuario SET passwordd = "{0}" WHERE usuario_id = "{1}"'.format(_password, _id))
            query.connection.commit()
            query.close()
            return 1
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0