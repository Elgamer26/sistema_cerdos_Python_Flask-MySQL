var tabla_razas, tabla_cerdo;
// crear nueva raza de cerdos
function modal_new_raza() {
  $("#nuevo_raza").val("");
  $("#nuevo_raza_obligg").html("");
  $("#modal_nueva_raza").modal({ backdrop: "static", keyboard: false });
  $("#modal_nueva_raza").modal("show");
}

function guardar_raza() {
  var raza = $("#nuevo_raza").val();

  if (raza.length == 0 || raza.trim() == "") {
    $("#nuevo_raza_obligg").html("Ingrese el nombre de raza");
    return Swal.fire("Campos vacios", "Ingrese la raza de cerdo", "warning");
  } else {
    $("#nuevo_raza_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/cerdo/crear_raza",
    data: { raza: raza },
    success: function (response) {
      if (response == 1) {
        $(".modal-dialog").LoadingOverlay("hide");
        tabla_razas.ajax.reload();
        $("#modal_nueva_raza").modal("hide");
        return Swal.fire(
          "Registro exitoso",
          "La raza se creo con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Raza ya existe",
          "La raza '" + raza + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al crear la raza nueva, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-dialog").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function listar_razas() {
  tabla_razas = $("#tabla_raza_").DataTable({
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
      url: "/cerdo/listar_cerdo",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar la raza'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar la raza'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar la raza'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar la raza'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "raza" },
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
  tabla_razas.on("draw.dt", function () {
    var pageinfo = $("#tabla_raza_").DataTable().page.info();
    tabla_razas
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_raza_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_razas.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_razas.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_razas.row(this).data();
  }
  var dato = 0;
  var id = data.id_raza;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la raza se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_raza(id, dato);
    }
  });
});

$("#tabla_raza_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_razas.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_razas.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_razas.row(this).data();
  }
  var dato = 1;
  var id = data.id_raza;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la raza se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_raza(id, dato);
    }
  });
});

function cambiar_estado_raza(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/cerdo/estado_raza",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_razas.ajax.reload();
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

$("#tabla_raza_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_razas.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_razas.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_razas.row(this).data();
  }

  $("#editar_raza_obligg").html("");

  document.getElementById("id_raza").value = data.id_raza;
  document.getElementById("editar_raza").value = data.raza;

  $("#modal_editar_raza").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_raza").modal("show");
});

//// editar raza del cerdo
function editar_raza() {
  var id = $("#id_raza").val();
  var raza = $("#editar_raza").val();

  if (raza.length == 0 || raza.trim() == "") {
    $("#editar_raza_obligg").html("Ingrese la raza");
    return Swal.fire("Campos vacios", "Ingrese la raza de cerdo", "warning");
  } else {
    $("#editar_raza_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/cerdo/editar_cerdo",
    data: { raza: raza, id: id },
    success: function (response) {
      if (response == 1) {
        $(".modal-dialog").LoadingOverlay("hide");
        $("#modal_editar_raza").modal("hide");
        tabla_razas.ajax.reload();

        return Swal.fire(
          "Editado con exito",
          "La raza se edito con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Raza ya existe",
          "La raza '" + raza + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Error al editar",
          "Error al editar la raza, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-dialog").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

//// registrar cerdo
function registrar_cerdo() {
  var codigo_cerdo = $("#codigo_cerdo").val();
  var nombre = $("#nombre").val();
  var sexo_cerdo = $("#sexo_cerdo").val();
  var raza_id = $("#raza_id").val();
  var peso = $("#peso").val();
  var origen = $("#origen").val();
  var fecha = $("#fecha").val();
  var detalle_c = $("#detalle_c").val();

  if (
    codigo_cerdo.length == 0 ||
    codigo_cerdo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    sexo_cerdo.length == 0 ||
    sexo_cerdo.trim() == "" ||
    raza_id.length == 0 ||
    raza_id.trim() == "" ||
    peso.length == 0 ||
    peso == 0 ||
    origen.length == 0 ||
    origen.trim() == "" ||
    fecha.length == 0 ||
    fecha.trim() == "" ||
    detalle_c.length == 0 ||
    detalle_c.trim() == ""
  ) {
    validar_registro_cerdo(
      codigo_cerdo,
      nombre,
      sexo_cerdo,
      raza_id,
      peso,
      origen,
      fecha,
      detalle_c
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#codigo_oblig").html("");
    $("#nombre_obligg").html("");
    $("#sexo_obligg").html("");
    $("#raza_obligg").html("");
    $("#peso_obligg").html("");
    $("#origen_obligg").html("");
    $("#fecha_obligg").html("");
    $("#detalle_c_obligg").html("");
  }

  var formdata = new FormData();
  var foto = $("#foto")[0].files[0];
  //est valores son como los que van en la data del ajax

  formdata.append("codigo_cerdo", codigo_cerdo);
  formdata.append("nombre", nombre);
  formdata.append("sexo_cerdo", sexo_cerdo);
  formdata.append("raza_id", raza_id);
  formdata.append("peso", peso);
  formdata.append("origen", origen);
  formdata.append("fecha", fecha);
  formdata.append("detalle_c", detalle_c);
  formdata.append("foto", foto);

  $.ajax({
    url: "/cerdo/crear_cerdo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".card-body").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/new_cerdo");
          return Swal.fire(
            "Cerdo creado con exito",
            "El cerdo se creo con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".card-body").LoadingOverlay("hide");
          return Swal.fire(
            "Codigo ya existe",
            "El codigo '" + codigo_cerdo + "', ya existe en el sistema",
            "warning"
          );
        } else if (resp == 3) {
          $(".card-body").LoadingOverlay("hide");
          return Swal.fire(
            "Nombre del cerdo ya existe",
            "El nombre '" + nombre + "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".card-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear el cerdo, falla en la matrix",
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

function validar_registro_cerdo(
  codigo_cerdo,
  nombre,
  sexo_cerdo,
  raza_id,
  peso,
  origen,
  fecha,
  detalle_c
) {
  if (codigo_cerdo.length == 0 || codigo_cerdo.trim() == "") {
    $("#codigo_oblig").html("Ingrese codigo");
  } else {
    $("#codigo_oblig").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre o alias del cerdo");
  } else {
    $("#nombre_obligg").html("");
  }

  if (sexo_cerdo.length == 0 || sexo_cerdo.trim() == "") {
    $("#sexo_obligg").html("Ingrese el sexo");
  } else {
    $("#sexo_obligg").html("");
  }

  if (raza_id.length == 0 || raza_id == 0) {
    $("#raza_obligg").html("Ingrese la raza");
  } else {
    $("#raza_obligg").html("");
  }

  if (peso.length == 0 || peso.trim() == "") {
    $("#peso_obligg").html("Ingrese el peso");
  } else {
    $("#peso_obligg").html("");
  }

  if (origen.length == 0 || origen.trim() == "") {
    $("#origen_obligg").html("Ingrese el origen del cerdo");
  } else {
    $("#origen_obligg").html("");
  }

  if (fecha.length == 0 || fecha.trim() == "") {
    $("#fecha_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_obligg").html("");
  }

  if (detalle_c.length == 0 || detalle_c.trim() == "") {
    $("#detalle_c_obligg").html("Ingrese el detalle del cerdo");
  } else {
    $("#detalle_c_obligg").html("");
  }
}

function listado_cerdos() {
  tabla_cerdo = $("#tabla_cerdo_").DataTable({
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
      url: "/cerdo/listado_cerdos",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el cerdo'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='photo btn btn-outline-warning' title='Foto del cerdo'><i class='fa fa-image' style='font-size: 15px;'></i></button>`;
          } else if (data == 0)  {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el cerdo'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='photo btn btn-outline-warning' title='foto del cerdo'><i class='fa fa-image' style='font-size: 15px;'></i></button>`;
          }else{
            return `<button style='font-size:10px;' class='btn btn-outline-danger'><i class='fa fa-paw' style='font-size: 15px;'></i> Cerdo muerto</button>`;
          }
        },
      },
      { data: "codigo" },
      { data: "nombre" },
      { data: "sexo" },
      { data: "raza" },
      {
        data: "foto",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return (
            "<img class='img-circle' src='static/uploads/cerdo/" +
            data +
            "' width='50px' />"
          );
        },
      },
      { data: "peso" },
      { data: "origen" },
      { data: "fecha" },
      { data: "detalle" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return "<span class='badge badge-success'>ACTIVO</span>";
          } else if (data == 0) {
            return "<span class='badge badge-warning'>INACTIVO</span>";
          } else {
            return "<span class='badge badge-danger'>Cerdo muerto</span>";
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
  tabla_cerdo.on("draw.dt", function () {
    var pageinfo = $("#tabla_cerdo_").DataTable().page.info();
    tabla_cerdo
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_cerdo_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_cerdo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_cerdo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_cerdo.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del cerdo se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_cerdo(id, dato);
    }
  });
});

$("#tabla_cerdo_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_cerdo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_cerdo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_cerdo.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del cerdo se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_cerdo(id, dato);
    }
  });
});

function cambiar_estado_cerdo(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/cerdo/estado_cerdo",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_cerdo.ajax.reload();
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

$("#tabla_cerdo_").on("click", ".photo", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_cerdo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_cerdo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_cerdo.row(this).data();
  }

  var id = data.id;
  var foto = data.foto;

  $("#id_cerdo_foto").val(id);
  $("#foto_actu_c").val(foto);
  $("#img_cerdo").attr("src", "static/uploads/cerdo/" + foto);

  $("#foto_new_c").val("");

  $("#modal_editar_foto_cerdo").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_foto_cerdo").modal("show");
});

function editar_foto_cerdo() {
  var id = document.getElementById("id_cerdo_foto").value;
  var foto = document.getElementById("foto_new_c").value;
  var ruta_actual = document.getElementById("foto_actu_c").value;

  if (foto == "" || ruta_actual.length == 0 || ruta_actual == "") {
    return swal.fire(
      "Mensaje de advertencia",
      "Ingrese una imagen para actualizar",
      "warning"
    );
  }

  var formdata = new FormData();
  var foto = $("#foto_new_c")[0].files[0];

  formdata.append("id", id);
  formdata.append("foto", foto);
  formdata.append("ruta_actual", ruta_actual);

  $.ajax({
    url: "/cerdo/cambiar_foto_cerdo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".modal-body").LoadingOverlay("hide");
          document.getElementById("foto_new_c").value = "";
          tabla_cerdo.ajax.reload();
          $("#modal_editar_foto_cerdo").modal("hide");
          return Swal.fire(
            "Foto cambiada",
            "La foto del cerdo se cambio con exito",
            "success"
          );
        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "Error al cambiar la foto del cerdo",
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

$("#tabla_cerdo_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_cerdo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_cerdo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_cerdo.row(this).data();
  }

  $("#id_cerdo_edit").val(data.id);
  $("#codigo_cerdo").val(data.codigo);
  $("#nombre").val(data.nombre);
  $("#sexo_cerdo").val(data.sexo);
  $("#raza_id").val(data.raza_id).trigger("change");
  $("#peso").val(data.peso);
  $("#origen").val(data.origen);
  $("#fecha").val(data.fecha);
  $("#detalle_c").val(data.detalle);

  $("#codigo_oblig").html("");
  $("#nombre_obligg").html("");
  $("#sexo_obligg").html("");
  $("#raza_obligg").html("");
  $("#peso_obligg").html("");
  $("#origen_obligg").html("");
  $("#fecha_obligg").html("");
  $("#detalle_c_obligg").html("");

  $("#modaleditar_cerdo").modal({ backdrop: "static", keyboard: false });
  $("#modaleditar_cerdo").modal("show");
});

//// editar cerdo
function editar_cerdos() {
  var id = $("#id_cerdo_edit").val();
  var codigo_cerdo = $("#codigo_cerdo").val();
  var nombre = $("#nombre").val();
  var sexo_cerdo = $("#sexo_cerdo").val();
  var raza_id = $("#raza_id").val();
  var peso = $("#peso").val();
  var origen = $("#origen").val();
  var fecha = $("#fecha").val();
  var detalle_c = $("#detalle_c").val();

  if (
    codigo_cerdo.length == 0 ||
    codigo_cerdo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    sexo_cerdo.length == 0 ||
    sexo_cerdo.trim() == "" ||
    raza_id.length == 0 ||
    raza_id.trim() == "" ||
    peso.length == 0 ||
    peso == 0 ||
    origen.length == 0 ||
    origen.trim() == "" ||
    fecha.length == 0 ||
    fecha.trim() == "" ||
    detalle_c.length == 0 ||
    detalle_c.trim() == ""
  ) {
    validar_editar_cerdo(
      codigo_cerdo,
      nombre,
      sexo_cerdo,
      raza_id,
      peso,
      origen,
      fecha,
      detalle_c
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#codigo_oblig").html("");
    $("#nombre_obligg").html("");
    $("#sexo_obligg").html("");
    $("#raza_obligg").html("");
    $("#peso_obligg").html("");
    $("#origen_obligg").html("");
    $("#fecha_obligg").html("");
    $("#detalle_c_obligg").html("");
  }

  var formdata = new FormData();

  formdata.append("id", id);
  formdata.append("codigo_cerdo", codigo_cerdo);
  formdata.append("nombre", nombre);
  formdata.append("sexo_cerdo", sexo_cerdo);
  formdata.append("raza_id", raza_id);
  formdata.append("peso", peso);
  formdata.append("origen", origen);
  formdata.append("fecha", fecha);
  formdata.append("detalle_c", detalle_c);

  $.ajax({
    url: "/cerdo/editar_cerdo_chancho",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {

          $(".modal-dialog").LoadingOverlay("hide");
          $("#modaleditar_cerdo").modal("hide");
          tabla_cerdo.ajax.reload();
          return Swal.fire(
            "Cerdo editado con exito",
            "El cerdo se edito con exito",
            "success"
          );

        } else if (resp == 2) {
          $(".modal-dialog").LoadingOverlay("hide");
          return Swal.fire(
            "Codigo ya existe",
            "El codigo '" + codigo_cerdo + "', ya existe en el sistema",
            "warning"
          );

        } else if (resp == 3) {
          $(".modal-dialog").LoadingOverlay("hide");
          return Swal.fire(
            "Nombre del cerdo ya existe",
            "El nombre '" + nombre + "', ya existe en el sistema",
            "warning"
          );
        }

      } else {

        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el cerdo, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-dialog").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
  return false;
}

function validar_editar_cerdo(
  codigo_cerdo,
  nombre,
  sexo_cerdo,
  raza_id,
  peso,
  origen,
  fecha,
  detalle_c
) {
  if (codigo_cerdo.length == 0 || codigo_cerdo.trim() == "") {
    $("#codigo_oblig").html("Ingrese codigo");
  } else {
    $("#codigo_oblig").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre o alias del cerdo");
  } else {
    $("#nombre_obligg").html("");
  }

  if (sexo_cerdo.length == 0 || sexo_cerdo.trim() == "") {
    $("#sexo_obligg").html("Ingrese el sexo");
  } else {
    $("#sexo_obligg").html("");
  }

  if (raza_id.length == 0 || raza_id == 0) {
    $("#raza_obligg").html("Ingrese la raza");
  } else {
    $("#raza_obligg").html("");
  }

  if (peso.length == 0 || peso.trim() == "") {
    $("#peso_obligg").html("Ingrese el peso");
  } else {
    $("#peso_obligg").html("");
  }

  if (origen.length == 0 || origen.trim() == "") {
    $("#origen_obligg").html("Ingrese el origen del cerdo");
  } else {
    $("#origen_obligg").html("");
  }

  if (fecha.length == 0 || fecha.trim() == "") {
    $("#fecha_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_obligg").html("");
  }

  if (detalle_c.length == 0 || detalle_c.trim() == "") {
    $("#detalle_c_obligg").html("Ingrese el detalle del cerdo");
  } else {
    $("#detalle_c_obligg").html("");
  }
}

///////////////
//////////// registro de cerdos muertos
function registrar_muertes_cerdos() {

  Swal.fire({
    title: "Guardar datos?",
    text: "El registro del cerdo muerto se registrará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, guardar!",
  }).then((result) => {
    if (result.isConfirmed) {
  
      var cerdo = $("#cerdo").val();
      var fecha = $("#fecha_c").val();
      var detalle = $("#detalle").val();
    
      if (cerdo == 0 || fecha.trim() == "" || detalle.trim() == "") {
        validar_serdo_muerto(cerdo, fecha, detalle);
        return Swal.fire("Campos vacios", "Ingrese todos los datos completos", "warning");
      } else {
        $("#cerdo_obligg").html("");
        $("#fecha_c_obligg").html("");
        $("#detalle_oblig").html("");
      }
    
      $.ajax({
        type: "POST",
        url: "/cerdo/registrar_muerte_cerdo",
        data: { cerdo: cerdo, fecha: fecha, detalle: detalle },
        success: function (response) {
          if (response == 1) {
            $(".card-success").LoadingOverlay("hide"); 
            cargar_contenido('contenido_principal','/cerdos_muertos')
            return Swal.fire(
              "Registro exitoso",
              "La muerte del cerdo se registro con exito",
              "success"
            ); 
          } else {
            $(".card-success").LoadingOverlay("hide");
            return Swal.fire(
              "Error de registro",
              "Error al registrar la muerte del cerdo, falla en la matrix",
              "error"
            );
          }
        },
    
        beforeSend: function () {
          $(".card-success").LoadingOverlay("show", {
            text: "Cargando...",
          });
        },
      });

    }
  });

}

function validar_serdo_muerto(cerdo, fecha, detalle)
 {
  if (cerdo == 0) {
    $("#cerdo_obligg").html("Seleccione el cerdo");
  } else {
    $("#cerdo_obligg").html("");
  }

  if (fecha.trim() == "") {
    $("#fecha_c_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_c_obligg").html("");
  }

  if (detalle.trim() == "") {
    $("#detalle_oblig").html("Ingrese el detalle de muerte del cerdo");
  } else {
    $("#detalle_oblig").html("");
  }

}

function eliminar_cerdo_muerto(id){

  Swal.fire({
    title: "Eliminar dato?",
    text: "El registro se eliminará del sistema!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eiminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      
      $.ajax({
        type: "POST",
        url: "/cerdo/eliminar_cerdo_muerto",
        data: { id: id },
        success: function (response) {

          if (response == 1) {

            $(".card-info").LoadingOverlay("hide"); 
            cargar_contenido('contenido_principal','/cerdos_muertos')
            return Swal.fire(
              "Eliminado",
              "El registro se elimino con exito",
              "success"
            ); 

          } else {

            $(".card-info").LoadingOverlay("hide");
            return Swal.fire(
              "Error",
              "Error al eliminar el registro, falla en la matrix",
              "error"
            );

          }
        },
    
        beforeSend: function () {
          $(".card-info").LoadingOverlay("show", {
            text: "Cargando...",
          });
        },

      });

    }
  });

}
