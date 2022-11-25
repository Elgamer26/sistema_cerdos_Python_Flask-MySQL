var tabla_rol, tabla_usuarios;

$(document).on("click", "#btn_recuperar", function () {
  window.location.href = "recuperar";
});

$(document).on("click", "#enviar_correo", function (event) {
  event.preventDefault();
  var correo = $("#correo_recuperar").val();

  $(".login-box").LoadingOverlay("show", {
    text: "Cargando...",
  });

  $.ajax({
    type: "POST",
    url: "/usuario/verificar_correo",
    data: { correo: correo },
    success: function (response) {
      $("#none_recuperar").hide();
      $("#error_envio_correo").hide();
      $("#error_restablecer").hide();
      $("#ok_password").hide();

      if (response == 0) {

        $(".login-box").LoadingOverlay("hide");
        $("#none_recuperar").show(2000);

      } else {
        $.ajax({
          type: "POST",
          url: "https://amada.i-sistener.xyz/recuperar_password.php",
          data: { password: response, correo: correo },
          success: function (resp) {
            // console.log(resp);
            $("#error_envio_correo").hide(2000);
            if (resp == 1) {
              $.ajax({
                type: "POST",
                url: "/usuario/restablecer_password",
                data: { password: response, correo: correo },
                success: function (ok) {

                  if (ok == 1) {
                    $(".login-box").LoadingOverlay("hide");
                    $("#ok_password").show(2000);
                    $("#correo_recuperar").val("");
                  } else {
                    $(".login-box").LoadingOverlay("hide");
                    $("#error_restablecer").show(2000);
                  }
                },

              });
            } else {

              $(".login-box").LoadingOverlay("hide");
              $("#error_envio_correo").show(2000);

            }
          },
        });
      }
    },
  });
});

$(document).on("click", "#btn_aceptar", function () {
  var usuario = $("#username").val();
  var password = $("#password").val();

  if (parseInt(usuario.length) <= 0 || usuario == "" || usuario.trim() == "") {
    $("#none_pass").hide();
    $("#none_usu").hide();
    $("#none_usu").show(2000);
  } else if (
    parseInt(password.length) <= 0 ||
    password == "" ||
    password.trim() == ""
  ) {
    $("#none_usu").hide();
    $("#none_pass").hide();
    $("#none_pass").show(2000);
  } else {
    $("#none_usu").hide();
    $("#none_pass").hide();

    $.ajax({
      url: "/Ingreso",
      type: "POST",
      data: { usuario: usuario, password: password },
    }).done(function (responce) {
      if (responce == 0) {
        $("#none_usu").hide();
        $("#none_pass").hide();
        $("#error_logeo").hide();
        $("#error_logeo").show(2000);
        return false;
      } else {
        if (responce[2] == 0) {
          return Swal.fire({
            icon: "error",
            title: "Usuario inactivo",
            text: "El usuario se encuentra inactivo!",
          });
        } else {
          $.ajax({
            url: "/Crear_variable",
            type: "POST",
            data: {
              id_usu: responce[0],
              id_rol: responce[1],
            },
          }).done(function (res) {
            if (res == 1) {
              let timerInterval;
              Swal.fire({
                icon: "info",
                title: "Bienvenido al sistema!",
                html: "Usted sera redireccionado en <b></b> mi.",
                allowOutsideClick: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector("b");
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  window.location.href = "/Admin";
                }
              });
            }
          });
        }
      }
    });
  }
});

//// crear rol de usuario
function registra_rol() {
  var rol = $("#nuevo_rol").val();

  if (rol.length == 0 || rol.trim() == "") {
    $("#rol_obligg").html("Ingrese el nombre de rol");
    return Swal.fire("Campos vacios", "Ingrese el mombre del rol", "warning");
  } else {
    $("#rol_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/usuario/crear_rol",
    data: { rol: rol },
    success: function (response) {
      if (response > 0) {
        registra_permisis_rol(parseInt(response));
      } else if (response == 2) {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Rol ya existe",
          "El rol '" + rol + "', ya esta creado",
          "warning"
        );
      } else {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al crear un rol nuevo, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".card-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function registra_permisis_rol(id) {
  var usuario = document.getElementById("usuario_p").checked;
  var config = document.getElementById("config_p").checked;
  var cerdo = document.getElementById("cerdo_p").checked;
  var galpon = document.getElementById("galpon_p").checked;
  var cergal = document.getElementById("cergal_p").checked;
  var compraventa = document.getElementById("compraventa_p").checked;
  var alicerdo = document.getElementById("alicerdo_p").checked;
  var insumo = document.getElementById("insumo_p").checked;
  var medicamento = document.getElementById("medicamento_p").checked;
  var alimentacion = document.getElementById("alimentacion_p").checked;
  var alimcerdo = document.getElementById("alimcerdo_p").checked;
  var pesaje = document.getElementById("pesaje_p").checked;
  var enfertrata = document.getElementById("enfertrata_p").checked;
  var cerdosenfer = document.getElementById("cerdosenfer_p").checked;
  var tratamiento = document.getElementById("tratamiento_p").checked;

  $.ajax({
    url: "/usuario/crear_permisos_rol",
    type: "POST",
    data: {
      id: id,
      usuario: usuario,
      config: config,
      cerdo: cerdo,
      galpon: galpon,
      cergal: cergal,
      compraventa: compraventa,
      alicerdo: alicerdo,
      insumo: insumo,
      medicamento: medicamento,
      alimentacion: alimentacion,
      alimcerdo: alimcerdo,
      pesaje: pesaje,
      enfertrata: enfertrata,
      cerdosenfer: cerdosenfer,
      tratamiento: tratamiento,
    },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        $(".card-body").LoadingOverlay("hide");
        $("#nuevo_rol").val("");
        return Swal.fire(
          "Registro exitoso",
          "El rol se creo con exito",
          "success"
        );
      }
    } else {
      $(".card-body").LoadingOverlay("hide");
      return Swal.fire(
        "Error de registro",
        "Error al crear los permisos del rol, falla en la matrix",
        "error"
      );
    }
  });
}

function listar_rol() {
  tabla_rol = $("#tabla_rol_").DataTable({
    ordering: true,
    paging: true,
    aProcessing: true,
    aServerSide: true,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,

    ajax: {
      url: "/usuario/listar_rol",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el rol'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='llaves btn btn-outline-warning' title='Editar permisos del rol'><i class='fa fa-key' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el rol'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='llaves btn btn-outline-warning' title='Editar permisos del rol'><i class='fa fa-key' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "rol" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return "<span class='badge badge-success'>ACTIVO</span>";
          } else {
            return "<span class='badge badge-danger'>INACTIVO</span>";
          }
        },
      },
    ],

    language: {
      rows: "%d fila seleccionada",
      processing: "Tratamiento en curso...",
      search: "Buscar&nbsp;:",
      lengthMenu: "Agrupar en _MENU_ items",
      info: "Mostrando los item (_START_ al _END_) de un total _TOTAL_ items",
      infoEmpty: "No existe datos.",
      infoFiltered: "(filtrado de _MAX_ elementos en total)",
      infoPostFix: "",
      loadingRecords: "Cargando...",
      zeroRecords: "No se encontro resultados en tu busqueda",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo",
      },
      select: {
        rows: "%d fila seleccionada",
      },
      aria: {
        sortAscending: ": active para ordenar la columa en orden ascendente",
        sortDescending: ": active para ordenar la columna en orden descendente",
      },
    },
    select: true,
    responsive: "true",
    dom: "Bfrtilp",
    buttons: [
      {
        extend: "excelHtml5",
        text: "Excel",
        titleAttr: "Exportar a Excel",
        className: "btn btn-success greenlover",
      },
      {
        extend: "pdfHtml5",
        text: "PDF",
        titleAttr: "Exportar a PDF",
        className: "btn btn-danger redfule",
      },
      {
        extend: "print",
        text: "Imprimir",
        titleAttr: "Imprimir",
        className: "btn btn-primary azuldete",
      },
    ],
    order: [[0, "ASC"]],
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_rol.on("draw.dt", function () {
    var pageinfo = $("#tabla_rol_").DataTable().page.info();
    tabla_rol
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_rol_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_rol.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_rol.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_rol.row(this).data();
  }
  var dato = 0;
  var id = data.id_rol;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del rol se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_rol(id, dato);
    }
  });
});

$("#tabla_rol_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_rol.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_rol.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_rol.row(this).data();
  }
  var dato = 1;
  var id = data.id_rol;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del rol se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_rol(id, dato);
    }
  });
});

function cambiar_estado_rol(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/usuario/estado_rol",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_rol.ajax.reload();
        return Swal.fire(
          "Estado rol",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado rol",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_rol_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_rol.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_rol.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_rol.row(this).data();
  }

  document.getElementById("id_rol").value = data.id_rol;
  document.getElementById("nuevo_rol_edit").value = data.rol;

  $("#modal-primary").modal({ backdrop: "static", keyboard: false });
  $("#modal-primary").modal("show");
});

//// editar rol de usuario
function editar_rol() {
  var id = $("#id_rol").val();
  var rol = $("#nuevo_rol_edit").val();

  if (rol.length == 0 || rol.trim() == "") {
    $("#rol_obligg_edit").html("Ingrese el nombre de rol");
    return Swal.fire("Campos vacios", "Ingrese el mombre del rol", "warning");
  } else {
    $("#rol_obligg_edit").html();
  }

  $.ajax({
    type: "POST",
    url: "/usuario/editar_rol",
    data: { rol: rol, id: id },
    success: function (response) {
      if (response == 1) {
        $(".modal-body").LoadingOverlay("hide");
        $("#modal-primary").modal("hide");
        tabla_rol.ajax.reload();
        return Swal.fire(
          "Editado con exito",
          "El rol se edito con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Rol ya existe",
          "El rol '" + rol + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error al editar",
          "Error al editar el rol, falla en la matrix",
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
}

$("#tabla_rol_").on("click", ".llaves", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_rol.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_rol.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_rol.row(this).data();
  }

  var id = data.id_rol;

  $(".card-info").LoadingOverlay("show", {
    text: "Cargando...",
  });
  obtener_permisos(parseInt(id));
});

function obtener_permisos(id) {
  $.ajax({
    url: "/usuario/obtener_permisos",
    type: "POST",
    data: { id: id },
  }).done(function (data) {
    $("#id_rol_p").val(id);
    $("#id_permiso").val(data[0]);

    data[2].toString() == "true"
      ? ($("#usuario_p")[0].checked = true)
      : ($("#usuario_p")[0].checked = false);

    data[3].toString() == "true"
      ? ($("#config_p")[0].checked = true)
      : ($("#config_p")[0].checked = false);

    data[4].toString() == "true"
      ? ($("#cerdo_p")[0].checked = true)
      : ($("#cerdo_p")[0].checked = false);

    data[5].toString() == "true"
      ? ($("#galpon_p")[0].checked = true)
      : ($("#galpon_p")[0].checked = false);

    data[6].toString() == "true"
      ? ($("#cergal_p")[0].checked = true)
      : ($("#cergal_p")[0].checked = false);

    data[7].toString() == "true"
      ? ($("#compraventa_p")[0].checked = true)
      : ($("#compraventa_p")[0].checked = false);

    data[8].toString() == "true"
      ? ($("#alicerdo_p")[0].checked = true)
      : ($("#alicerdo_p")[0].checked = false);

    data[9].toString() == "true"
      ? ($("#insumo_p")[0].checked = true)
      : ($("#insumo_p")[0].checked = false);

    data[10].toString() == "true"
      ? ($("#medicamento_p")[0].checked = true)
      : ($("#medicamento_p")[0].checked = false);

    data[11].toString() == "true"
      ? ($("#alimentacion_p")[0].checked = true)
      : ($("#alimentacion_p")[0].checked = false);

    data[12].toString() == "true"
      ? ($("#alimcerdo_p")[0].checked = true)
      : ($("#alimcerdo_p")[0].checked = false);

    data[13].toString() == "true"
      ? ($("#pesaje_p")[0].checked = true)
      : ($("#pesaje_p")[0].checked = false);

    data[14].toString() == "true"
      ? ($("#enfertrata_p")[0].checked = true)
      : ($("#enfertrata_p")[0].checked = false);

    data[15].toString() == "true"
      ? ($("#cerdosenfer_p")[0].checked = true)
      : ($("#cerdosenfer_p")[0].checked = false);

    data[16].toString() == "true"
      ? ($("#tratamiento_p")[0].checked = true)
      : ($("#tratamiento_p")[0].checked = false);

    $(".card-info").LoadingOverlay("hide");

    $("#modal_editar_permisos").modal({
      backdrop: "static",
      keyboard: false,
    });
    $("#modal_editar_permisos").modal("show");
  });
}

function editar_permisos() {
  var id_rol = document.getElementById("id_rol_p").value;
  var id_permiso = document.getElementById("id_permiso").value;

  var usuario = document.getElementById("usuario_p").checked;
  var config = document.getElementById("config_p").checked;
  var cerdo = document.getElementById("cerdo_p").checked;
  var galpon = document.getElementById("galpon_p").checked;
  var cergal = document.getElementById("cergal_p").checked;
  var compraventa = document.getElementById("compraventa_p").checked;
  var alicerdo = document.getElementById("alicerdo_p").checked;
  var insumo = document.getElementById("insumo_p").checked;
  var medicamento = document.getElementById("medicamento_p").checked;
  var alimentacion = document.getElementById("alimentacion_p").checked;
  var alimcerdo = document.getElementById("alimcerdo_p").checked;
  var pesaje = document.getElementById("pesaje_p").checked;
  var enfertrata = document.getElementById("enfertrata_p").checked;
  var cerdosenfer = document.getElementById("cerdosenfer_p").checked;
  var tratamiento = document.getElementById("tratamiento_p").checked;

  $.ajax({
    url: "/usuario/editar_permisos_rol",
    type: "POST",
    data: {
      id_rol: id_rol,
      id_permiso: id_permiso,
      usuario: usuario,
      config: config,
      cerdo: cerdo,
      galpon: galpon,
      cergal: cergal,
      compraventa: compraventa,
      alicerdo: alicerdo,
      insumo: insumo,
      medicamento: medicamento,
      alimentacion: alimentacion,
      alimcerdo: alimcerdo,
      pesaje: pesaje,
      enfertrata: enfertrata,
      cerdosenfer: cerdosenfer,
      tratamiento: tratamiento,
    },
  }).done(function (response) {
    $(".bg-warning").LoadingOverlay("show", {
      text: "Cargando...",
    });

    if (response > 0) {
      if (response == 1) {
        $(".bg-warning").LoadingOverlay("hide");
        $("#modal_editar_permisos").modal("hide");
        return Swal.fire(
          "Permisos editados con exito",
          "Los permisos del rol se editaron con exito",
          "success"
        );
      }
    } else {
      $(".bg-warning").LoadingOverlay("hide");
      return Swal.fire(
        "Error",
        "Error al editar los permisos del rol, falla en la matrix",
        "error"
      );
    }
  });
}

//// registrar usuario
function registra_uuario() {
  var nombres = $("#nombres").val();
  var apellidos = $("#apellidos").val();
  var domicilio = $("#domicilio").val();
  var telefono = $("#telefono").val();
  var tipo_rol = $("#rol_id").val();
  var usuario = $("#usuario").val();
  var correo = $("#correo").val();
  var cedula = $("#cedula").val();

  if (
    nombres.length == 0 ||
    nombres.trim() == "" ||
    apellidos.length == 0 ||
    apellidos.trim() == "" ||
    domicilio.length == 0 ||
    domicilio.trim() == "" ||
    telefono.length == 0 ||
    telefono.trim() == "" ||
    tipo_rol.length == 0 ||
    tipo_rol == 0 ||
    usuario.length == 0 ||
    usuario.trim() == "" ||
    correo.length == 0 ||
    correo.trim() == "" ||
    cedula.length == 0 ||
    cedula.trim() == ""
  ) {
    validar_registros_usuario(
      nombres,
      apellidos,
      domicilio,
      telefono,
      tipo_rol,
      usuario,
      correo,
      cedula
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_oblig").html("");
    $("#apellidos_obligg").html("");
    $("#domicilio_obligg").html("");
    $("#telefono_obligg").html("");
    $("#rol_obligg").html("");
    $("#usuario_obligg").html("");
    $("#correo_obligg").html("");
    $("#cedula_obligg").html("");
  }

  if (!G_cedula_create) {
    $("#cedula_obligg").html("Ingrese una cédula correcta");
    return swal.fire(
      "Cédula incorrecta",
      "Ingrese una cédula correcta",
      "warning"
    );
  } else {
    $("#cedula_obligg").html("");
  }

  if (!G_correo_create) {
    $("#correo_obligg").html("Ingrese un correo correcto");
    return swal.fire(
      "Correo incorrecto",
      "Ingrese un correo correcto",
      "warning"
    );
  } else {
    $("#correo_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/usuario/validar_datos_usuario_register",
    data: { usuario: usuario, correo: correo, cedula: cedula },
    success: function (response) {
      if (response == 2) {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Usuario ya existe",
          "El usuario " + usuario + ", ya existe en el sistema",
          "warning"
        );
      } else if (response == 3) {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Correo ya existe",
          "El correo " + correo + ", ya existe en el sistema",
          "warning"
        );
      } else if (response == 4) {
        return Swal.fire(
          "Cédula ya existe",
          "La cédula " + cedula + ", ya existe en el sistema",
          "warning"
        );
      } else {

        $.ajax({
          type: "POST",
          url: "https://amada.i-sistener.xyz/crear_usuario.php", // cambiar la url del envio de correo por la del hostinger
          data: { password: response, correo: correo, nombres: nombres },
          success: function (envio) {

            if (envio == 1) {

              var formdata = new FormData();
              var foto = $("#foto")[0].files[0];
              //est valores son como los que van en la data del ajax
              formdata.append("nombres", nombres);
              formdata.append("apellidos", apellidos);
              formdata.append("domicilio", domicilio);
              formdata.append("telefono", telefono);
              formdata.append("tipo_rol", tipo_rol);
              formdata.append("usuario", usuario);
              formdata.append("password", response);
              formdata.append("correo", correo);
              formdata.append("cedula", cedula);
              formdata.append("foto", foto);

              $.ajax({
                url: "/usuario/crear_user",
                type: "POST",
                //aqui envio toda la formdata
                data: formdata,
                contentType: false,
                processData: false,
                success: function (resp) {

                  if (resp > 0) {
                    if (resp == 1) {
                      $(".card-body").LoadingOverlay("hide");
                      cargar_contenido("contenido_principal", "/create_user");
                      return Swal.fire(
                        "Usuario creado con exito",
                        "El usuario se creo con exito",
                        "success"
                      );
                    } else {
                      $(".card-body").LoadingOverlay("hide");
                      return Swal.fire(
                        "Error",
                        resp,
                        "error"
                      );
                    }
                  } else {
                    $(".card-body").LoadingOverlay("hide");
                    return Swal.fire(
                      "Error",
                      "No se pudo crear el usuario, falla en la matrix",
                      "error"
                    );
                  }

                },
              });

              return false;

            } else {
              $(".card-body").LoadingOverlay("hide");
              return Swal.fire(
                "Error de envio",
                "No se puedo enviar el correo con la password del usuario",
                "error"
              );
            }
          },
        });
      }
    },

    beforeSend: function () {
      $(".card-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });

}

function validar_registros_usuario(
  nombres,
  apellidos,
  domicilio,
  telefono,
  tipo_rol,
  usuario,
  correo,
  cedula
) {
  if (nombres.length == 0 || nombres.trim() == "") {
    $("#nombre_oblig").html("Ingrese los nombres");
  } else {
    $("#nombre_oblig").html("");
  }

  if (apellidos.length == 0 || apellidos.trim() == "") {
    $("#apellidos_obligg").html("Ingrese los apellidos");
  } else {
    $("#apellidos_obligg").html("");
  }

  if (domicilio.length == 0 || domicilio.trim() == "") {
    $("#domicilio_obligg").html("Ingrese el domicilio");
  } else {
    $("#domicilio_obligg").html("");
  }

  if (telefono.length == 0 || telefono.trim() == "") {
    $("#telefono_obligg").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg").html("");
  }

  if (tipo_rol.length == 0 || tipo_rol == 0) {
    $("#rol_obligg").html("Ingrese el rol");
  } else {
    $("#rol_obligg").html("");
  }

  if (usuario.length == 0 || usuario.trim() == "") {
    $("#usuario_obligg").html("Ingrese el usuario");
  } else {
    $("#usuario_obligg").html("");
  }

  if (correo.length == 0 || correo.trim() == "") {
    $("#correo_obligg").html("Ingrese el correo");
  } else {
    $("#correo_obligg").html("");
  }

  if (cedula.length == 0 || cedula.trim() == "") {
    $("#cedula_obligg").html("Ingrese la cédula");
  } else {
    $("#cedula_obligg").html("");
  }


}

///////// lista de usuarios
function lista_usuarios() {
  tabla_usuarios = $("#tabla_usuario_").DataTable({
    ordering: true,
    paging: true,
    aProcessing: true,
    aServerSide: true,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"],
    ],
    pageLength: 10,
    destroy: true,
    async: false,
    processing: true,

    ajax: {
      url: "/usuario/listar_usuarios",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el usuarios'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el usuarios'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='photo btn btn-outline-warning' title='Editar el usuarios'><i class='fa fa-image' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el usuarios'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el usuarios'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='photo btn btn-outline-warning' title='Editar el usuarios'><i class='fa fa-image' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "nombres" },
      { data: "apellidos" },
      { data: "usuario" },
      { data: "rol" },
      {
        data: "foto",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return (
            "<img class='img-circle' src='static/uploads/usuario/" +
            data +
            "' width='50px' />"
          );
        },
      },
      { data: "domicilio" },
      { data: "telefono" },
      { data: "correo" },
      { data: "cedula" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return "<span class='badge badge-success'>ACTIVO</span>";
          } else {
            return "<span class='badge badge-danger'>INACTIVO</span>";
          }
        },
      },
    ],

    language: {
      rows: "%d fila seleccionada",
      processing: "Tratamiento en curso...",
      search: "Buscar&nbsp;:",
      lengthMenu: "Agrupar en _MENU_ items",
      info: "Mostrando los item (_START_ al _END_) de un total _TOTAL_ items",
      infoEmpty: "No existe datos.",
      infoFiltered: "(filtrado de _MAX_ elementos en total)",
      infoPostFix: "",
      loadingRecords: "Cargando...",
      zeroRecords: "No se encontro resultados en tu busqueda",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo",
      },
      select: {
        rows: "%d fila seleccionada",
      },
      aria: {
        sortAscending: ": active para ordenar la columa en orden ascendente",
        sortDescending: ": active para ordenar la columna en orden descendente",
      },
    },
    select: true,
    responsive: "true",
    dom: "Bfrtilp",
    buttons: [
      {
        extend: "excelHtml5",
        text: "Excel",
        titleAttr: "Exportar a Excel",
        className: "btn btn-success greenlover",
      },
      {
        extend: "pdfHtml5",
        text: "PDF",
        titleAttr: "Exportar a PDF",
        className: "btn btn-danger redfule",
      },
      {
        extend: "print",
        text: "Imprimir",
        titleAttr: "Imprimir",
        className: "btn btn-primary azuldete",
      },
    ],
    order: [[0, "ASC"]],
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_usuarios.on("draw.dt", function () {
    var pageinfo = $("#tabla_usuario_").DataTable().page.info();
    tabla_usuarios
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_usuario_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_usuarios.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_usuarios.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_usuarios.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del usuario se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_usuario(id, dato);
    }
  });
});

$("#tabla_usuario_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_usuarios.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_usuarios.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_usuarios.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del usuario se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_usuario(id, dato);
    }
  });
});

function cambiar_estado_usuario(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/usuario/estado_usuario",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_usuarios.ajax.reload();
        return Swal.fire(
          "Estado rol",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado rol",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_usuario_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_usuarios.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_usuarios.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_usuarios.row(this).data();
  }

  $("#id_usuario").val(data.id);
  $("#rol_id").val(data.rol_id).trigger("change");
  $("#nombres").val(data.nombres);
  $("#apellidos").val(data.apellidos);
  $("#domicilio").val(data.domicilio);
  $("#telefono").val(data.telefono);
  $("#usuario").val(data.usuario);
  $("#correo").val(data.correo);
  $("#cedula").val(data.cedula);

  G_cedula_edit = true;
  G_correo_edit = true;

  $("#correo").css("border", "1px solid green");
  $("#cedula").css("border", "1px solid green");

  $("#nombre_oblig").html("");
  $("#apellidos_obligg").html("");
  $("#domicilio_obligg").html("");
  $("#telefono_obligg").html("");
  $("#rol_obligg").html("");
  $("#usuario_obligg").html("");
  $("#correo_obligg").html("");
  $("#cedula_obligg").html("");

  $("#modaleditar_usuario").modal({ backdrop: "static", keyboard: false });
  $("#modaleditar_usuario").modal("show");
});

//// editar usuario
function editar_usuario() {
  var id = $("#id_usuario").val();
  var nombres = $("#nombres").val();
  var apellidos = $("#apellidos").val();
  var domicilio = $("#domicilio").val();
  var telefono = $("#telefono").val();
  var tipo_rol = $("#rol_id").val();
  var usuario = $("#usuario").val();
  var correo = $("#correo").val();
  var cedula = $("#cedula").val();

  if (
    nombres.length == 0 ||
    nombres.trim() == "" ||
    apellidos.length == 0 ||
    apellidos.trim() == "" ||
    domicilio.length == 0 ||
    domicilio.trim() == "" ||
    telefono.length == 0 ||
    telefono.trim() == "" ||
    tipo_rol.length == 0 ||
    tipo_rol == 0 ||
    usuario.length == 0 ||
    usuario.trim() == "" ||
    correo.length == 0 ||
    correo.trim() == "" ||
    cedula.length == 0 ||
    cedula.trim() == ""
  ) {
    validar_registros_usuario_editar(
      nombres,
      apellidos,
      domicilio,
      telefono,
      tipo_rol,
      usuario,
      correo,
      cedula
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_oblig").html("");
    $("#apellidos_obligg").html("");
    $("#domicilio_obligg").html("");
    $("#telefono_obligg").html("");
    $("#rol_obligg").html("");
    $("#usuario_obligg").html("");
    $("#correo_obligg").html("");
    $("#cedula_obligg").html("");
  }

  if (!G_cedula_edit) {
    $("#cedula_obligg").html("Ingrese una cédula correcta");
    return swal.fire(
      "Cédula incorrecta",
      "Ingrese una cédula correcta",
      "warning"
    );
  } else {
    $("#cedula_obligg").html("");
  }

  if (!G_correo_edit) {
    $("#correo_obligg").html("Ingrese un correo correcto");
    return swal.fire(
      "Correo incorrecto",
      "Ingrese un correo correcto",
      "warning"
    );
  } else {
    $("#correo_obligg").html("");
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("nombres", nombres);
  formdata.append("apellidos", apellidos);
  formdata.append("domicilio", domicilio);
  formdata.append("telefono", telefono);
  formdata.append("tipo_rol", tipo_rol);
  formdata.append("usuario", usuario);
  formdata.append("correo", correo);
  formdata.append("cedula", cedula);

  $.ajax({
    url: "/usuario/editar_usurio",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".modal-body").LoadingOverlay("hide");
          $("#modaleditar_usuario").modal("hide");
          tabla_usuarios.ajax.reload();
          return Swal.fire(
            "Usuario editado con exito",
            "El usuario se edito con exito",
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
            "El correo " + correo + ", ya existe en el sistema",
            "warning"
          );
        } else if (resp == 4) {
          $(".modal-body").LoadingOverlay("hide");
          return Swal.fire(
            "Cédula ya existe",
            "La cédula " + cedula + ", ya existe en el sistema",
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

function validar_registros_usuario_editar(
  nombres,
  apellidos,
  domicilio,
  telefono,
  tipo_rol,
  usuario,
  correo,
  cedula
) {
  if (nombres.length == 0 || nombres.trim() == "") {
    $("#nombre_oblig").html("Ingrese los nombres");
  } else {
    $("#nombre_oblig").html("");
  }

  if (apellidos.length == 0 || apellidos.trim() == "") {
    $("#apellidos_obligg").html("Ingrese los apellidos");
  } else {
    $("#apellidos_obligg").html("");
  }

  if (domicilio.length == 0 || domicilio.trim() == "") {
    $("#domicilio_obligg").html("Ingrese el domicilio");
  } else {
    $("#domicilio_obligg").html("");
  }

  if (telefono.length == 0 || telefono.trim() == "") {
    $("#telefono_obligg").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg").html("");
  }

  if (tipo_rol.length == 0 || tipo_rol == 0) {
    $("#rol_obligg").html("Ingrese el rol");
  } else {
    $("#rol_obligg").html("");
  }

  if (usuario.length == 0 || usuario.trim() == "") {
    $("#usuario_obligg").html("Ingrese el usuario");
  } else {
    $("#usuario_obligg").html("");
  }

  if (correo.length == 0 || correo.trim() == "") {
    $("#correo_obligg").html("Ingrese el correo");
  } else {
    $("#correo_obligg").html("");
  }

  if (cedula.length == 0 || cedula.trim() == "") {
    $("#cedula_obligg").html("Ingrese cédula");
  } else {
    $("#cedula_obligg").html("");
  }
}

$("#tabla_usuario_").on("click", ".photo", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_usuarios.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_usuarios.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_usuarios.row(this).data();
  }

  var id = data.id;
  var foto = data.foto;

  $("#id_usuario_foto").val(id);
  $("#foto_actu").val(foto);
  $("#img_usuario").attr("src", "static/uploads/usuario/" + foto);

  $("#foto_new").val("");

  $("#modal_editar_foto").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_foto").modal("show");
});

function editar_foto_usuario() {
  var id = document.getElementById("id_usuario_foto").value;
  var foto = document.getElementById("foto_new").value;
  var ruta_actual = document.getElementById("foto_actu").value;

  if (foto == "" || ruta_actual.length == 0 || ruta_actual == "") {
    return swal.fire(
      "Mensaje de advertencia",
      "Ingrese una imagen para actualizar",
      "warning"
    );
  }

  var formdata = new FormData();
  var foto = $("#foto_new")[0].files[0];

  formdata.append("id", id);
  formdata.append("foto", foto);
  formdata.append("ruta_actual", ruta_actual);

  $.ajax({
    url: "/usuario/cambiar_foto_usuario",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".modal-body").LoadingOverlay("hide");
          document.getElementById("foto_new").value = "";
          tabla_usuarios.ajax.reload();
          $("#modal_editar_foto").modal("hide");
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

///////////////////
//// editar los datos de la hacienda
function editar_empresa() {
  var nombres = $("#razon_scial").val();
  var ruc = $("#ruc").val();
  var telefono = $("#telefono").val();
  var direccion = $("#direccion").val();
  var correo = $("#correo").val();
  var encargado = $("#encargado").val();
  var descripcion = $("#descripcion").val();

  if (
    nombres.length == 0 ||
    nombres.trim() == "" ||
    ruc.length == 0 ||
    ruc.trim() == "" ||
    direccion.length == 0 ||
    direccion.trim() == "" ||
    telefono.length == 0 ||
    telefono.trim() == "" ||
    correo.length == 0 ||
    correo == 0 ||
    encargado.length == 0 ||
    encargado.trim() == "" ||
    descripcion.length == 0 ||
    descripcion.trim() == ""
  ) {
    validar_editar_empresa(
      nombres,
      ruc,
      telefono,
      direccion,
      correo,
      encargado,
      descripcion
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_oblig").html("");
    $("#ruc_obligg").html("");
    $("#telefono_obligg").html("");
    $("#direccion_obligg").html("");
    $("#correo_obligg").html("");
    $("#encargado_obligg").html("");
    $("#descricions_obligg").html("");
  }

  if (!correo_usus) {
    $("#correo_obligg").html("El formato de correo no es el correcto");
    return swal.fire(
      "Correo incorrecto",
      "El formato de correo no es el correcto",
      "warning"
    );
  }else{
    $("#correo_obligg").html("");
  }

  var formdata = new FormData();
  formdata.append("nombres", nombres);
  formdata.append("ruc", ruc);
  formdata.append("telefono", telefono);
  formdata.append("direccion", direccion);
  formdata.append("correo", correo);
  formdata.append("encargado", encargado);
  formdata.append("descripcion", descripcion);

  $.ajax({
    url: "/usuario/editar_empresa",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".card-body").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/hacienda");

          return Swal.fire(
            "Datos editados",
            "Se edito los datos correctamente",
            "success"
          );
        }
      } else {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar los datos, falla en la matrix",
          "error"
        );
      }
    },
    beforeSend: function () {
      $(".card-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_editar_empresa(
  nombres,
  ruc,
  telefono,
  direccion,
  correo,
  encargado,
  descripcion
) {
  if (nombres.length == 0 || nombres.trim() == "") {
    $("#nombre_oblig").html("Ingrese nombre de hacienda");
  } else {
    $("#nombre_oblig").html("");
  }

  if (ruc.length == 0 || ruc.trim() == "") {
    $("#ruc_obligg").html("Ingrese el ruc");
  } else {
    $("#ruc_obligg").html("");
  }

  if (telefono.length == 0 || telefono.trim() == "") {
    $("#telefono_obligg").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg").html("");
  }

  if (direccion.length == 0 || direccion.trim() == "") {
    $("#direccion_obligg").html("Ingrese la dirección");
  } else {
    $("#direccion_obligg").html("");
  }

  if (correo.length == 0 || correo == 0) {
    $("#correo_obligg").html("Ingrese el correo");
  } else {
    $("#correo_obligg").html("");
  }

  if (encargado.length == 0 || encargado.trim() == "") {
    $("#encargado_obligg").html("Ingrese el encargado");
  } else {
    $("#encargado_obligg").html("");
  }

  if (descripcion.length == 0 || descripcion.trim() == "") {
    $("#descricions_obligg").html("Ingrese la descripción");
  } else {
    $("#descricions_obligg").html("");
  }
}

function editar_foto_emppresa() {
  var foto = document.getElementById("foto").value;
  var ruta_actual = document.getElementById("nombre_foto").value;

  if (foto == "" || ruta_actual.length == 0 || ruta_actual == "") {
    return swal.fire(
      "Mensaje de advertencia",
      "Ingrese una imagen para actualizar",
      "warning"
    );
  }

  var formdata = new FormData();
  var foto = $("#foto")[0].files[0];

  formdata.append("foto", foto);
  formdata.append("ruta_actual", ruta_actual);

  $.ajax({
    url: "/usuario/cambiar_foto_empresa",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $("card-body").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/hacienda");
          return Swal.fire(
            "Foto cambiada",
            "La foto del usuario se cambio con exito",
            "success"
          );
        }
      } else {
        $("card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "Error al cambiar la foto de la hacienda",
          "error"
        );
      }
    },
    beforeSend: function () {
      $("card-body").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}
