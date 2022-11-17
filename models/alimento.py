from utils.db import mysql
from datetime import datetime

class Alimento():
    # modelo de listar tipo de alimento
    def Listar_tipio_alimento():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimento')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {} 
                dic["id"] = datos[0]
                dic["tipo_alimento"] = datos[1]
                dic["estado"] = datos[2]          
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para crear el tipo de alimento
    def Registrar_tipo_alimento(_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimento WHERE binary tipo_alimento = "{0}"'. format(_valor))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO tipo_alimento (tipo_alimento) VALUES ("{0}")'.format(_valor))
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
    
    # modelo para estado del tipo alimentos
    def Estado_alimento(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE tipo_alimento SET estado = "{0}" WHERE id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el tipo de alimento
    def Editar_tipo_alimento(_id,_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimento WHERE binary tipo_alimento = "{0}" AND id != "{1}"'. format(_valor,_id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE tipo_alimento SET tipo_alimento="{0}" WHERE id="{1}"'.format(_valor,_id))
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
    
    # modelo de listar tipo de alimento
    def Listar_marca_alimento():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM marca_alimento')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {} 
                dic["id"] = datos[0]
                dic["marca_alimento"] = datos[1]
                dic["estado"] = datos[2]          
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
   
    # modelo para crear la marca de alimento
    def Registrar_marca_alimento(_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM marca_alimento WHERE binary marca_alimento = "{0}"'. format(_valor))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO marca_alimento (marca_alimento) VALUES ("{0}")'.format(_valor))
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
    
    # modelo para estado de la marcaa alimentos
    def Estado_marca(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE marca_alimento SET estado = "{0}" WHERE id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar marca de alimento
    def Editar_marca_alimento(_id,_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM marca_alimento WHERE binary marca_alimento = "{0}" AND id != "{1}"'. format(_valor,_id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE marca_alimento SET marca_alimento="{0}" WHERE id="{1}"'.format(_valor,_id))
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
    
    #### para el seletc del tipo alimento 
    def Traer_tipo_alimento_select():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimento WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    #### para el seletc de la marca alimento 
    def Traer_marca_alimento_select():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM marca_alimento WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    # modelo para crear el alimento
    def Craer_alimento(_codigo, _nombre, _tipo, _marca, _cantidad, _precio, _peso, _detalle, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM alimento WHERE codigo = "{0}"'. format(_codigo))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO alimento (codigo, nombre, tipo_id, marca_id, cantidad, precio, peso, detalle, foto) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}")'.format(_codigo,_nombre,_tipo,_marca,_cantidad,_precio,_peso,_detalle,archivo))
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
    
    # modelo de listar el alimento
    def Listar_alimentos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            alimento.id,
                            alimento.codigo,
                            alimento.nombre,
                            alimento.tipo_id,
                            alimento.marca_id,
                            alimento.cantidad,
                            alimento.precio,
                            alimento.peso,
                            alimento.detalle,
                            alimento.foto,
                            alimento.estado,
                            marca_alimento.marca_alimento,
                            tipo_alimento.tipo_alimento 
                        FROM
                            alimento
                            INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                            INNER JOIN marca_alimento ON alimento.marca_id = marca_alimento.id 
                        ORDER BY
                            alimento.id DESC""")
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {} 
                dic["id"] = datos[0]
                dic["codigo"] = datos[1]
                dic["nombre"] = datos[2]  
                dic["tipo_id"] = datos[3]
                dic["marca_id"] = datos[4]
                dic["cantidad"] = datos[5]  
                dic["precio"] = datos[6]
                dic["peso"] = datos[7]
                dic["detalle"] = datos[8]  
                dic["foto"] = datos[9]
                dic["estado"] = datos[10]
                dic["marca_alimento"] = datos[11]
                dic["tipo_alimento"] = datos[12]          
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
   
    # modelo para estado de alimento
    def Estado_alimento(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE alimento SET estado = "{0}" WHERE id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para cambiar la foto del alimento
    def Cambiar_foto_alimento(_id, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE alimento SET foto = "{0}" WHERE id = {1}'.format(archivo, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el alimento
    def Editar_alimento(_codigo, _nombre, _tipo, _marca, _cantidad, _precio, _peso, _detalle, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM alimento WHERE codigo = "{0}" AND id != "{1}"'. format(_codigo, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE alimento SET codigo="{0}", nombre="{1}", tipo_id="{2}", marca_id="{3}", cantidad="{4}", precio="{5}", peso="{6}", detalle="{7}" WHERE id="{8}"'.format(_codigo,_nombre,_tipo,_marca,_cantidad,_precio,_peso,_detalle,_id))
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
    
    # modelo de listar tipo de alimentacion
    def Listar_tipio_alimentacion():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimentcion')
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

    # modelo para crear el tipo de alimentacion
    def Registrar_tipo_alimentacion(_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimentcion WHERE binary tipo = "{0}"'. format(_valor))
            data = query.fetchone()
            if not data:
                query.execute('INSERT INTO tipo_alimentcion (tipo) VALUES ("{0}")'.format(_valor))
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
    
    # modelo para estado del tipo alimentacion
    def Estado_alimentacion(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE tipo_alimentcion SET estado = "{0}" WHERE id = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar del tipo alimentacion
    def Editar_tipo_alimentacion(_id,_valor):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE tipo_alimentcion SET tipo = "{0}" WHERE id = {1}'.format(_valor, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para el select del alimento del cerdo
    def Select_alimento_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            alimento.id,
                            alimento.codigo,
                            alimento.nombre,
                            alimento.tipo_id,
                            alimento.marca_id,
                            alimento.cantidad,
                            alimento.precio,
                            alimento.peso,
                            alimento.detalle,
                            alimento.foto,
                            alimento.estado,
                            marca_alimento.marca_alimento,
                            tipo_alimento.tipo_alimento 
                        FROM
                            alimento
                            INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                            INNER JOIN marca_alimento ON alimento.marca_id = marca_alimento.id WHERE alimento.estado = 1 AND alimento.tipo_id = "{0}"
                        ORDER BY
                            alimento.id DESC""".format(_id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
   
    # modelo para traer la cantidad de sacos de alimento
    def Traer_cantida_saco_alimento(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            alimento.cantidad  
                            FROM
                            alimento
                            WHERE alimento.id = '{0}'""".format(_id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo de listar tipo de alimentacion
    def Traer_tipo_alimentacion_select():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM tipo_alimentcion WHERE estado = 1')
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para el select de galpon cerdo
    def Select_cerdo_galpon(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            cerdo.codigo,
                            cerdo.sexo,
                            raza.raza,
                            cerdo.peso,
                            galpon_cerdo.id_galpon,
                            galpon_cerdo.id_cerdo 
                            FROM
                            galpon_cerdo
                            INNER JOIN cerdo ON galpon_cerdo.id_cerdo = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                            WHERE galpon_cerdo.id_galpon = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para peso del cerdo
    def Traer_peso_cerdo_actual(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT 
                            cerdo.peso
                            FROM cerdo  
                            WHERE cerdo.id_cerdo = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    # controlador para guadar la alimentacion
    def Guardar_la_alimentacion(_alimento_id, _tipo_id, _fecha_c, _cantidad_sacos, _observacion, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO alimentacion (alimento_id,tipo_id,fecha,cantidad,observacion,usuario_id) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}")'.format(_alimento_id,_tipo_id,_fecha_c,_cantidad_sacos,_observacion,_id))
            query.connection.commit()

            # me devuelve el ultimo id insertado
            id = query.lastrowid

            query.execute('UPDATE alimento SET cantidad=cantidad-"{0}" WHERE id="{1}" '.format(_cantidad_sacos,_alimento_id))
            query.connection.commit()

            query.close()
            return id  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # controlador para registra el detalle de alimentacion del cerdo
    def Guardar_detalle_alimentacion(_id, ida, peso):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO detalle_alimentacion (id_alimentacion,id_cerdo,peso) VALUES ("{0}","{1}","{2}")'.format(_id,ida,peso))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para listar la alimentación
    def Listar_alimentacion():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        alimentacion.id,
                        CONCAT_WS( " ", alimento.codigo, " - ", alimento.nombre, " - ", tipo_alimento.tipo_alimento ) AS alimento,
                        CONCAT_WS( " ", usuario.nombres, usuario.apellidos ) AS usuario,
                        alimentacion.fecha,
                        alimentacion.cantidad,
                        alimentacion.observacion,
                        alimentacion.estado 
                        FROM
                        alimentacion
                        INNER JOIN alimento ON alimentacion.alimento_id = alimento.id
                        INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                        INNER JOIN usuario ON alimentacion.usuario_id = usuario.usuario_id ORDER BY alimentacion.id DESC""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listar la alimentación por fechas
    def Listar_alimentacion_fecha(f_i,f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        alimentacion.id,
                        CONCAT_WS( " ", alimento.codigo, " - ", alimento.nombre, " - ", tipo_alimento.tipo_alimento ) AS alimento,
                        CONCAT_WS( " ", usuario.nombres, usuario.apellidos ) AS usuario,
                        alimentacion.fecha,
                        alimentacion.cantidad,
                        alimentacion.observacion,
                        alimentacion.estado 
                        FROM
                        alimentacion
                        INNER JOIN alimento ON alimentacion.alimento_id = alimento.id
                        INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                        INNER JOIN usuario ON alimentacion.usuario_id = usuario.usuario_id
                        WHERE alimentacion.fecha BETWEEN '{0}' AND '{1}'
                        ORDER BY alimentacion.id DESC""".format(f_i,f_f))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para registra el peso del cerdo
    def Guardar_peso_cerdo(_id,_fecha_c,_metodo,_estado,_observacion,_p_a,_p_b,_p_t,_l_c,_p_v):
        try:
            if _metodo == 'exacto':
                new_peso = _p_b
            else:
                new_peso = _p_v

            query = mysql.connection.cursor()
            query.execute('INSERT INTO peso_cerdo (cerdo_id,fecha,metodo,estado,observacion,peso_a,peso_b,p_t,l_c,p_v) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}")'.format(_id,_fecha_c,_metodo,_estado,_observacion,_p_a,_p_b,_p_t,_l_c,_p_v))
            query.connection.commit()
        
            query.execute('UPDATE cerdo SET peso="{0}" WHERE id_cerdo="{1}"'.format(new_peso,_id))
            query.connection.commit()

            query.close()
            return 1  # se inserto correcto        
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listar el pesaje del cerdo
    def Listar_pesaje_cerdo():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            peso_cerdo.peso_id,
                            CONCAT_WS( ' ', cerdo.codigo, cerdo.sexo, raza.raza ) AS cerdo,
                            peso_cerdo.fecha,
                            peso_cerdo.metodo,
                            peso_cerdo.estado,
                            peso_cerdo.observacion,
                            peso_cerdo.peso_a,
                            peso_cerdo.peso_b,
                            peso_cerdo.p_t,
                            peso_cerdo.l_c,
                            peso_cerdo.p_v,
                            peso_cerdo.estado_ 
                        FROM
                            peso_cerdo
                            INNER JOIN cerdo ON peso_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        ORDER BY
                            peso_cerdo.peso_id DESC""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

   # modelo para listar el pesaje del cerdo por fecha
    def Listar_pesaje_cerdo_fecha(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            peso_cerdo.peso_id,
                            CONCAT_WS( ' ', cerdo.codigo, cerdo.sexo, raza.raza ) AS cerdo,
                            peso_cerdo.fecha,
                            peso_cerdo.metodo,
                            peso_cerdo.estado,
                            peso_cerdo.observacion,
                            peso_cerdo.peso_a,
                            peso_cerdo.peso_b,
                            peso_cerdo.p_t,
                            peso_cerdo.l_c,
                            peso_cerdo.p_v,
                            peso_cerdo.estado_ 
                        FROM
                            peso_cerdo
                            INNER JOIN cerdo ON peso_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                            WHERE peso_cerdo.fecha BETWEEN '{0}' AND '{1}'
                        ORDER BY
                            peso_cerdo.peso_id DESC""".format(f_i,f_f))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para traer los datos del pessaje del cerdo
    def Traer_pesos_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            peso_cerdo.peso_id,
                            peso_cerdo.fecha,
                            peso_cerdo.metodo,
                            peso_cerdo.estado,
                            peso_cerdo.observacion,
                            peso_cerdo.peso_a,
                            peso_cerdo.peso_b,
                            peso_cerdo.p_t,
                            peso_cerdo.l_c,
                            peso_cerdo.p_v,
                            peso_cerdo.estado_ 
                        FROM
                            peso_cerdo
                            INNER JOIN cerdo ON peso_cerdo.cerdo_id = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza WHERE peso_cerdo.cerdo_id = "{0}"
                        ORDER BY
                            peso_cerdo.peso_id DESC""".format(_id))
            data = query.fetchall()
            query.close() 
            if not data:
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    Convert = datetime.strptime(str(datos[1]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["metodo"] = datos[2]
                    dic["estado_cerdo"] = datos[3] 
                    dic["observacion"] = datos[4]
                    dic["peso_a"] = datos[5]
                    dic["peso_b"] = datos[6]
                    dic["p_t"] = datos[7]              
                    dic["l_c"] = datos[8]
                    dic["p_v"] = datos[9]              
                    new_lista.append(dic)
                return {"data": new_lista} 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para traer los datos de la alimentacion del cerdo
    def traer_alimentos_del_cerdo(_id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            detalle_alimentacion.id_cerdo,
                            tipo_alimentcion.tipo,
                            alimentacion.fecha,
                            CONCAT_WS( ' ', 'Alimento: ', alimento.nombre, ' - Tipo: ', tipo_alimento.tipo_alimento, ' - Marca: ', marca_alimento.marca_alimento ) AS alimento,
                            alimentacion.observacion,
                            alimentacion.id 
                            FROM
                                detalle_alimentacion
                                INNER JOIN alimentacion ON detalle_alimentacion.id_alimentacion = alimentacion.id
                                INNER JOIN tipo_alimentcion ON alimentacion.tipo_id = tipo_alimentcion.id
                                INNER JOIN alimento ON alimentacion.alimento_id = alimento.id
                                INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                                INNER JOIN marca_alimento ON alimento.marca_id = marca_alimento.id 
                            WHERE
                                detalle_alimentacion.id_cerdo = '{0}' 
                            ORDER BY
                            alimentacion.id DESC""".format(_id))
            data = query.fetchall()
            query.close() 
            if not data:
                return 0
            else:
                new_lista = []
                for datos in data:
                    dic = {}
                    Convert = datetime.strptime(str(datos[2]), '%Y-%m-%d')
                    dic["fecha"] = Convert.strftime('%Y-%m-%d')
                    dic["tipo_alimentcion"] = datos[1]
                    dic["alimento"] = datos[3] 
                    dic["observacion"] = datos[4]            
                    new_lista.append(dic)
                return {"data": new_lista} 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
     # modelo para eliminar peso
    def Eliminar_peso(_id):
        try:
            query = mysql.connection.cursor()
            query.execute('DELETE FROM peso_cerdo WHERE peso_id = {0}'.format(_id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    