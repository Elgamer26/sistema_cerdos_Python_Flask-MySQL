from utils.db import mysql
from datetime import datetime

class Enfermedad():
    # modelo para crear el veterinrio
    def Registrar_veterinario(_nombre, _apellido, _numero_doc, _telefono, _direccion, _sucursal):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM veterinario WHERE documento = "{0}"'. format(_numero_doc))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO veterinario (nombre, apellido, documento, telefono, direccion, sucursal) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}")'.format(_nombre,_apellido,_numero_doc,_telefono,_direccion,_sucursal))
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
    
    # modelo para listar el veterinario
    def Listar_veterinario():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM veterinario')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["nombre"] = datos[1]
                dic["apellido"] = datos[2]
                dic["documento"] = datos[3]
                dic["telefono"] = datos[4]
                dic["direccion"] = datos[5]
                dic["sucursal"] = datos[6] 
                dic["estado"] = datos[7]                
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del veterinario
    def Estado_veterinario(_id,_dato):
        try:
            query = mysql.connection.cursor() 
            query.execute('UPDATE veterinario SET estado = "{0}" WHERE id = "{1}" '.format(_dato,_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el veterinrio
    def Editar_veterinario(_nombre, _apellido, _numero_doc, _telefono, _direccion, _sucursal, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM veterinario WHERE documento="{0}" AND id!="{1}"'. format(_numero_doc, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE veterinario SET nombre="{0}", apellido="{1}", documento="{2}", telefono="{3}", direccion="{4}", sucursal="{5}" WHERE id="{6}"'.format(_nombre,_apellido,_numero_doc,_telefono,_direccion,_sucursal,_id))
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
    
    # modelo para crear la enfermedad
    def Registrar_tipo_enfermedad(_nombre, _descripcion):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM enfermedad WHERE nombre = "{0}"'. format(_nombre))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO enfermedad (nombre, descripcion) VALUES ("{0}","{1}")'.format(_nombre,_descripcion))
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
    
    # modelo para listar la enfermedad
    def Listar_enfermedad():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM enfermedad')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["nombre"] = datos[1]
                dic["descripcion"] = datos[2] 
                dic["estado"] = datos[3]                
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado de la enfermedad
    def Estado_enfermedad(_id,_dato):
        try:
            query = mysql.connection.cursor() 
            query.execute('UPDATE enfermedad SET estado = "{0}" WHERE id = "{1}" '.format(_dato,_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar la enfermedad
    def Editar_tipo_enfermedad(_nombre, _descripcion, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM enfermedad WHERE nombre="{0}" AND id!="{1}"'. format(_nombre,_id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE enfermedad SET nombre="{0}", descripcion="{1}" WHERE id="{2}"'.format(_nombre,_descripcion,_id))
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
    
    # modelo para crear el tipo de tratamientos
    def Registrar_tipo_tratamiento(_nombre, _descripcion):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_tratamiento WHERE nombre = "{0}"'. format(_nombre))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO tipo_tratamiento (nombre, descripcion) VALUES ("{0}","{1}")'.format(_nombre,_descripcion))
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

    # modelo para listar el tipo de tratamiento
    def Listar_tipo_tratamiento():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_tratamiento')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["nombre"] = datos[1]
                dic["descripcion"] = datos[2] 
                dic["estado"] = datos[3]                
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del tipo de tratamiento
    def Estado_tipo_tratamiento(_id,_dato):
        try:
            query = mysql.connection.cursor() 
            query.execute('UPDATE tipo_tratamiento SET estado = "{0}" WHERE id = "{1}" '.format(_dato,_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el tipo de tratamientos
    def Editar_tipo_tratamiento(_nombre, _descripcion, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_tratamiento WHERE nombre = "{0}" AND id != "{1}"'. format(_nombre, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE tipo_tratamiento SET nombre="{0}", descripcion="{1}"WHERE id="{2}"'.format(_nombre,_descripcion,_id))
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

    # modelo para listar el veterinario combo
    def Select_veterinario():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM veterinario WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

   # modelo para listar la enfermedad combo
    def Select_enfermedades():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM enfermedad WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para crear la enfermedades del cerdo
    def Guardar_enfermedad_cerdo(_cerdo_id,_fecha,_sintomas,_diagnostico,_veterinario):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO enfermedad_cerdo (cerdo_id, fecha,sintomas,diagnostico,veterinario_id) VALUES ("{0}","{1}","{2}","{3}","{4}")'.format(_cerdo_id,_fecha,_sintomas,_diagnostico,_veterinario))
            query.connection.commit()
            id = query.lastrowid
            query.close()
            return id  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registrar el detalle de enfermedad del cerdo
    def Guardar_detalle_enfermedad_cerdo(_id, ida):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO detalle_enfermedad_cerdo (cerdo_enfermedad_id, enfermedad_id) VALUES ("{0}","{1}")'.format(_id,ida))
            query.connection.commit() 
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar loscerdos enfermos en espera
    def Listra_cerdos_enfermos_espera():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            enfermedad_cerdo.id,
                            CONCAT_WS( ' ', 'Código: ', cerdo.codigo, ' - Sexo: ', cerdo.sexo, ' - Raza: ', raza.raza, ' - Peso: ', cerdo.peso ) AS cerdo,
                            CONCAT_WS( ' ', veterinario.nombre, veterinario.apellido ) AS veterinario,
                            enfermedad_cerdo.fecha,
                            enfermedad_cerdo.sintomas,
                            enfermedad_cerdo.diagnostico,
                            enfermedad_cerdo.estado,
                            enfermedad_cerdo.cerdo_id,
                            enfermedad_cerdo.veterinario_id 
                        FROM
                            enfermedad_cerdo
                            INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                            INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                            enfermedad_cerdo.estado = 1 ORDER BY enfermedad_cerdo.id DESC""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listar los cerdos tratados por enfermedad
    def Listra_cerdos_tratados():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            enfermedad_cerdo.id,
                            CONCAT_WS( ' ', 'Código: ', cerdo.codigo, ' - Sexo: ', cerdo.sexo, ' - Raza: ', raza.raza, ' - Peso: ', cerdo.peso ) AS cerdo,
                            CONCAT_WS( ' ', veterinario.nombre, veterinario.apellido ) AS veterinario,
                            enfermedad_cerdo.fecha,
                            enfermedad_cerdo.sintomas,
                            enfermedad_cerdo.diagnostico,
                            enfermedad_cerdo.estado,
                            enfermedad_cerdo.cerdo_id,
                            enfermedad_cerdo.veterinario_id 
                        FROM
                            enfermedad_cerdo
                            INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                            INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                            enfermedad_cerdo.estado = 0 ORDER BY enfermedad_cerdo.id DESC""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para traer el detalle de enfermedad del cerdo
    def Modal_enfermedad_detalle(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_enfermedad_cerdo.id,
                        detalle_enfermedad_cerdo.cerdo_enfermedad_id,
                        enfermedad.nombre 
                    FROM
                        detalle_enfermedad_cerdo
                        INNER JOIN enfermedad ON detalle_enfermedad_cerdo.enfermedad_id = enfermedad.id 
                    WHERE
                        detalle_enfermedad_cerdo.cerdo_enfermedad_id = '{0}'""".format(_id))
            data = query.fetchall()
            query.close() 
            if not data:
               return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    dic["id"] = datos[0]                     
                    dic["id_2"] = datos[1] 
                    dic["nombre"] = datos[2]              
                    new_lista.append(dic)
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para eliminar el registro de cerdo enfermo
    def Eliminar_cerdo_espera(_id):
        try:
            query = mysql.connection.cursor() 
            query.execute('DELETE FROM enfermedad_cerdo WHERE id="{0}"'.format(_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para eliminar el registro de cerdo enfermo
    def Eliminar_detalle_enfermedad_cerdo(_id):
        try:
            query = mysql.connection.cursor() 
            query.execute('DELETE FROM detalle_enfermedad_cerdo WHERE id="{0}"'.format(_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer los datos del cerdo enfermo
    def Traer_cerdo_enfermo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            enfermedad_cerdo.id, 
                            cerdo.peso,
                            CONCAT_WS(' ', veterinario.nombre, veterinario.apellido ) AS veterinario,
                            enfermedad_cerdo.fecha,
                            enfermedad_cerdo.sintomas,
                            enfermedad_cerdo.diagnostico,
                            enfermedad_cerdo.estado,
                            enfermedad_cerdo.cerdo_id,
                            enfermedad_cerdo.veterinario_id 
                        FROM
                            enfermedad_cerdo
                            INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                            INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                            enfermedad_cerdo.estado = 1 AND  enfermedad_cerdo.id = '{0}' """.format(_id))
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

    # modelo para traer la cantidad del insumo
    def Traer_cantidad_insumo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        insumo.cantidad
                    FROM
                        insumo WHERE insumo.id = '{0}' """.format(_id))
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

    # modelo para el select del tratamiento
    def Combo_tratamiento():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_tratamiento WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para el select del medicamento
    def Combo_medicamento():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        medicamento.id,
                        medicamento.codigo,
                        medicamento.nombre,
                        tipo_medicamento.tipo,
                        medicamento.estado 
                    FROM
                        medicamento
                        INNER JOIN tipo_medicamento ON medicamento.tipo_id = tipo_medicamento.id 
                    WHERE
                        medicamento.estado = 1""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer la cantidad del medicamento
    def Traer_cantidad_medicamento(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        medicamento.cantidad
                    FROM
                        medicamento WHERE medicamento.id = '{0}' """.format(_id))
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

    # modelo para crear el el tratamiendo del cerdo
    def Guardar_tratamiendo_cerdoos(_cerdo_id, _peso, _fecha_i, _fecha_f, _dobservacion):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO tratamiento_cerdos (enfer_cerdo_id,peso,fecha_i,fecha_f,observacion) VALUES ("{0}","{1}","{2}","{3}","{4}")'.format(_cerdo_id,_peso,_fecha_i,_fecha_f,_dobservacion))
            query.connection.commit()

            # me devuelve el ultimo id insertado
            id = query.lastrowid

            query.execute('UPDATE enfermedad_cerdo SET estado = 0 WHERE id = "{0}"'.format(_cerdo_id))
            query.connection.commit()

            query.close()
            return id  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registrar el detalle de insumo de enfermedad
    def Guardar_detalle_insumo_enfermedad(_id, ida, cantidad):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO detalle_enfermedad_insumo (tratamiento_id, insumo_id, cantidad) VALUES ("{0}","{1}","{2}")'.format(_id,ida,cantidad))
            query.connection.commit() 

            query.execute('UPDATE insumo SET cantidad = cantidad - "{0}" WHERE id = "{1}"'.format(cantidad,ida))
            query.connection.commit() 

            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registrar el detalle de medicina de enfermedad
    def Guardar_detalle_medicina_enfermedad(_id, ida, cantidad):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO detalle_enfermedad_medicina (trata_id, medicina_id, cantidad) VALUES ("{0}","{1}","{2}")'.format(_id,ida,cantidad))
            query.connection.commit() 

            query.execute('UPDATE medicamento SET cantidad = cantidad - "{0}" WHERE id = "{1}"'.format(cantidad,ida))
            query.connection.commit() 

            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registrar el detalle de tratamiento de enfermedad
    def guardar_detalle_tratamiento_enfermedad(_id, ida):
        try:
            query = mysql.connection.cursor() 
            query.execute('INSERT INTO detalle_enfermedad_tratmiento (tratamiento_id, tipo_id) VALUES ("{0}","{1}")'.format(_id,ida))
            query.connection.commit() 
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listado de trataiendos de los cerdos
    def Listado_tratamientos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        tratamiento_cerdos.id,
                        tratamiento_cerdos.enfer_cerdo_id,
                        CONCAT_WS( ' ', 'Código: ', cerdo.codigo, '- Sexo: ',cerdo.sexo,  '- Raza: ', raza.raza ) AS cerdo,
                        CONCAT_WS( ' ', veterinario.nombre, veterinario.apellido ) AS veterinario,
                        tratamiento_cerdos.peso,
                        tratamiento_cerdos.fecha_i,
                        tratamiento_cerdos.fecha_f,
                        tratamiento_cerdos.observacion,
                        tratamiento_cerdos.estado 
                    FROM
                        tratamiento_cerdos
                        INNER JOIN enfermedad_cerdo ON tratamiento_cerdos.enfer_cerdo_id = enfermedad_cerdo.id
                        INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                        INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza ORDER BY tratamiento_cerdos.id DESC""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para traer el detalle del tratamiendo del cerdo
    def Ver_detalle_tratamiendo_cerdo(_id, _id_enfer):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_enfermedad_cerdo.cerdo_enfermedad_id,
                        enfermedad.nombre 
                        FROM
                            detalle_enfermedad_cerdo
                            INNER JOIN enfermedad ON detalle_enfermedad_cerdo.enfermedad_id = enfermedad.id 
                        WHERE
                            detalle_enfermedad_cerdo.cerdo_enfermedad_id = '{0}'""".format(_id_enfer))
            detalle = query.fetchall()

            query.execute("""SELECT
                            enfermedad_cerdo.fecha, 
                            enfermedad_cerdo.sintomas, 
                            enfermedad_cerdo.diagnostico
                        FROM
                            enfermedad_cerdo WHERE enfermedad_cerdo.id = '{0}'""".format(_id_enfer))
            data2 = query.fetchone()

            query.close() 

            Convert = datetime.strptime(str(data2[0]), '%Y-%m-%d')
            fecha = Convert.strftime('%Y-%m-%d')

            cabeza = {
                '0': fecha,
                '1': data2[1] ,
                '2': data2[2],
            }

            data = {
                'detalle': detalle,
                'cabeza': cabeza
            }
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    def Traer_insumo_enfermedad_detalle(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            insumo.nombre,
                            tipo_insumo.tipo,
                            detalle_enfermedad_insumo.cantidad 
                        FROM
                            detalle_enfermedad_insumo
                            INNER JOIN insumo ON detalle_enfermedad_insumo.insumo_id = insumo.id
                            INNER JOIN tipo_insumo ON insumo.tipo_id = tipo_insumo.id 
                        WHERE
                            detalle_enfermedad_insumo.tratamiento_id = '{0}'""". format(_id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    def Traer_insumo_medicamento_detalle(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        medicamento.nombre,
                        tipo_medicamento.tipo,
                        detalle_enfermedad_medicina.cantidad 
                    FROM
                        detalle_enfermedad_medicina
                        INNER JOIN medicamento ON detalle_enfermedad_medicina.medicina_id = medicamento.id
                        INNER JOIN tipo_medicamento ON medicamento.tipo_id = tipo_medicamento.id 
                    WHERE
                        detalle_enfermedad_medicina.trata_id = '{0}'""". format(_id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    def Traer_insumo_tratamiento_detalle(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            tipo_tratamiento.nombre 
                        FROM
                            detalle_enfermedad_tratmiento
                            INNER JOIN tipo_tratamiento ON detalle_enfermedad_tratmiento.tipo_id = tipo_tratamiento.id 
                        WHERE
                            detalle_enfermedad_tratmiento.tratamiento_id = '{0}'""". format(_id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer el historial de tratamientos del cerdo
    def Buscar_historia_tratamiendos_cerdo(_id, _f_i, _f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            tratamiento_cerdos.id,
                            tratamiento_cerdos.enfer_cerdo_id,
                            CONCAT_WS( ' ', 'Código: ', cerdo.codigo, '- Sexo: ', cerdo.sexo, '- Raza: ', raza.raza ) AS cerdo,
                            CONCAT_WS( ' ', veterinario.nombre, veterinario.apellido ) AS veterinario,
                            tratamiento_cerdos.peso,
                            tratamiento_cerdos.fecha_i,
                            tratamiento_cerdos.fecha_f,
                            tratamiento_cerdos.observacion,
                            tratamiento_cerdos.estado,
                            DATE( tratamiento_cerdos.fecha) as fecha  
                        FROM
                            tratamiento_cerdos
                            INNER JOIN enfermedad_cerdo ON tratamiento_cerdos.enfer_cerdo_id = enfermedad_cerdo.id
                            INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                            INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                            enfermedad_cerdo.cerdo_id = '{0}' 
                            AND DATE( tratamiento_cerdos.fecha ) BETWEEN '{1}' 
                            AND '{2}' 
                        ORDER BY
                            tratamiento_cerdos.id DESC""". format(_id, _f_i, _f_f))
            data = query.fetchall()
            query.close() 
            if not data:
                return 0
            else:            
                new_lista = []
                for datos in data:
                    dic = {}
                    Convert_i = datetime.strptime(str(datos[5]), '%Y-%m-%d')
                    dic["fecha_i"] = Convert_i.strftime('%Y-%m-%d')

                    Convert_f = datetime.strptime(str(datos[6]), '%Y-%m-%d')
                    dic["fecha_f"] = Convert_f.strftime('%Y-%m-%d')

                    Convert_s = datetime.strptime(str(datos[9]), '%Y-%m-%d')
                    dic["fecha"] = Convert_s.strftime('%Y-%m-%d')

                    dic["id"] = datos[0]
                    dic["enfer_cerdo_id"] = datos[1]
                    dic["cerdo"] = datos[2]
                    dic["veterinario"] = datos[3]
                    dic["peso"] = datos[4]
                    dic["origen"] = datos[6]
                    dic["observacion"] = datos[7] 
                    dic["estado"] = datos[8]          
                    new_lista.append(dic)
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
