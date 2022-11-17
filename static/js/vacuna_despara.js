
function registrar_calendario_cerdo() {
  var titulo = $("#evento_titulo").val();
  var cerdo = $("#cerdo").val();
  var cerdo_text = $("#cerdo option:selected").text();
  var descripcion = $("#descripcion").val();
  var tipo = $("#tipo").val();
  var fecha_evento = $("#fecha_evento").val();
  var color = $("#color").val();
  var color_etiqueta = $("#color_etiqueta").val();

  if (
    titulo.trim() == "" ||
    cerdo == 0 ||
    descripcion.trim() == "" ||
    tipo == 0
  ) {
    validar_registro_calendario_save(titulo, cerdo, descripcion, tipo);

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#titulo_obligg").html("");
    $("#cerdo_obligg").html("");
    $("#descripcion_obligg").html("");
    $("#tipoo_obligg").html("");
  }

  if(color == color_etiqueta){
    $("#color_obligg").html("Colores iguales");
    $("#etiqueta_obligg").html("Colores iguales");
    return swal.fire(
      "Colores",
      "El 'Color letra', no debe ser igual al 'Color etiqueta'",
      "warning"
    );
  }else{
    $("#color_obligg").html("");
    $("#etiqueta_obligg").html("");
  }

  var formdata = new FormData();
  formdata.append("titulo", titulo);
  formdata.append("cerdo", cerdo);
  formdata.append("descripcion", descripcion);
  formdata.append("tipo", tipo);
  formdata.append("fecha_evento", fecha_evento);
  formdata.append("color", color);
  formdata.append("color_etiqueta", color_etiqueta);

  $.ajax({
    url: "/vacunas/calendario_registrar",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {

      if (resp > 0) {
        if (resp == 1) {

          $(".bg-success").LoadingOverlay("hide");
          $("#modal_canlendario_register").modal("hide");
          $("#calendar").fullCalendar("refetchEvents");

          return Swal.fire(
            "Calendario creado con exito",
            "El calendario creo con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".bg-success").LoadingOverlay("hide");
          return Swal.fire(
            "Calendario ya existe",
            "El cerdo seleccionado: '" +
              cerdo_text +
              "', ya tiene creado un evento: '" + tipo + "' en el calendario en la fecha: '" +
              fecha_evento +
              "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".bg-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear el calendario, falla en la matrix",
          "error"
        );
      }
      
    },

    beforeSend: function () {
      $(".bg-success").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_registro_calendario_save(titulo, cerdo, descripcion, tipo) {
  if (titulo.trim() == "") {
    $("#titulo_obligg").html("Ingrese el titulo");
  } else {
    $("#titulo_obligg").html("");
  }

  if (cerdo == 0) {
    $("#cerdo_obligg").html("Seleccione el cerdo");
  } else {
    $("#cerdo_obligg").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_obligg").html("Ingrese la descripción");
  } else {
    $("#descripcion_obligg").html("");
  }

  if (tipo == 0) {
    $("#tipoo_obligg").html("Seleccione el tipo");
  } else {
    $("#tipoo_obligg").html("");
  }
}

function editar_calendario_cerdo() {
  var id = $("#id_calendario").val();
  var titulo = $("#evento_titulo_edit").val();
  var cerdo = $("#cerdo_edit").val();
  var cerdo_text = $("#cerdo_edit option:selected").text();
  var descripcion = $("#descripcion_edit").val();
  var tipo = $("#tipo_edit").val();
  var fecha_evento = $("#fecha_evento_edit").val();
  var color = $("#color_edit").val();
  var color_etiqueta = $("#color_etiqueta_edit").val();

  if (
    titulo.trim() == "" ||
    cerdo == 0 ||
    descripcion.trim() == "" ||
    tipo == 0
  ) {
    validar_editar_calendario(titulo, cerdo, descripcion, tipo);

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#titulo_obligg_edit").html("");
    $("#cerdo_obligg_edit").html("");
    $("#descripcion_obligg_edit").html("");
    $("#tipoo_obligg_edit").html("");
  }

  if(color == color_etiqueta){
    $("#color_obligg_edit").html("Colores iguales");
    $("#etiqueta_obligg_edit").html("Colores iguales");
    return swal.fire(
      "Colores",
      "El 'Color letra', no debe ser igual al 'Color etiqueta'",
      "warning"
    );
  }else{
    $("#color_obligg_edit").html("");
    $("#etiqueta_obligg_edit").html("");
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("titulo", titulo);
  formdata.append("cerdo", cerdo);
  formdata.append("descripcion", descripcion);
  formdata.append("tipo", tipo);
  formdata.append("fecha_evento", fecha_evento);
  formdata.append("color", color);
  formdata.append("color_etiqueta", color_etiqueta);

  $.ajax({
    url: "/vacunas/calendario_editar",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {

      if (resp > 0) {
        if (resp == 1) {

          $(".bg-primary").LoadingOverlay("hide");
          $("#modal_canlendario_editar").modal("hide");
          $("#calendar").fullCalendar("refetchEvents");

          return Swal.fire(
            "Calendario editado con exito",
            "El calendario se edito con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".bg-primary").LoadingOverlay("hide");
          return Swal.fire(
            "Calendario ya existe",
            "El cerdo seleccionado: '" +
              cerdo_text +
              "', ya tiene creado un evento: '" + tipo + "' en el calendario en la fecha: '" +
              fecha_evento +
              "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".bg-primary").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el calendario, falla en la matrix",
          "error"
        );
      }
      
    },

    beforeSend: function () {
      $(".bg-primary").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_editar_calendario(titulo, cerdo, descripcion, tipo) {
  if (titulo.trim() == "") {
    $("#titulo_obligg_edit").html("Ingrese el titulo");
  } else {
    $("#titulo_obligg_edit").html("");
  }

  if (cerdo == 0) {
    $("#cerdo_obligg_edit").html("Seleccione el cerdo");
  } else {
    $("#cerdo_obligg_edit").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_edit").html("Ingrese la descripción");
  } else {
    $("#descripcion_edit").html("");
  }

  if (tipo == 0) {
    $("#tipoo_obligg_edit").html("Seleccione el tipo");
  } else {
    $("#tipoo_obligg_edit").html("");
  }
}
