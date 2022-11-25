from utils.db import mysql
from datetime import datetime

class Vacunas():
    # modelo para registra el calendario
    def Calendario_registrar(titulo, cerdo, descripcion, tipo, fecha_evento, color, color_etiqueta):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM calendario WHERE id_cerdo = "{0}" AND start = "{1}" AND tipo = "{2}" AND estado = 1'. format(cerdo,fecha_evento,tipo))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO calendario (id_cerdo,title,descripcion,start,color,textColor,tipo) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}")'.format(cerdo,titulo,descripcion,fecha_evento,color_etiqueta,color,tipo))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2 #ya existe un cerdo en calendario
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar los eventos del calendario
    def Listar_calendario():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        calendario.id,
                        calendario.id_cerdo,
                        calendario.title,
                        calendario.descripcion,
                        calendario.`start`,
                        calendario.color,
                        calendario.textColor,
                        calendario.tipo,
                        calendario.estado,
                        CONCAT_WS( ' ', 'Codigo: ', cerdo.codigo,'- Raza: ', raza.raza, '- Sexo: ', cerdo.sexo ) AS cerdo  
                    FROM
                        calendario
                        INNER JOIN cerdo ON calendario.id_cerdo = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza
                        WHERE calendario.estado = 1""")
            data = query.fetchall()
            query.close() 
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["id_cerdo"] = datos[1]
                dic["title"] = datos[2]
                dic["descripcion"] = datos[3]
                dic["start"] = datos[4]
                dic["color"] = datos[5]
                dic["textColor"] = datos[6]
                dic["tipo"] = datos[7]
                dic["estado"] = datos[8]
                dic["cerdo"] = datos[9]
                new_lista.append(dic)
            return new_lista
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el calendario
    def Calendario_editar(id, titulo, cerdo, descripcion, tipo, fecha_evento, color, color_etiqueta):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM calendario WHERE id_cerdo = "{0}" AND start = "{1}" AND tipo = "{2}" AND id != "{3}" AND estado = 1'. format(cerdo,fecha_evento,tipo,id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE calendario SET id_cerdo="{0}",title="{1}",descripcion="{2}",start="{3}",color="{4}",textColor="{5}",tipo="{6}" WHERE id="{7}"'.format(cerdo,titulo,descripcion,fecha_evento,color_etiqueta,color,tipo,id))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2 #ya existe un cerdo en calendario
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registra el tipo de vacuna
    def Registrar_tipo_vacuna(_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_vacuna WHERE tipo_vacuna = "{0}" '. format(_valor))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO tipo_vacuna (tipo_vacuna) VALUES ("{0}")'.format(_valor))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2 #ya existe
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar el tipo de insumo
    def Listar_tipo_vacuna():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_vacuna')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {} 
                dic["id"] = datos[0]
                dic["tipo"] = datos[1] 
                dic["estado"] = datos[2]       
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar el combo del tipo de vacuna
    def Combo_tipo_vacuna():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_vacuna WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el tipo de vacuna
    def Editar_tipo_vacuna(_id,_dato):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_vacuna WHERE tipo_vacuna = "{0}" AND id != "{1}" '. format(_dato,_id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE tipo_vacuna SET tipo_vacuna = "{0}" WHERE id ="{1}" '.format(_dato,_id))
                query.connection.commit()
                query.close()
                return 1  # se inserto correcto
            else:
                query.close()
                return 2 #ya existe
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el tipo de vacuna
    def Estado_tipo_vacuna(_id,_valor):
        try:
            query = mysql.connection.cursor() 
            query.execute('UPDATE tipo_vacuna SET estado = "{0}" WHERE id = "{1}" '.format(_valor,_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para crear la vacuna
    def Crear_vacuna(_codigo, _nombre, _tipo, _cantidad, _precio, _detalle, _presentacion, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM vacuna WHERE codigo = "{0}"'. format(_codigo))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO vacuna (codigo,nombre,tipo_id,cantidad,precio,detalle,presentacion,foto) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}")'.format(_codigo,_nombre,_tipo,_cantidad,_precio,_detalle,_presentacion,archivo))
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
    
    # modelo para listar las vacunas
    def Listar_vacunas():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        vacuna.id,
                        vacuna.codigo,
                        vacuna.nombre,
                        vacuna.tipo_id,
                        tipo_vacuna.tipo_vacuna,
                        vacuna.cantidad,
                        vacuna.precio,
                        vacuna.detalle,
                        vacuna.presentacion,
                        vacuna.foto,
                        vacuna.estado 
                    FROM
                        vacuna
                        INNER JOIN tipo_vacuna ON vacuna.tipo_id = tipo_vacuna.id""")
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {} 
                dic["id"] = datos[0]
                dic["codigo"] = datos[1]
                dic["nombre"] = datos[2] 
                dic["tipo_id"] = datos[3]
                dic["tipo"] = datos[4]
                dic["cantidad"] = datos[5] 
                dic["precio"] = datos[6]
                dic["detalle"] = datos[7]
                dic["presentacion"] = datos[8]
                dic["foto"] = datos[9] 
                dic["estado"] = datos[10]       
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para cambiar el estado de la vacuna
    def Estado_vacuna(_id,_dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE vacuna SET estado = "{0}" WHERE id = "{1}"'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar la vacuna
    def Editar_vacuna(_codigo, _nombre, _tipo, _cantidad, _precio, _detalle, _presentacion, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM vacuna WHERE codigo = "{0}" AND id != "{1}"'. format(_codigo, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE vacuna SET codigo="{0}",nombre="{1}",tipo_id="{2}",cantidad="{3}",precio="{4}",detalle="{5}",presentacion="{6}" WHERE id = "{7}"'.format(_codigo,_nombre,_tipo,_cantidad,_precio,_detalle,_presentacion,_id))
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
    
    # modelo para editar la foto de la vacuna
    def Editar_foto_vacuna(_id, archivo):
        try:
            query = mysql.connection.cursor() 
            query.execute('UPDATE vacuna SET foto="{0}" WHERE id="{1}"'.format(archivo,_id))
            query.connection.commit()
            query.close()
            return 1  # se update correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar la vacuna en la tabla de compra
    def Table_vacuna():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        vacuna.id,
                        vacuna.codigo,
                        vacuna.nombre,
                        vacuna.tipo_id,
                        tipo_vacuna.tipo_vacuna,
                        vacuna.cantidad,
                        vacuna.precio,
                        vacuna.detalle, 
                        vacuna.foto,
                        vacuna.estado 
                    FROM
                        vacuna
                        INNER JOIN tipo_vacuna ON vacuna.tipo_id = tipo_vacuna.id WHERE vacuna.estado = 1""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer la cantidad de vacunas
    def Traer_cantidad_vacunas(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT 
                        vacuna.cantidad
                        FROM
                        vacuna WHERE vacuna.estado = 1 AND vacuna.id = '{0}'""".format(_id))
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
   
    # modelo para listar en la tabla el calendario de vacunas
    def Tabla_calendario_vacunas():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        calendario.id_cerdo,
                        CONCAT_WS( ' ', 'Codigo: ', cerdo.codigo, '- Raza: ', raza.raza, '- Sexo: ', cerdo.sexo ) AS cerdo,
                        calendario.title,
                        calendario.descripcion,
                        calendario.`start`,
                        calendario.tipo 
                        FROM
                        calendario
                        INNER JOIN cerdo ON calendario.id_cerdo = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                        calendario.estado = 1 
                        AND calendario.tipo = 'Vacuna'""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar en la tabla el calendario de desparasitados
    def Tabla_calendario_desparacitacion():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        calendario.id_cerdo,
                        CONCAT_WS( ' ', 'Codigo: ', cerdo.codigo, '- Raza: ', raza.raza, '- Sexo: ', cerdo.sexo ) AS cerdo,
                        calendario.title,
                        calendario.descripcion,
                        calendario.`start`,
                        calendario.tipo 
                        FROM
                        calendario
                        INNER JOIN cerdo ON calendario.id_cerdo = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                        calendario.estado = 1 
                        AND calendario.tipo = 'Desparasitación'""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registrar la vacunacion del cerdo
    def Registro_vacunacion_cerdo(cerdo_id, fecha, observacion):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO vacunacion (cerdo_id,fecha,observacion) VALUES ("{0}","{1}","{2}")'.format(cerdo_id,fecha,observacion))
            query.connection.commit()
            
            # me devuelve el ultimo id insertado
            id = query.lastrowid
            
            query.execute("DELETE FROM calendario WHERE id_cerdo='{0}' AND tipo='Vacuna' AND estado=1".format(cerdo_id))
            query.connection.commit()
            
            query.close()
            return id
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registra el detalle de la vacunacion
    def Registro_detalle_vacunacion_cerdo(_id, idv, fecha, cantidad, motivo):
        try:
            query = mysql.connection.cursor()         
            query.execute('INSERT INTO detalle_vacunacion (vacunacion_id,vacuna_id,fecha,cantidad,motivo) VALUES ("{0}","{1}","{2}","{3}","{4}")'.format(_id,idv,fecha,cantidad,motivo))
            query.connection.commit()

            query.execute('UPDATE vacuna SET cantidad = cantidad - "{0}" WHERE id = "{1}" '.format(cantidad,idv))
            query.connection.commit()

            query.close()
            return 1  # se inserto correcto

        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra las vacunaciones de los cerdos
    def Listar_vacunaciones_cerdos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        vacunacion.id,
                        cerdo.codigo,
                        cerdo.sexo,
                        raza.raza,
                        vacunacion.fecha,
                        vacunacion.observacion,
                        vacunacion.estado 
                    FROM
                        vacunacion
                        INNER JOIN cerdo ON vacunacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra las vacunaciones de los cerdos por fechas
    def Listar_vacunaciones_cerdos_fecha(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        vacunacion.id,
                        cerdo.codigo,
                        cerdo.sexo,
                        raza.raza,
                        vacunacion.fecha,
                        vacunacion.observacion,
                        vacunacion.estado 
                        FROM
                        vacunacion
                        INNER JOIN cerdo ON vacunacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE vacunacion.fecha BETWEEN '{0}' AND '{1}' """.format(f_i, f_f))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para anular la vacunación del cerdo
    def Anular_vacunacion_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_vacunacion.vacuna_id,
                        detalle_vacunacion.cantidad 
                        FROM
                            detalle_vacunacion 
                        WHERE
                        detalle_vacunacion.vacunacion_id='{0}'""".format(_id))
            data_d = query.fetchall()
            
            for dato in data_d: 
                query.execute('UPDATE vacuna SET cantidad = cantidad + {0} WHERE id = "{1}"'.format(dato[1], str(dato[0])))
                query.connection.commit()

            query.execute('UPDATE vacunacion SET estado = 0 WHERE id = {0}'.format(_id))
            query.connection.commit()

            query.execute('UPDATE detalle_vacunacion SET estado = 0 WHERE vacunacion_id = "{0}"'.format(_id))
            query.connection.commit()
            query.close() 
            return 1
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listra las vacunaciones de los cerdos por fechas
    def Buscar_historia_vacunacion_cerdo(_id, _f_i, _f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        vacunacion.id,
                        CONCAT_WS(' ', cerdo.codigo, cerdo.sexo, raza.raza) AS cerdo,
                        vacunacion.fecha,
                        vacunacion.observacion,
                        vacunacion.estado 
                        FROM
                        vacunacion
                        INNER JOIN cerdo ON vacunacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE vacunacion.fecha BETWEEN '{0}' AND '{1}' 
                        AND vacunacion.cerdo_id='{2}' 
                        AND vacunacion.estado=1 
                        ORDER BY vacunacion.id DESC""".format(_f_i, _f_f, _id))
            data = query.fetchall()
            if not data:
                query.close()
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    dic["id"] = datos[0]
                    dic["cerdo"] = datos[1]
                    Convert = datetime.strptime(str(datos[2]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["observacion"] = datos[3]
                    dic["estado"] = datos[4] 
                    new_lista.append(dic)
                query.close()
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra el detalle de vacunas del cerdo
    def Ver_detalle_vacunas_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_vacunacion.fecha,
                        CONCAT_WS( ' ', vacuna.nombre, ' - ', tipo_vacuna.tipo_vacuna ) AS vacuna,
                        detalle_vacunacion.cantidad,
                        detalle_vacunacion.motivo
                        FROM
                        detalle_vacunacion
                        INNER JOIN vacuna ON detalle_vacunacion.vacuna_id = vacuna.id
                        INNER JOIN tipo_vacuna ON vacuna.tipo_id = tipo_vacuna.id 
                        WHERE
                        detalle_vacunacion.vacunacion_id='{0}'""".format(_id))
            data = query.fetchall()
            if not data:
                query.close()
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    Convert = datetime.strptime(str(datos[0]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["vacuna"] = datos[1]
                    dic["cantidad"] = datos[2]
                    dic["motivo"] = datos[3] 
                    new_lista.append(dic)
                query.close()
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer la cantidad de medicamento 
    def Traer_cantidad_medicamento(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT 
                        medicamento.cantidad
                        FROM
                        medicamento WHERE medicamento.estado = 1 AND medicamento.id = '{0}'""".format(_id))
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
   
    # modelo para registrar la desparasitacion del cerdo
    def Registro_desparasitacion_cerdo(cerdo_id, fecha, observacion):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO desparasitacion (cerdo_id,fecha,observacion) VALUES ("{0}","{1}","{2}")'.format(cerdo_id,fecha,observacion))
            query.connection.commit()
            
            # me devuelve el ultimo id insertado
            id = query.lastrowid
            
            query.execute("DELETE FROM calendario WHERE id_cerdo='{0}' AND tipo='Desparasitación' AND estado=1".format(cerdo_id))
            query.connection.commit()
            
            query.close()
            return id
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para registra el detalle de la desparasitacion
    def Registro_detalle_desparasitacion_cerdo(_id, idv, fecha, cantidad, motivo):
        try:
            query = mysql.connection.cursor()         
            query.execute('INSERT INTO detalle_desparasitacion (desparasitacion_id,medicina_id,fecha,cantidad,motivo) VALUES ("{0}","{1}","{2}","{3}","{4}")'.format(_id,idv,fecha,cantidad,motivo))
            query.connection.commit()

            query.execute('UPDATE medicamento SET cantidad = cantidad - "{0}" WHERE id = "{1}" '.format(cantidad,idv))
            query.connection.commit()

            query.close()
            return 1  # se inserto correcto

        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra las desparasitacion de los cerdos
    def Listar_desparasitacion_cerdos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        desparasitacion.id,
                        cerdo.codigo,
                        cerdo.sexo,
                        raza.raza,
                        desparasitacion.fecha,
                        desparasitacion.observacion,
                        desparasitacion.estado 
                    FROM
                        desparasitacion
                        INNER JOIN cerdo ON desparasitacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra las desparasitacion de los cerdos por fechas
    def Listar_desparasitacion_cerdos_fecha(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        desparasitacion.id,
                        cerdo.codigo,
                        cerdo.sexo,
                        raza.raza,
                        desparasitacion.fecha,
                        desparasitacion.observacion,
                        desparasitacion.estado 
                        FROM
                        desparasitacion
                        INNER JOIN cerdo ON desparasitacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE desparasitacion.fecha BETWEEN '{0}' AND '{1}' """.format(f_i, f_f))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para anular la desparasitacion del cerdo
    def Anular_desparasitacion_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_desparasitacion.medicina_id,
                        detalle_desparasitacion.cantidad 
                        FROM
                            detalle_desparasitacion 
                        WHERE
                        detalle_desparasitacion.desparasitacion_id='{0}'""".format(_id))
            data_d = query.fetchall()
            
            for dato in data_d: 
                query.execute('UPDATE medicamento SET cantidad = cantidad + {0} WHERE id = "{1}"'.format(dato[1], str(dato[0])))
                query.connection.commit()

            query.execute('UPDATE desparasitacion SET estado = 0 WHERE id = {0}'.format(_id))
            query.connection.commit()

            query.execute('UPDATE detalle_desparasitacion SET estado = 0 WHERE desparasitacion_id = "{0}"'.format(_id))
            query.connection.commit()
            query.close() 
            return 1
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listra las desparasitacion de los cerdos por fechas
    def buscar_historia_desparasitacion_cerdo(_id, _f_i, _f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        desparasitacion.id,
                        CONCAT_WS( ' ', cerdo.codigo, cerdo.sexo, raza.raza ) AS cerdo,
                        desparasitacion.fecha,
                        desparasitacion.observacion,
                        desparasitacion.estado 
                    FROM
                        desparasitacion
                        INNER JOIN cerdo ON desparasitacion.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                    WHERE
                        desparasitacion.fecha BETWEEN '{0}' 
                        AND '{1}' 
                        AND desparasitacion.cerdo_id = '{2}' 
                        AND desparasitacion.estado = 1 
                    ORDER BY
                        desparasitacion.id DESC""".format(_f_i, _f_f, _id))
            data = query.fetchall()
            if not data:
                query.close()
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    dic["id"] = datos[0]
                    dic["cerdo"] = datos[1]
                    Convert = datetime.strptime(str(datos[2]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["observacion"] = datos[3]
                    dic["estado"] = datos[4] 
                    new_lista.append(dic)
                query.close()
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listra el detalle de desparasitantes del cerdo
    def Ver_detalle_desparsitantes_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_desparasitacion.fecha,
                        CONCAT_WS( ' ', medicamento.nombre, ' - ', tipo_medicamento.tipo ) AS medicina,
                        detalle_desparasitacion.cantidad,
                        detalle_desparasitacion.motivo 
                    FROM
                        detalle_desparasitacion
                        INNER JOIN medicamento ON detalle_desparasitacion.medicina_id = medicamento.id
                        INNER JOIN tipo_medicamento ON medicamento.tipo_id = tipo_medicamento.id 
                    WHERE
                        detalle_desparasitacion.desparasitacion_id='{0}'""".format(_id))
            data = query.fetchall()
            if not data:
                query.close()
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    Convert = datetime.strptime(str(datos[0]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["desparasitante"] = datos[1]
                    dic["cantidad"] = datos[2]
                    dic["motivo"] = datos[3] 
                    new_lista.append(dic)
                query.close()
                return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    