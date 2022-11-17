from utils.db import mysql
from datetime import datetime

class Cerdo():
    # modelo para crear una nueva raza
    def Crear_raza(_raza):
        try:
            query = mysql.connection.cursor()
            query.execute(
                'SELECT * FROM raza WHERE binary raza = "{0}"'. format(_raza))
            data = query.fetchone()
            if not data:
                query.execute(
                    'INSERT INTO raza (raza) VALUES ("{0}")'.format(_raza))
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
    
    # modelo de listar la raza
    def Listar_cerdo():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM raza')
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id_raza"] = datos[0]
                dic["raza"] = datos[1]
                dic["estado"] = datos[2]
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado de la raza
    def Estado_raza(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE raza SET estado = "{0}" WHERE id_raza = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para editar el rol
    def Editar_cerdo(_raza, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM raza WHERE binary raza = "{0}" AND id_raza != "{1}"'. format(_raza, _id))
            data = query.fetchone()
            if not data:
                query.execute('UPDATE raza SET raza = "{0}" WHERE id_raza = "{1}"'.format(_raza, _id))
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

    # modelo de listar la raza combo
    def Traer_razas_combo():
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM raza WHERE estado = 1')
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para registra el cerdo
    def Crear_cerdo(_codigo_cerdo, _nombre, _sexo_cerdo, _raza_id, _peso, _origen, _fecha, _detalle_c, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM cerdo WHERE codigo = "{0}"'. format(_codigo_cerdo))
            data_c = query.fetchone()
            if not data_c:
                query.execute('SELECT * FROM cerdo WHERE nombre = "{0}"'. format(_nombre))
                data_n = query.fetchone()
                if not data_n:
                    query.execute('INSERT INTO cerdo (codigo,nombre,sexo,raza,peso,origen,fecha,detalle,foto) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}")'.format(_codigo_cerdo,_nombre,_sexo_cerdo,_raza_id,_peso,_origen,_fecha,_detalle_c,archivo))
                    query.connection.commit()
                    query.close()
                    return 1  # se inserto correcto
                else:
                    query.close()
                    return 3          
            else:
                query.close()
                return 2
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo de listado cerdo
    def Listado_cerdos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
            cerdo.id_cerdo, cerdo.codigo, cerdo.nombre, cerdo.sexo, raza.raza, cerdo.raza,
            cerdo.peso, cerdo.origen, cerdo.fecha, cerdo.detalle,
            cerdo.foto, cerdo.estado 
            FROM cerdo INNER JOIN raza ON cerdo.raza = raza.id_raza""")
            data = query.fetchall()
            query.close()
            new_lista = []
            for datos in data:
                dic = {}
                dic["id"] = datos[0]
                dic["codigo"] = datos[1]
                dic["nombre"] = datos[2]
                dic["sexo"] = datos[3]
                dic["raza"] = datos[4]
                dic["raza_id"] = datos[5]
                dic["peso"] = datos[6]
                dic["origen"] = datos[7]
                Convert = datetime.strptime(str(datos[8]), '%Y-%m-%d')
                dic["fecha"] = Convert.strftime('%Y-%m-%d')
                dic["detalle"] = datos[9]
                dic["foto"] = datos[10]
                dic["estado"] = datos[11]                
                new_lista.append(dic)
            return {"data": new_lista}
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para estado del cerdo
    def Estado_cerdo(_id, _dato):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE cerdo SET estado = "{0}" WHERE id_cerdo = {1}'.format(_dato, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar foto del cerdo
    def Cambiar_foto_cerdo(_id, archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE cerdo SET foto = "{0}" WHERE id_cerdo = {1}'.format(archivo, _id))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para editar el cerdo
    def Editar_cerdo_chancho(_codigo_cerdo, _nombre, _sexo_cerdo, _raza_id, _peso, _origen, _fecha, _detalle_c, _id):
        try:
            query = mysql.connection.cursor()
            query.execute('SELECT * FROM cerdo WHERE codigo = "{0}" AND id_cerdo != "{1}"'. format(_codigo_cerdo,_id))
            data_c = query.fetchone()
            if not data_c:
                query.execute('SELECT * FROM cerdo WHERE nombre = "{0}" AND id_cerdo != "{1}"'. format(_nombre,_id))
                data_n = query.fetchone()
                if not data_n:
                    query.execute('UPDATE cerdo SET codigo="{0}",nombre="{1}",sexo="{2}",raza="{3}",peso="{4}",origen="{5}",fecha="{6}",detalle="{7}" WHERE id_cerdo="{8}"'.format(_codigo_cerdo,_nombre,_sexo_cerdo,_raza_id,_peso,_origen,_fecha,_detalle_c,_id))
                    query.connection.commit()
                    query.close()
                    return 1  # se inserto correcto
                else:
                    query.close()
                    return 3          
            else:
                query.close()
                return 2
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para crear una nueva raza
    def Registrar_muerte_cerdo(_cerdo, _fecha, _detalle):
        try:
            query = mysql.connection.cursor()
            query.execute('INSERT INTO muertes (id_cerdo,fecha,detalle) VALUES ("{0}","{1}","{2}")'.format(_cerdo,_fecha,_detalle))
            query.connection.commit()

            query.execute('UPDATE cerdo SET estado = 2 WHERE id_cerdo = {0}'.format(_cerdo))
            query.connection.commit()

            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para  listar a los cerdos muertos
    def Cerdos_muertos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        muertes.id,
                        muertes.id_cerdo,
                        cerdo.codigo,
                        cerdo.sexo,
                        raza.raza,
                        cerdo.peso,
                        muertes.fecha,
                        muertes.detalle,
                        muertes.estado 
                    FROM
                        cerdo
                        INNER JOIN muertes ON cerdo.id_cerdo = muertes.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza""")
            data = query.fetchall()
            query.close()
            return data 
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo para eliminar  el cerdo muerto
    def Eliminar_cerdo_muerto(_id):
        try:
            query = mysql.connection.cursor()

            query.execute("""UPDATE muertes
                            INNER JOIN cerdo ON muertes.id_cerdo = cerdo.id_cerdo 
                            SET cerdo.estado = 1 
                            WHERE
                            muertes.id = {0}""".format(_id))
            query.connection.commit()

            query.execute('DELETE FROM muertes WHERE id = {0}'.format(_id))
            query.connection.commit()

            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
