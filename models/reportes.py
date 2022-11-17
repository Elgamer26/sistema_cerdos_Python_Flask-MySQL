from utils.db import mysql 

class Reportes():
     #modelo para traer los datos de la empresa
    def Traer_empresa():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            empresa.nombre, 
                            empresa.telefono, 
                            empresa.correo, 
                            empresa.direccion,
                            empresa.foto
                        FROM
                            empresa""")
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    #modelo para traer el galpon de los cerdo
    def Listar_galpon(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            galpon.id_galpon,
                            galpon.numero, 
                            galpon.capacidad, 
                            COUNT(galpon_cerdo.id_cerdo) as cerdo,
                            tipo_galpon.tipo_galpon 
                            FROM
                            galpon
                            INNER JOIN galpon_cerdo ON galpon.id_galpon = galpon_cerdo.id_galpon
                            INNER JOIN tipo_galpon ON galpon.id_tipo = tipo_galpon.id_tipo  WHERE galpon.id_galpon = "{0}"
                            GROUP BY
                            galpon_cerdo.id_galpon""". format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
      
    #modelo para traer los cerdos del galpon
    def Cerdo_galpon(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            DATE(galpon_cerdo.fecha) as fecha,
                            cerdo.codigo,
                            cerdo.sexo,
                            raza.raza, 
                            cerdo.peso
                        FROM
                            galpon_cerdo
                            INNER JOIN cerdo ON galpon_cerdo.id_cerdo = cerdo.id_cerdo
                            INNER JOIN raza ON cerdo.raza = raza.id_raza WHERE galpon_cerdo.id_galpon = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    ######################### COMPRAS ALIMENTOS

    #modelo para listar la compra del alimento
    def Listar_compra_alimento(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            compra_alimento.id,
                            CONCAT_WS( ' ', usuario.nombres, usuario.apellidos ) AS usuario,
                            CONCAT_WS( ' ', proveedor.razon) AS proveedor,
                            proveedor.ruc,
                            compra_alimento.fecha,
                            compra_alimento.numero_compra,
                            compra_alimento.documento,
                            compra_alimento.iva,
                            compra_alimento.subtotal,
                            compra_alimento.impuesto,
                            compra_alimento.total,
                            compra_alimento.estado 
                        FROM
                            compra_alimento
                            INNER JOIN usuario ON compra_alimento.usuario_id = usuario.usuario_id
                            INNER JOIN proveedor ON compra_alimento.proveedor_id = proveedor.id WHERE compra_alimento.id='{0}'""". format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
      
    #modelo para traer el detalle de la compra
    def Detalle_compra_alimento(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            detalle_compra_alimento.compra_alimento_id,
                            alimento.codigo,
                            alimento.nombre,
                            detalle_compra_alimento.precio,
                            detalle_compra_alimento.cantidad,
                            detalle_compra_alimento.descuento,
                            detalle_compra_alimento.total,
                            detalle_compra_alimento.estado 
                        FROM
                            detalle_compra_alimento
                            INNER JOIN alimento ON detalle_compra_alimento.alimento_id = alimento.id 
                        WHERE
                            detalle_compra_alimento.compra_alimento_id = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    ######################### ALIMENTACION

    # modelo para listar la alimentación
    def Listar_alimentacion(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        alimentacion.id,
                        CONCAT_WS( " ", alimento.nombre, " - ", tipo_alimento.tipo_alimento ) AS alimento,
                        CONCAT_WS( " ", usuario.nombres ) AS usuario,
                        alimentacion.fecha,
                        alimentacion.cantidad,
                        alimentacion.observacion,
                        alimentacion.estado 
                        FROM
                        alimentacion
                        INNER JOIN alimento ON alimentacion.alimento_id = alimento.id
                        INNER JOIN tipo_alimento ON alimento.tipo_id = tipo_alimento.id
                        INNER JOIN usuario ON alimentacion.usuario_id = usuario.usuario_id WHERE alimentacion.id='{0}'""".format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listar los cerdos alimentados
    def Cerdos_alimentados(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        CONCAT_WS( " ", cerdo.codigo, " - ", cerdo.nombre, " - ", raza.raza ) AS cerdo,
                        detalle_alimentacion.peso 
                       FROM
                        detalle_alimentacion
                        INNER JOIN cerdo ON detalle_alimentacion.id_cerdo = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                        WHERE detalle_alimentacion.id_alimentacion = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### COMPRAS INSUMOS

    #modelo para listar la compra del insumo
    def Listar_compra_insumos(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            compra_insumo.id,
                            CONCAT_WS( ' ', usuario.nombres, usuario.apellidos ) AS usuario,
                            CONCAT_WS( ' ', proveedor.razon) AS proveedor,
                            proveedor.ruc,
                            compra_insumo.fecha,
                            compra_insumo.numero_compra,
                            compra_insumo.documento,
                            compra_insumo.iva,
                            compra_insumo.subtotal,
                            compra_insumo.impuesto,
                            compra_insumo.total,
                            compra_insumo.estado 
                        FROM
                            compra_insumo
                            INNER JOIN usuario ON compra_insumo.usuario_id = usuario.usuario_id
                            INNER JOIN proveedor ON compra_insumo.proveedor_id = proveedor.id WHERE compra_insumo.id='{0}'""". format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
      
    #modelo para traer el detalle de la compra
    def Detalle_compra_insumos(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            detalle_compra_insumo.compra_insumo_id,
                            insumo.codigo,
                            insumo.nombre,
                            detalle_compra_insumo.precio,
                            detalle_compra_insumo.cantidad,
                            detalle_compra_insumo.descuento,
                            detalle_compra_insumo.total,
                            detalle_compra_insumo.estado 
                        FROM
                            detalle_compra_insumo
                            INNER JOIN insumo ON detalle_compra_insumo.insumo_id = insumo.id 
                        WHERE
                            detalle_compra_insumo.compra_insumo_id = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
    
    ######################### COMPRAS MEDICINAS

    #modelo para listar la compra del medicamento
    def Listar_compra_medicinas(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            compra_medicamento.id,
                            CONCAT_WS( ' ', usuario.nombres, usuario.apellidos ) AS usuario,
                            CONCAT_WS( ' ', proveedor.razon) AS proveedor,
                            proveedor.ruc,
                            compra_medicamento.fecha,
                            compra_medicamento.numero_compra,
                            compra_medicamento.documento,
                            compra_medicamento.iva,
                            compra_medicamento.subtotal,
                            compra_medicamento.impuesto,
                            compra_medicamento.total,
                            compra_medicamento.estado 
                        FROM
                            compra_medicamento
                            INNER JOIN usuario ON compra_medicamento.usuario_id = usuario.usuario_id
                            INNER JOIN proveedor ON compra_medicamento.proveedor_id = proveedor.id WHERE compra_medicamento.id='{0}'""". format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
      
    #modelo para traer el detalle de la compra
    def Detalle_compra_medicamneto(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                            detalle_compra_medicamento.compra_medicamento_id,
                            medicamento.codigo,
                            medicamento.nombre,
                            detalle_compra_medicamento.precio,
                            detalle_compra_medicamento.cantidad,
                            detalle_compra_medicamento.descuento,
                            detalle_compra_medicamento.total,
                            detalle_compra_medicamento.estado 
                        FROM
                            detalle_compra_medicamento
                            INNER JOIN medicamento ON detalle_compra_medicamento.medicamento_id = medicamento.id 
                        WHERE
                            detalle_compra_medicamento.compra_medicamento_id = '{0}'""".format(id))
            data = query.fetchall()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
 
    ######################### TRATAMIENDOS HISTORIA

    # modelo para listado de trataiendos de los cerdos
    def tratamiendo_cerdo(id):
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
                        enfermedad_cerdo.fecha,
                        enfermedad_cerdo.sintomas,
                        enfermedad_cerdo.diagnostico 
                    FROM
                        tratamiento_cerdos
                        INNER JOIN enfermedad_cerdo ON tratamiento_cerdos.enfer_cerdo_id = enfermedad_cerdo.id
                        INNER JOIN veterinario ON enfermedad_cerdo.veterinario_id = veterinario.id
                        INNER JOIN cerdo ON enfermedad_cerdo.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza 
                    WHERE
                        tratamiento_cerdos.id = '{0}'""".format(id))
            data = query.fetchone()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    def Detalle_enfermedad(idd):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        detalle_enfermedad_cerdo.cerdo_enfermedad_id,
                        enfermedad.nombre 
                        FROM
                            detalle_enfermedad_cerdo
                            INNER JOIN enfermedad ON detalle_enfermedad_cerdo.enfermedad_id = enfermedad.id 
                        WHERE
                            detalle_enfermedad_cerdo.cerdo_enfermedad_id = '{0}'""".format(idd))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME COMPA ALIMENTOS POR FECHAS

    # modelo para listado las compras de alimentos por fecha
    def Informe_compras_alimento(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                    compra_alimento.fecha,
                    compra_alimento.numero_compra,
                    compra_alimento.iva,
                    compra_alimento.subtotal,
                    compra_alimento.impuesto,
                    compra_alimento.total 
                FROM
                    compra_alimento 
                WHERE
                    compra_alimento.estado = 1 AND DATE(compra_alimento.fecha) BETWEEN '{0}' AND '{1}' """.format(f_i,f_f))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME COMPA INSUMOS POR FECHAS

    # modelo para listado las compras de insumos por fecha
    def Informe_compras_insumo(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        compra_insumo.fecha,
                        compra_insumo.numero_compra,
                        compra_insumo.iva,
                        compra_insumo.subtotal,
                        compra_insumo.impuesto,
                        compra_insumo.total 
                    FROM
                        compra_insumo 
                    WHERE
                        compra_insumo.estado = 1 
                        AND DATE( compra_insumo.fecha ) BETWEEN '{0}' AND '{1}' """.format(f_i,f_f))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME COMPA MEDICAMENTO POR FECHAS

    # modelo para listado las compras de medicamentos por fecha
    def Informe_compras_medicamentos(f_i, f_f):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        compra_medicamento.fecha,
                        compra_medicamento.numero_compra,
                        compra_medicamento.iva,
                        compra_medicamento.subtotal,
                        compra_medicamento.impuesto,
                        compra_medicamento.total 
                    FROM
                        compra_medicamento 
                    WHERE
                        compra_medicamento.estado = 1 
                        AND DATE( compra_medicamento.fecha ) BETWEEN '{0}' AND '{1}' """.format(f_i,f_f))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME CONTROL DE PESO DEL CERDO POR FECHAS

    # modelo para listar el cerdo
    def Cerdos_reporte(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        cerdo.id_cerdo,
                        CONCAT_WS( ' ', cerdo.codigo, '-', cerdo.sexo, '-', raza.raza ) AS cerdo,
                        cerdo.peso,
                        galpon.numero 
                    FROM
                        cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza
                        INNER JOIN galpon_cerdo ON cerdo.id_cerdo = galpon_cerdo.id_cerdo
                        INNER JOIN galpon ON galpon_cerdo.id_galpon = galpon.id_galpon WHERE 
                        cerdo.estado = 1 AND cerdo.id_cerdo = '{0}' """.format(id))
            data = query.fetchone()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listado los pesos del cerdo por fechas
    def Informe_control_peso(f_i, f_f, id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        peso_cerdo.fecha,
                        peso_cerdo.metodo,
                        peso_cerdo.estado,
                        peso_cerdo.peso_a,
                        peso_cerdo.peso_b,
                        peso_cerdo.p_v,
                        cerdo.id_cerdo 
                    FROM
                        peso_cerdo
                        INNER JOIN cerdo ON peso_cerdo.cerdo_id = cerdo.id_cerdo
                        INNER JOIN raza ON cerdo.raza = raza.id_raza
                            WHERE peso_cerdo.fecha BETWEEN '{0}' AND '{1}' AND cerdo.id_cerdo = '{2}' 
                        ORDER BY
                        peso_cerdo.fecha DESC, peso_cerdo.peso_id DESC""".format(f_i,f_f,id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME DE CERDOS

    # modelo para listar los cerdo por razas
    def Cerdos_por_raza(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        cerdo.codigo,
                        cerdo.nombre,
                        cerdo.sexo,
                        raza.raza,
                        cerdo.peso,
                        galpon.numero 
                        FROM
                            raza
                            INNER JOIN cerdo ON raza.id_raza = cerdo.raza
                            INNER JOIN galpon_cerdo ON cerdo.id_cerdo = galpon_cerdo.id_cerdo
                            INNER JOIN galpon ON galpon_cerdo.id_galpon = galpon.id_galpon 
                        WHERE
                        cerdo.estado = 1 
                        AND cerdo.raza = '{0}' """.format(id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    # modelo para listar todos los cerdo
    def Cerdos_full():
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        cerdo.codigo,
                        cerdo.nombre,
                        cerdo.sexo,
                        raza.raza,
                        cerdo.peso,
                        galpon.numero 
                        FROM
                            raza
                            INNER JOIN cerdo ON raza.id_raza = cerdo.raza
                            INNER JOIN galpon_cerdo ON cerdo.id_cerdo = galpon_cerdo.id_cerdo
                            INNER JOIN galpon ON galpon_cerdo.id_galpon = galpon.id_galpon 
                        WHERE
                        cerdo.estado = 1""")
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0

    ######################### INFORME DE CERDOS POR GALPON

    #modelo para traer el galpon del cerdo
    def Listar_galpon_cerdo(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        galpon.id_galpon,
                        galpon.numero,
                        galpon.capacidad,
                        galpon.id_tipo,
                        tipo_galpon.tipo_galpon 
                    FROM
                        galpon
                        INNER JOIN tipo_galpon ON galpon.id_tipo = tipo_galpon.id_tipo 
                    WHERE
                        galpon.id_galpon = '{0}'""". format(id))
            data = query.fetchone()
            query.close()
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
      

    # modelo para listar los cerdo por galpon
    def Cerdos_por_galpon(id):
        try:
            query = mysql.connection.cursor()
            query.execute("""SELECT
                        cerdo.codigo,
                        cerdo.nombre,
                        cerdo.sexo,
                        raza.raza,
                        cerdo.peso,
                        galpon.numero 
                        FROM
                            raza
                            INNER JOIN cerdo ON raza.id_raza = cerdo.raza
                            INNER JOIN galpon_cerdo ON cerdo.id_cerdo = galpon_cerdo.id_cerdo
                            INNER JOIN galpon ON galpon_cerdo.id_galpon = galpon.id_galpon 
                        WHERE
                        cerdo.estado = 1 
                        AND galpon.id_galpon = '{0}' """.format(id))
            data = query.fetchall()
            query.close() 
            return data
        except Exception as e:
            query.close()
            error = "Ocurrio un problema: " + str(e)
            return error
        return 0
