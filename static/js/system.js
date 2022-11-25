function datos_usuarios_logeo() {
  $.ajax({
    type: "GET",
    url: "/usuario/datos_usuarios_logeo",
    success: function (response) {
      if (response != "" || response != null) {
        $("#nombres_l_l").html(response[1]);
        $("#rol_l").html(response[10]);
        $("#imagen_l_1").attr("src", "/static/uploads/usuario/" + response[8]);
        $("#img_l_2").attr("src", "/static/uploads/usuario/" + response[8]);

        $("#img_usuario_l").attr(
          "src",
          "/static/uploads/usuario/" + response[8]
        );
        $("#foto_actu_l").val(response[8]);

        $("#nombres_l").val(response[1]);
        $("#apellidos_l").val(response[2]);
        $("#domicilio_l").val(response[6]);
        $("#telefono_l").val(response[7]);
        $("#usuario_l").val(response[3]);

        $("#correo_l").val(response[11]);
        $("#cedula_l").val(response[12]);

        $("#pass_oculto").val(response[4]);
      }
    },
  });
}

function mostar_perfil() {
  $("#modaleditar_usuario_logeado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#modaleditar_usuario_logeado").modal("show");
}

function mostar_foto_l() {
  $("#modal_editar_foto_logeado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#modal_editar_foto_logeado").modal("show");
}

function modtar_password_l() {
  $("#modaleditar_password_logeado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#modaleditar_password_logeado").modal("show");
}

//// editar usuario
function editar_usuario_loegado() {
  var nombres = $("#nombres_l").val();
  var apellidos = $("#apellidos_l").val();
  var domicilio = $("#domicilio_l").val();
  var telefono = $("#telefono_l").val();
  var usuario = $("#usuario_l").val();
  var correo_l = $("#correo_l").val();
  var cedula_l = $("#cedula_l").val();

  if (
    nombres.length == 0 ||
    nombres.trim() == "" ||
    apellidos.length == 0 ||
    apellidos.trim() == "" ||
    domicilio.length == 0 ||
    domicilio.trim() == "" ||
    telefono.length == 0 ||
    telefono.trim() == "" ||
    usuario.length == 0 ||
    usuario.trim() == "" ||
    correo_l.length == 0 ||
    correo_l.trim() == "" ||
    cedula_l.length == 0 ||
    cedula_l.trim() == ""
  ) {
    validar_registros_usuario_editar_l(
      nombres,
      apellidos,
      domicilio,
      telefono,
      usuario,
      correo_l,
      cedula_l
    );
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_oblig_l").html("");
    $("#apellidos_obligg_l").html("");
    $("#domicilio_obligg_l").html("");
    $("#telefono_obligg_l").html("");
    $("#usuario_obligg_l").html("");
    $("#correo_obligg_l").html("");
    $("#cedula_obligg_l").html("");
  }

  if (!G_correo) {
    $("#correo_obligg_l").html("Ingrese un correo correcto");
    return swal.fire(
    "Correo incorrecto",
    "Ingrese un correo correcto",
    "warning"
    );
  }else{
    $("#correo_obligg_l").html("");
  }

  if (!G_cedula) {
    $("#cedula_obligg_l").html("Ingrese una cédula correcta");
    return swal.fire(
    "Cédula incorrecta",
    "Ingrese una cédula correcta",
    "warning"
    );
  }else{
    $("#cedula_obligg_l").html("");
  }

  var formdata = new FormData();
  formdata.append("nombres", nombres);
  formdata.append("apellidos", apellidos);
  formdata.append("domicilio", domicilio);
  formdata.append("telefono", telefono);
  formdata.append("usuario", usuario);
  formdata.append("correo_l", correo_l);
  formdata.append("cedula_l", cedula_l);

  $.ajax({
    url: "/usuario/editar_usuario_logeado",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".modal-body").LoadingOverlay("hide");
          $("#modaleditar_usuario_logeado").modal("hide");
          datos_usuarios_logeo();
          return Swal.fire(
            "Datos editados con exito",
            "Los datos del usuario se edito con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".modal-body").LoadingOverlay("hide");
          return Swal.fire(
            "Usuario ya existe",
            "El usuario " + usuario + ", ya existe en el sistema",
            "warning"
          );
        } else if (resp == 3) {
          $(".modal-body").LoadingOverlay("hide");
          return Swal.fire(
            "Correo ya existe",
            "El correo " + correo_l + ", ya existe en el sistema",
            "warning"
          );
        } else if (resp == 4) {
          $(".modal-body").LoadingOverlay("hide");
          return Swal.fire(
            "Cédula ya existe",
            "La cédula " + cedula_l + ", ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el usuario, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_registros_usuario_editar_l(
  nombres,
  apellidos,
  domicilio,
  telefono,
  usuario,
  correo_l,
  cedula_l
) {
  if (nombres.length == 0 || nombres.trim() == "") {
    $("#nombre_oblig_l").html("Ingrese los nombres");
  } else {
    $("#nombre_oblig_l").html("");
  }

  if (apellidos.length == 0 || apellidos.trim() == "") {
    $("#apellidos_obligg_l").html("Ingrese los apellidos");
  } else {
    $("#apellidos_obligg_l").html("");
  }

  if (domicilio.length == 0 || domicilio.trim() == "") {
    $("#domicilio_obligg_l").html("Ingrese el domicilio");
  } else {
    $("#domicilio_obligg_l").html("");
  }

  if (telefono.length == 0 || telefono.trim() == "") {
    $("#telefono_obligg_l").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg_l").html("");
  }

  if (usuario.length == 0 || usuario.trim() == "") {
    $("#usuario_obligg_l").html("Ingrese el usuario");
  } else {
    $("#usuario_obligg_l").html("");
  }

  if (correo_l.length == 0 || correo_l.trim() == "") {
    $("#correo_obligg_l").html("Ingrese correo");
  } else {
    $("#correo_obligg_l").html("");
  }

  if (cedula_l.length == 0 || cedula_l.trim() == "") {
    $("#cedula_obligg_l").html("Ingrese cédula");
  } else {
    $("#cedula_obligg_l").html("");
  }
}

function editar_foto_usuario_logeado() {
  var foto = document.getElementById("foto_new_l").value;
  var ruta_actual = document.getElementById("foto_actu_l").value;

  if (foto == "" || ruta_actual.length == 0 || ruta_actual == "") {
    return swal.fire(
      "Mensaje de advertencia",
      "Ingrese una imagen para actualizar",
      "warning"
    );
  }

  var formdata = new FormData();
  var foto = $("#foto_new_l")[0].files[0];

  formdata.append("foto", foto);
  formdata.append("ruta_actual", ruta_actual);

  $.ajax({
    url: "/usuario/cambiar_foto_usuario_logeo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".modal-body").LoadingOverlay("hide");
          document.getElementById("foto_new_l").value = "";
          datos_usuarios_logeo();

          return Swal.fire(
            "Foto cambiada",
            "La foto del usuario se cambio con exito",
            "success"
          );
        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "Error al cambiar la foto del usuario",
          "error"
        );
      }
    },
    beforeSend: function () {
      $(".modal-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

//// editar password
function editar_password_l() {
  var pass_oculto = $("#pass_oculto").val();
  var password_ac = $("#password_ac").val();
  var password_n = $("#password_n").val();
  var confirmar_p = $("#confirmar_p").val();

  if (
    password_ac.length == 0 ||
    password_ac.trim() == "" ||
    password_n.length == 0 ||
    password_n.trim() == "" ||
    confirmar_p.length == 0 ||
    confirmar_p.trim() == ""
  ) {
    validar_password(password_ac, password_n, confirmar_p);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#password_ac_oblig").html("");
    $("#password_n_oblig").html("");
    $("#confirmar_p_obligg").html("");
  }

  if (pass_oculto != password_ac) {
    $("#password_ac_oblig").html("Password incorrecto");
    return swal.fire(
      "Password incorrecto",
      "El password ingresado es incorrecto",
      "error"
    );
  } else {
    $("#password_ac_oblig").html("");
  }

  if (password_n != confirmar_p) {
    $("#password_n_oblig").html("Los password no coinciden");
    $("#confirmar_p_obligg").html("Los password no coinciden");
    return swal.fire("Password", "Los password no coinciden", "warning");
  } else {
    $("#password_n_oblig").html("");
    $("#confirmar_p_obligg").html("");
  }

  if (!pass_usus_l) {
    return swal.fire(
      "Password débil",
      "Ingrese un password mas fuerte",
      "warning"
    );
  }

  var formdata = new FormData();
  formdata.append("password_n", password_n);

  $.ajax({
    url: "/usuario/cambiar_password",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $("#passstrength").html("");
          $("#password_ac").val("");
          $("#password_n").val("");
          $("#confirmar_p").val("");

          $(".modal-body").LoadingOverlay("hide");
          datos_usuarios_logeo();

          return Swal.fire(
            "Password editados con exito",
            "El password se edito con exito",
            "success"
          );
        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el password, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_password(password_ac, password_n, confirmar_p) {
  if (password_ac.length == 0 || password_ac.trim() == "") {
    $("#password_ac_oblig").html("Ingrese password actual");
  } else {
    $("#password_ac_oblig").html("");
  }

  if (password_n.length == 0 || password_n.trim() == "") {
    $("#password_n_oblig").html("Ingrese password nuevo");
  } else {
    $("#password_n_oblig").html("");
  }

  if (confirmar_p.length == 0 || confirmar_p.trim() == "") {
    $("#confirmar_p_obligg").html("Confirme password nuevo");
  } else {
    $("#confirmar_p_obligg").html("");
  }
}


//////////// fotos de la pagina web
/////////////// subiir fotos de la página web
function subir_foto_1() {
  var foto1 = document.getElementById("foto1").value;
  var foto1_ruta = document.getElementById("foto1_ruta").value;

  if (foto1.length == 0) {
    return swal.fire("No hay foto", "Debe ingresar la foto", "warning");
  }

  var formdata = new FormData();
  var foto = $("#foto1")[0].files[0];
  //est valores son como los que van en la data del ajax

  formdata.append("foto", foto);
  formdata.append("ruta_actual", foto1_ruta);

  $.ajax({
    url: "/web/subir_foto_1",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          cargar_contenido('contenido_principal', '/pag_web');
          return Swal.fire(
            "Imgen subida",
            "La imagen de la web se actualizó con exito",
            "success"
          );
        }
      } else {
        return Swal.fire(
          "Error",
          "La imagen no se puedo actualizar",
          "error"
        );
      }
    },
  });
  return false;
}

function subir_foto_2() {
  var foto2 = document.getElementById("foto2").value;
  var foto2_ruta = document.getElementById("foto2_ruta").value;

  if (foto2.length == 0) {
    return swal.fire("No hay foto", "Debe ingresar la foto", "warning");
  }

  var formdata = new FormData();
  var foto = $("#foto2")[0].files[0];
  //est valores son como los que van en la data del ajax

  formdata.append("foto", foto);
  formdata.append("ruta_actual", foto2_ruta);

  $.ajax({
    url: "/web/subir_foto_2",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          cargar_contenido('contenido_principal', '/pag_web');
          return Swal.fire(
            "Imgen subida",
            "La imagen de la web se actualizó con exito",
            "success"
          );
        }
      } else {
        return Swal.fire(
          "Error",
          "La imagen no se puedo actualizar",
          "error"
        );
      }
    },
  });
  return false;
}

function subir_foto_3() {
  var foto3 = document.getElementById("foto3").value;
  var foto3_ruta = document.getElementById("foto3_ruta").value;

  if (foto3.length == 0) {
    return swal.fire("No hay foto", "Debe ingresar la foto", "warning");
  }

  var formdata = new FormData();
  var foto = $("#foto3")[0].files[0];
  //est valores son como los que van en la data del ajax

  formdata.append("foto", foto);
  formdata.append("ruta_actual", foto3_ruta);

  $.ajax({
    url: "/web/subir_foto_3",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          cargar_contenido('contenido_principal', '/pag_web');
          return Swal.fire(
            "Imgen subida",
            "La imagen de la web se actualizó con exito",
            "success"
          );
        }
      } else {
        return Swal.fire(
          "Error",
          "La imagen no se puedo actualizar",
          "error"
        );
      }
    },
  });
  return false;
}

function editar_detalle_foto() {
  var detalle1 = $("#detalle_1").val();
  var detalle2 = $("#detalle_2").val();
  var detalle3 = $("#detalle_3").val();

  if (detalle1.length == 0 || detalle2.length == 0 || detalle3.length == 0 ||
    detalle1.trim() == "" || detalle2.trim() == "" || detalle3.trim() == "") {
    if (detalle1.length == 0 || detalle1.trim() == "") {
      $("#lbldetalle_1").html("Ingrese detalle");
    } else {
      $("#lbldetalle_1").html("");
    }

    if (detalle2.length == 0 || detalle2.trim() == "") {
      $("#lbldetalle_2").html("Ingrese detalle");
    } else {
      $("#lbldetalle_2").html("");
    }

    if (detalle3.length == 0 || detalle3.trim() == "") {
      $("#lbldetalle_3").html("Ingrese detalle");
    } else {
      $("#lbldetalle_3").html("");
    }

    return swal.fire("Campos vacios", "NO debe dejar campos de texto vacios", "warning");
  } else {
    $("#lbldetalle_1").html("");
    $("#lbldetalle_2").html("");
    $("#lbldetalle_3").html("");
  }

  $.ajax({
    url: "/web/detalle_de_web",
    type: "POST",
    data: {
      detalle1: detalle1,
      detalle2: detalle2,
      detalle3: detalle3
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        cargar_contenido('contenido_principal', '/pag_web');
        return Swal.fire(
          "Datos actualizados",
          "Los datos se actualizarón con exito",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Error",
        "No se puedo actualizar los datos",
        "error"
      );
    }
  });
}