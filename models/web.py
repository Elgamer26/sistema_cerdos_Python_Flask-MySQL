from utils.db import mysql

class Web():
    # modelo de traer los datos de la web
    def Traer_datos_web():
        try:
            query = mysql.connection.cursor()
            query.execute(' SELECT * FROM web WHERE id = 1 ')
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo de traer las razas de los cerdos
    def Traer_datos_razas_cerdo():
        try:
            query = mysql.connection.cursor()
            query.execute(' SELECT * FROM raza WHERE estado = 1')
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modelo de traer los datos de los cerdos
    def Traer_datos_cerdos():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        cerdo.id_cerdo,
                        cerdo.codigo,
                        cerdo.nombre,
                        cerdo.sexo,
                        raza.raza,
                        cerdo.peso,
                        cerdo.foto,
                        cerdo.estado,
                        cerdo.galpon 
                        FROM
                            cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE
                        cerdo.galpon = 'si' 
                        AND cerdo.estado = 1""")
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para csubir la foto de la web 1
    def Subir_foto_1(archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE web SET foto1 = "{0}" WHERE id = 1'.format(archivo))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para csubir la foto de la web 2
    def Subir_foto_2(archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE web SET foto2 = "{0}" WHERE id = 1'.format(archivo))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modedelo para csubir la foto de la web 3
    def Subir_foto_3(archivo):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE web SET foto3 = "{0}" WHERE id = 1'.format(archivo))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    # modedelo para editar el detalle de la web
    def Detalle_de_web(_detalle1, _detalle2, _detalle3):
        try:
            query = mysql.connection.cursor()
            query.execute('UPDATE web SET detalle1 = "{0}", detalle2 = "{1}", detalle3 = "{2}" WHERE id = 1'.format(_detalle1, _detalle2, _detalle3))
            query.connection.commit()
            query.close()
            return 1  # se inserto correcto
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    