var tabla_tipo_galpon, tabla_galon, tabla_cerdo_galpon;

// tipo de galpón
function modal_new_raza() {
  $("#nuevo_ti_g").val("");
  $("#nuevo_ti_g_obligg").html("");
  $("#modal_nueva_tipo_galpon").modal({ backdrop: "static", keyboard: false });
  $("#modal_nueva_tipo_galpon").modal("show");
}

function guardar_tipo_g() {
  var tipo_g = $("#nuevo_ti_g").val();

  if (tipo_g.length == 0 || tipo_g.trim() == "") {
    $("#nuevo_ti_g_obligg").html("Ingrese el tipo de galpón");
    return Swal.fire("Campos vacios", "Ingrese el tipo de galpón", "warning");
  } else {
    $("#nuevo_ti_g_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/galpon/crear_tipo_g",
    data: { tipo_g: tipo_g },
    success: function (response) {
      if (response == 1) {
        $(".modal-dialog").LoadingOverlay("hide");
        tabla_tipo_galpon.ajax.reload();
        $("#modal_nueva_tipo_galpon").modal("hide");
        return Swal.fire(
          "Registro exitoso",
          "El tipo de galpón se creo con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Raza ya existe",
          "El tipo de galpón '" + tipo_g + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al crear el tipo de galpón, falla en la matrix",
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

function listar_tipo_galpon() {
  tabla_tipo_galpon = $("#tabla_tipo_g_").DataTable({
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
      url: "/galpon/listar_tipo_galpon",
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
      { data: "tipo_galpon" },
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
  tabla_tipo_galpon.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_g_").DataTable().page.info();
    tabla_tipo_galpon
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_tipo_g_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_galpon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_galpon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_galpon.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo galpón se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_g(id, dato);
    }
  });
});

$("#tabla_tipo_g_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_galpon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_galpon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_galpon.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo galpón se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_g(id, dato);
    }
  });
});

function cambiar_estado_tipo_g(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/galpon/estado_tipo_g",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_tipo_galpon.ajax.reload();
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

$("#tabla_tipo_g_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_galpon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_galpon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_galpon.row(this).data();
  }

  $("#editar_tipo_g_obligg").html("");

  document.getElementById("id_tipo_g").value = data.id;
  document.getElementById("editar_tipo_g").value = data.tipo_galpon;

  $("#modal_editar_tipo_g").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_tipo_g").modal("show");
});

function editar_tipo_g() {
  var id = $("#id_tipo_g").val();
  var tipo_g = $("#editar_tipo_g").val();

  if (tipo_g.length == 0 || tipo_g.trim() == "") {
    $("#editar_tipo_g_obligg").html("Ingrese el tipo de galpón");
    return Swal.fire("Campos vacios", "Ingrese el tipo de galpón", "warning");
  } else {
    $("#editar_tipo_g_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/galpon/editar_tipo_g",
    data: { tipo_g: tipo_g, id: id },
    success: function (response) {
      if (response == 1) {
        $(".modal-dialog").LoadingOverlay("hide");
        tabla_tipo_galpon.ajax.reload();
        $("#modal_editar_tipo_g").modal("hide");
        return Swal.fire(
          "Registro exitoso",
          "El tipo de galpón se creo con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Raza ya existe",
          "El tipo de galpón '" + tipo_g + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-dialog").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al crear el tipo de galpón, falla en la matrix",
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

/// galpón
function registrar_galpon() {
  var numero = $("#numero_g").val();
  var id_tipo = $("#id_tipo_g").val();
  var capacidad = $("#capacidad").val();
  var observacion = $("#observacion").val();

  if (
    numero.length == 0 ||
    numero.trim() == "" ||
    id_tipo == 0 ||
    id_tipo.trim() == "" ||
    capacidad.length == 0 ||
    capacidad.trim() == "" ||
    observacion.length == 0 ||
    observacion.trim() == ""
  ) {
    validar_registro_galpon(numero, id_tipo, capacidad, observacion);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#numero_g_oblig").html("");
    $("#tipo_g_obligg").html("");
    $("#capacidad_obligg").html("");
    $("#observacion_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/galpon/crear_galpon",
    data: {
      numero: numero,
      id_tipo: id_tipo,
      capacidad: capacidad,
      observacion: observacion,
    },
    success: function (response) {
      if (response == 1) {
        $(".card").LoadingOverlay("hide");
        cargar_contenido("contenido_principal", "/create_galpon");
        return Swal.fire(
          "Registro exitoso",
          "El galpón se creo con exito",
          "success"
        );
      } else if (response == 2) {
        $(".card").LoadingOverlay("hide");
        return Swal.fire(
          "Número ya existe",
          "El número de galpón '" + numero + "', ya esta creado",
          "warning"
        );
      } else {
        $(".card").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al crear el galpón, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".card").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function validar_registro_galpon(numero, id_tipo, capacidad, observacion) {
  if (numero.length == 0 || numero.trim() == "") {
    $("#numero_g_oblig").html("Ingrese el número");
  } else {
    $("#numero_g_oblig").html("");
  }

  if (id_tipo == 0 || id_tipo.trim() == "") {
    $("#tipo_g_obligg").html("Ingrese tipo de galpón");
  } else {
    $("#tipo_g_obligg").html("");
  }

  if (capacidad.length == 0 || capacidad.trim() == "") {
    $("#capacidad_obligg").html("Ingrese la capacidad");
  } else {
    $("#capacidad_obligg").html("");
  }

  if (observacion.length == 0 || observacion.trim() == "") {
    $("#observacion_obligg").html("Ingrese la observación");
  } else {
    $("#observacion_obligg").html("");
  }
}

function listar_galpones() {
  tabla_galon = $("#tabla_galpon_").DataTable({
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
      url: "/galpon/listar_galpon",
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
      { data: "numero" },
      { data: "tipo_galpon" },
      { data: "capacidad" },
      { data: "observacion" },
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
  tabla_galon.on("draw.dt", function () {
    var pageinfo = $("#tabla_galpon_").DataTable().page.info();
    tabla_galon
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_galpon_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_galon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_galon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_galon.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del galpón se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_galpon(id, dato);
    }
  });
});

$("#tabla_galpon_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_galon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_galon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_galon.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del galpón se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_galpon(id, dato);
    }
  });
});

function cambiar_estado_galpon(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/galpon/estado_galpon",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_galon.ajax.reload();
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

$("#tabla_galpon_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_galon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_galon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_galon.row(this).data();
  }

  $("#numero_g_oblig").html("");
  $("#tipo_g_obligg").html("");
  $("#capacidad_obligg").html("");
  $("#observacion_obligg").html("");

  document.getElementById("id_galpon").value = data.id;
  document.getElementById("numero_g").value = data.numero;
  $("#id_tipo_g").val(data.id_tipo).trigger("change");
  document.getElementById("capacidad").value = data.capacidad;
  document.getElementById("observacion").value = data.observacion;

  $("#modal_editar_galpon").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_galpon").modal("show");
});

function editar_galpon() {
  var id = $("#id_galpon").val();
  var numero = $("#numero_g").val();
  var id_tipo = $("#id_tipo_g").val();
  var capacidad = $("#capacidad").val();
  var observacion = $("#observacion").val();

  if (
    numero.length == 0 ||
    numero.trim() == "" ||
    id_tipo == 0 ||
    id_tipo.trim() == "" ||
    capacidad.length == 0 ||
    capacidad.trim() == "" ||
    observacion.length == 0 ||
    observacion.trim() == ""
  ) {
    validar_editar_galpon(numero, id_tipo, capacidad, observacion);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#numero_g_oblig").html("");
    $("#tipo_g_obligg").html("");
    $("#capacidad_obligg").html("");
    $("#observacion_obligg").html("");
  }

  $.ajax({
    type: "POST",
    url: "/galpon/editar_galpon",
    data: {
      id: id,
      numero: numero,
      id_tipo: id_tipo,
      capacidad: capacidad,
      observacion: observacion,
    },
    success: function (response) {
      if (response == 1) {
        $(".modal-content").LoadingOverlay("hide");
        $("#modal_editar_galpon").modal("hide");
        tabla_galon.ajax.reload();
        return Swal.fire(
          "Editado con exito",
          "El galpón se edito con exito",
          "success"
        );
      } else if (response == 2) {
        $(".modal-content").LoadingOverlay("hide");
        return Swal.fire(
          "Número ya existe",
          "El número de galpón '" + numero + "', ya esta creado",
          "warning"
        );
      } else {
        $(".modal-content").LoadingOverlay("hide");
        return Swal.fire(
          "Error de registro",
          "Error al editar el galpón, falla en la matrix",
          "error"
        );
      }
    },

    beforeSend: function () {
      $(".modal-content").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function validar_editar_galpon(numero, id_tipo, capacidad, observacion) {
  if (numero.length == 0 || numero.trim() == "") {
    $("#numero_g_oblig").html("Ingrese el número");
  } else {
    $("#numero_g_oblig").html("");
  }

  if (id_tipo == 0 || id_tipo.trim() == "") {
    $("#tipo_g_obligg").html("Ingrese tipo de galpón");
  } else {
    $("#tipo_g_obligg").html("");
  }

  if (capacidad.length == 0 || capacidad.trim() == "") {
    $("#capacidad_obligg").html("Ingrese la capacidad");
  } else {
    $("#capacidad_obligg").html("");
  }

  if (observacion.length == 0 || observacion.trim() == "") {
    $("#observacion_obligg").html("Ingrese la observación");
  } else {
    $("#observacion_obligg").html("");
  }
}

/////////////// registro galpon cerdo
function modal_cerdo_sin_galpon() {
  $("#model_cerdos_sin_galpon").modal({ backdrop: "static", keyboard: false });
  $("#model_cerdos_sin_galpon").modal("show");
}

function listar_cerdo_galpon() {
  tabla_cerdo_galpon = $("#tabla_cerdo_sin_galpon").DataTable({
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
      url: "/galpon/listar_cerdo_galpon",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      {
        render: function () {
          return `<button style='font-size:10px;' type='button' class='enviar btn btn-outline-success' title='enviar el cerdo'><i class='fa fa-paper-plane' style='font-size: 15px;'></i></button>`;
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
    order: [[0, "ASC"]],
  });
}

$("#tabla_cerdo_sin_galpon").on("click", ".enviar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_cerdo_galpon.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_cerdo_galpon.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_cerdo_galpon.row(this).data();
  }

  var id = data.id;
  var codigo = data.codigo;
  var sexo = data.sexo;
  var raza = data.raza;
  var foto = data.foto;
  var peso = data.peso;
  var origen = data.origen;
  var fecha = $("#fecha_g").val();
  var galpon_n = $("#id_galpon").val();

  var disponibe = $("#disponibe").val();

  if (galpon_n == "0" || galpon_n.length == 0) {
    $("#model_cerdos_sin_galpon").modal("hide");
    $("#id_galpon_obligg").html("Seleccione el galpón");
    return swal.fire(
      "Seleccione el galpón",
      "Debe seleccionar el galpón para ingresar al cerdo",
      "warning"
    );
  } else {
    $("#id_galpon_obligg").html("");
  }

  if (verificar_cerdo_id(id)) {
    return Swal.fire(
      "Mensaje de advertencia",
      "El cerdo: '" +
        codigo +
        " - Raza: " +
        raza +
        "' , ya fue agregado al detalle",
      "warning"
    );
  }

  $("#disponibe").val(parseInt(disponibe) + parseInt(1));

  var datos_agg = "<tr>";
  datos_agg += "<td hidden for='id'>" + id + "</td>";
  datos_agg += "<td>" + fecha + "</td>";
  datos_agg += "<td>" + codigo + "</td>";
  datos_agg += "<td>" + sexo + "</td>";
  datos_agg += "<td>" + raza + "</td>";

  datos_agg +=
    "<td> <img class='img-circle' src='static/uploads/cerdo/" +
    foto +
    "' width='50px' /> </td>";
  datos_agg += "<td>" + peso + "</td>";
  datos_agg += "<td>" + origen + "</td>";
  datos_agg +=
    "<td><button onclick='remove_cergo(this)' class='btn btn-danger'><i class='fa fa-trash'></i></button></td>";
  datos_agg += "</tr>";

  //esto me ayuda a enviar los datos a la tabla
  $("#tbody_tabla_galpo_cerdo").append(datos_agg);

  $("#model_cerdos_sin_galpon").modal("hide");
});

function remove_cergo(t) {
  var td = t.parentNode;
  var tr = td.parentNode;
  var table = tr.parentNode;
  table.removeChild(tr);

  var disponibe = $("#disponibe").val();
  $("#disponibe").val(parseInt(disponibe) - parseInt(1));
  if (parseInt($("#disponibe").val()) < 0) {
    $("#disponibe").val("0");
  }
}

function verificar_cerdo_id(id) {
  let idverificar = document.querySelectorAll(
    "#tbody_tabla_galpo_cerdo td[for='id']"
  );
  return [].filter.call(idverificar, (td) => td.textContent == id).length == 1;
}

function registrar_cerdo_galpon() {
  Swal.fire({
    title: "Guardar registro?",
    text: "El registro del galpón cerdo se guardará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, guardar!",
  }).then((result) => {
    if (result.isConfirmed) {
      registra_datos();
    }
  });
}

function registra_datos() {
  var id_galpon = $("#id_galpon").val();
  var capacidad = $("#capacidad").val();
  var disponibe = $("#disponibe").val();

  if (id_galpon == "0" || id_galpon.length == 0) {
    $("#id_galpon_obligg").html("Seleccione el galpón");
    return swal.fire(
      "Seleccione el galpón",
      "Debe seleccionar el galpón para ingresar al cerdo",
      "warning"
    );
  } else {
    $("#id_galpon_obligg").html("");
  }

  if (parseInt(disponibe) > parseInt(capacidad)) {
    $("#capacidad_obligg").html("XXX");
    $("#disponibe_obligg").html("XXX");

    return swal.fire(
      "Capacidad no disponible",
      "La cantidad supera la capacidad",
      "warning"
    );
  } else {
    $("#capacidad_obligg").html("");
    $("#disponibe_obligg").html("");
  }

  var count = 0;
  var arrego_id = new Array();
  var arreglo_fecha = new Array();

  $("#tabla_galpo_cerdo tbody#tbody_tabla_galpo_cerdo tr").each(function () {
    arrego_id.push($(this).find("td").eq(0).text());
    arreglo_fecha.push($(this).find("td").eq(1).text());
    count++;
  });

  if (parseInt(count) > parseInt(disponibe)) {
    $("#capacidad_obligg").html("XXX");
    $("#disponibe_obligg").html("XXX");

    $("#detalle_tabla").html("Cantidad en la tabla supera la capacidad");

    return swal.fire(
      "Capacidad no disponible",
      "La cantidad supera la capacidad",
      "warning"
    );
  } else {
    $("#capacidad_obligg").html("");
    $("#disponibe_obligg").html("");
    $("#detalle_tabla").html("");
  }

  if (parseInt(count) == 0) {
    $("#detalle_tabla").html("No hay datos en la tabla de los cerdos");
    return swal.fire("No hay cerdos", "Ingrese cerdos en la tabla", "warning");
  } else {
    $("#detalle_tabla").html("");
  }

  var id_c = arrego_id.toString();
  var fecha = arreglo_fecha.toString();

  $.ajax({
    url: "/galpon/registrar_cerdo_galpon",
    type: "POST",
    data: { id_galpon: id_galpon, id_c: id_c, fecha: fecha },
    success: function (resp) {
      $(".card").LoadingOverlay("hide");
      if (resp == 1) {
        cargar_contenido("contenido_principal", "/create_galpon_cerdo");
        return Swal.fire(
          "Datos registrados",
          "Los cerdos se registrarón el en galpón!",
          "success"
        );
      } else {
        return Swal.fire(
          "Error",
          "Error al registra los datos en el sistema!",
          "error"
        );
      }
    },
    beforeSend: function () {
      $(".card").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

///mover cerdo galpon
function editar_cambios_galpon() {
  Swal.fire({
    title: "Guardar registro?",
    text: "El registro del galpón cerdo se guardará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, guardar!",
  }).then((result) => {
    if (result.isConfirmed) {
      editar_cambios_galpon_datos();
    }
  });
}

function editar_cambios_galpon_datos() {
  var id_actual = $("#galpo_actual_cerdo").val();
  var id_nuevo = $("#id_galpon_nuevo").val();
  var text = $('#galpo_actual_cerdo option:selected').text();

  var capacidad = $("#capacidad_n").val();
  var disponibe = $("#disponibe_n").val();

  if (id_actual == "0" || id_actual.length == 0) {
    $("#id_galpon_nuevo_obligg").html("Seleccione el galpón");
    return swal.fire(
      "Seleccione el galpón",
      "Debe seleccionar el galpón para ingresar al cerdo",
      "warning"
    );
  } else {
    $("#id_galpon_nuevo_obligg").html("");
  }

  if (parseInt(disponibe) > parseInt(capacidad)) {
    $("#capacidad_obligg_n").html("XXX");
    $("#disponibe_obligg_n").html("XXX");

    return swal.fire(
      "Capacidad no disponible",
      "La cantidad supera la capacidad",
      "warning"
    );
  } else {
    $("#capacidad_obligg_n").html("");
    $("#disponibe_obligg_n").html("");
  }

  var count = 0;
  var arrego_id_f = new Array();
  var arrego_id = new Array();
  var arreglo_fecha = new Array();

  $("#tabla_devolvor tbody#tbody_tabla_devolvor tr").each(function () {
    arrego_id_f.push($(this).find("td").eq(0).text());
    arrego_id.push($(this).find("td").eq(1).text());
    arreglo_fecha.push($(this).find("td").eq(2).text());
    count++;
  });

  if (parseInt(count) > parseInt(disponibe)) {
    $("#capacidad_obligg_n").html("XXX");
    $("#disponibe_obligg_n").html("XXX");

    $("#detalle_tabla_n").html("Cantidad en la tabla supera la capacidad");

    return swal.fire(
      "Capacidad no disponible",
      "La cantidad supera la capacidad",
      "warning"
    );
  } else {
    $("#capacidad_obligg_n").html("");
    $("#disponibe_obligg_n").html("");
    $("#detalle_tabla_n").html("");
  }

  if (parseInt(count) == 0) {
    $("#detalle_tabla_n").html("No hay datos en la tabla de los cerdos");
    return swal.fire("No hay cerdos", "Ingrese cerdos en la tabla", "warning");
  } else {
    $("#detalle_tabla_n").html("");
  }

  var id_f = arrego_id_f.toString();
  var id_c = arrego_id.toString();
  var fecha = arreglo_fecha.toString();
  var Id_global = $("#Id_global").val();

  $.ajax({
    url: "/galpon/editar_cerdo_galpon",
    type: "POST",
    data: {
      id_f: id_f,
      id_actual: id_actual,
      id_nuevo: id_nuevo,
      id_c: id_c,
      fecha: fecha,
      text: text
    },
    success: function (resp) {
      $(".card").LoadingOverlay("hide");
      if (resp == 1) {
        cargar_contenido(
          "contenido_principal",
          "/ver_cerdos_galpo/" + Id_global
        );
        return Swal.fire(
          "Cerdos transferidos",
          "Los cerdos se pasaron al galpón seleccionado!",
          "success"
        );
      } else {
        return Swal.fire(
          "Error",
          "Error al pasar los cerdos a otro galpón!",
          "error"
        );
      }
    },
    beforeSend: function () {
      $(".card").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}
