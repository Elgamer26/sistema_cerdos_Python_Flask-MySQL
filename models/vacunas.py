from turtle import title
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
    