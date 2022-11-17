var tabla_tipo_a, tabla_marca_a, tabla_alimento, funcion, tabla_tipo_alimentacion, tabla_seguimineto;

function listar_tipo_a() {
  tabla_tipo_a = $("#tabla_tipo_a_").DataTable({
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
      url: "/alimento/listar_tipo_alimento",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el rol'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el rol'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "tipo_alimento" },
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
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_tipo_a.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_a_").DataTable().page.info();
    tabla_tipo_a
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

function registra_tipo_a() {
  var valor = $("#tipo_alimento").val();

  $("#mensaje_tipo_a_success").text("");
  $(".alerta_smsm_tipo_a_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_a").text("Ingrese el tipo de alimento");
    $(".alerta_smsm_tipo_a").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_a").text("");
    $(".alerta_smsm_tipo_a").hide(1000);
  }

  funcion = "registrar_tipo_a";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_tipo_alimento",
    data: { valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {
        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_alimento").val("");

        $("#mensaje_tipo_a_success").text(
          "El tipo de alimento se creo con exito"
        );
        $(".alerta_smsm_tipo_a_success").show(3000);
        tabla_tipo_a.ajax.reload();
      } else if (response == 2) {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_a").text(
          "El tipo de alimento: '" + valor + "', ya existe"
        );
        $(".alerta_smsm_tipo_a").show(1000);
      } else {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_a").text("Error:" + response);
        $(".alerta_smsm_tipo_a").show(1000);
      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

$("#tabla_tipo_a_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_a.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del alimento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_alimento_tipo(id, dato);
    }
  });
});

$("#tabla_tipo_a_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_a.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del alimento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_alimento_tipo(id, dato);
    }
  });
});

function cambiar_estado_alimento_tipo(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  funcion = "estado_alimento";

  $.ajax({
    url: "/alimento/acciones_tipo_alimento",
    type: "POST",
    data: { id: id, dato: dato, funcion: funcion },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_tipo_a.ajax.reload();
        return Swal.fire(
          "Estado tipo alimento",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado tipo alimento",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_tipo_a_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_a.row(this).data();
  }

  $("#mensaje_tipo_a_success").text("");
  $(".alerta_smsm_tipo_a_success").hide(1000);

  $("#mensaje_tipo_a").text("");
  $(".alerta_smsm_tipo_a").hide(1000);

  document.getElementById("id_tipo_a").value = data.id;
  document.getElementById("tipo_alimento").value = data.tipo_alimento;

  $("#unir_texto").text("Editar tipo de alimento");
  $("#btn_registrar").hide();
  $("#btn_editar").show();
  $("#btn_nuevo").show();
});

function editar_tipo_a() {
  var id = $("#id_tipo_a").val();
  var valor = $("#tipo_alimento").val();

  $("#mensaje_tipo_a_success").text("");
  $(".alerta_smsm_tipo_a_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_a").text("Ingrese el tipo de alimento");
    $(".alerta_smsm_tipo_a").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_a").text("");
    $(".alerta_smsm_tipo_a").hide(1000);
  }

  funcion = "editar_tipo_a";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_tipo_alimento",
    data: { id: id, valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {
        $(".card-dark").LoadingOverlay("hide");
        document.getElementById("id_tipo_a").value = "";
        $("#tipo_alimento").val("");

        $("#mensaje_tipo_a_success").text(
          "El tipo de alimento se edito con exito"
        );
        $(".alerta_smsm_tipo_a_success").show(3000);
        tabla_tipo_a.ajax.reload();

        $("#unir_texto").text("Registrar tipo alimento");
        $("#btn_registrar").show();
        $("#btn_editar").hide();
        $("#btn_nuevo").hide();
      } else if (response == 2) {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_a").text(
          "El tipo de alimento: '" + valor + "', ya existe"
        );
        $(".alerta_smsm_tipo_a").show(1000);
      } else {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_a").text("Error:" + response);
        $(".alerta_smsm_tipo_a").show(1000);
      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

/////////////////
///////////////MARCA DE ALIMENTO
function listar_marca_a() {
  tabla_marca_a = $("#tabla_marca_a_").DataTable({
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
      url: "/alimento/listar_marca_alimento",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el rol'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el rol'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "marca_alimento" },
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
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_marca_a.on("draw.dt", function () {
    var pageinfo = $("#tabla_marca_a_").DataTable().page.info();
    tabla_marca_a
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

function registra_marca_a() {
  var valor = $("#marca_alimento").val();

  $("#mensaje_marca_a_success").text("");
  $(".alerta_smsm_marca_a_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_marca_a").text("Ingrese la marca de alimento");
    $(".alerta_smsm_marca_a").show(3000);
    return false;
  } else {
    $("#mensaje_marca_a").text("");
    $(".alerta_smsm_marca_a").hide(1000);
  }

  funcion = "registrar_marca_a";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_marca_alimento",
    data: { valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {
        $(".card-dark").LoadingOverlay("hide");
        $("#marca_alimento").val("");

        $("#mensaje_marca_a_success").text(
          "El tipo de alimento se creo con exito"
        );
        $(".alerta_smsm_marca_a_success").show(3000);
        tabla_marca_a.ajax.reload();
      } else if (response == 2) {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_marca_a").text(
          "El tipo de alimento: '" + valor + "', ya existe"
        );
        $(".alerta_smsm_marca_a").show(1000);
      } else {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_marca_a").text("Error:" + response);
        $(".alerta_smsm_marca_a").show(1000);
      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

$("#tabla_marca_a_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_marca_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_marca_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_marca_a.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la marca se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_marca_tipo(id, dato);
    }
  });
});

$("#tabla_marca_a_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_marca_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_marca_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_marca_a.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la marca se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_marca_tipo(id, dato);
    }
  });
});

function cambiar_estado_marca_tipo(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  funcion = "estado_marca";

  $.ajax({
    url: "/alimento/acciones_marca_alimento",
    type: "POST",
    data: { id: id, dato: dato, funcion: funcion },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_marca_a.ajax.reload();
        return Swal.fire(
          "Estado de marca",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado de marca",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_marca_a_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_marca_a.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_marca_a.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_marca_a.row(this).data();
  }

  $("#mensaje_marca_a_success").text("");
  $(".alerta_smsm_marca_a_success").hide(1000);

  $("#mensaje_marca_a").text("");
  $(".alerta_smsm_marca_a").hide(1000);

  document.getElementById("id_marca_a").value = data.id;
  document.getElementById("marca_alimento").value = data.marca_alimento;

  $("#unir_texto").text("Editar marca de alimento");
  $("#btn_registrar").hide();
  $("#btn_editar").show();
  $("#btn_nuevo").show();
});

function editar_marca_a() {
  var id = $("#id_marca_a").val();
  var valor = $("#marca_alimento").val();

  $("#mensaje_marca_a_success").text("");
  $(".alerta_smsm_marca_a_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_marca_a").text("Ingrese el marca de alimento");
    $(".alerta_smsm_marca_a").show(3000);
    return false;
  } else {
    $("#mensaje_marca_a").text("");
    $(".alerta_smsm_marca_a").hide(1000);
  }

  funcion = "editar_marca_a";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_marca_alimento",
    data: { id: id, valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {
        $(".card-dark").LoadingOverlay("hide");
        document.getElementById("id_marca_a").value = "";
        $("#marca_alimento").val("");

        $("#mensaje_marca_a_success").text(
          "El marca de alimento se edito con exito"
        );
        $(".alerta_smsm_marca_a_success").show(3000);
        tabla_marca_a.ajax.reload();

        $("#unir_texto").text("Registrar marca alimento");
        $("#btn_registrar").show();
        $("#btn_editar").hide();
        $("#btn_nuevo").hide();
      } else if (response == 2) {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_marca_a").text(
          "La marca de alimento: '" + valor + "', ya existe"
        );
        $(".alerta_smsm_marca_a").show(1000);
      } else {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_marca_a").text("Error:" + response);
        $(".alerta_smsm_marca_a").show(1000);
      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

/////////////////////
//// registrar de alimento
function registrar_alimento() {
  var codigo = $("#codigo_alimento").val();
  var nombre = $("#nombre").val();
  var tipo = $("#tipo_id").val();
  var marca = $("#marca_id").val();
  var cantidad = $("#cantidad").val();
  var precio = $("#precio_c").val();
  var peso = $("#peso").val();
  var detalle = $("#detalle_a").val();

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    marca == 0 ||
    marca.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    peso < 0 ||
    peso.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_registro_alimento(
      codigo,
      nombre,
      tipo,
      marca,
      cantidad,
      precio,
      peso,
      detalle
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#codigo_oblig").html("");
    $("#nombre_obligg").html("");
    $("#tipo_obligg").html("");
    $("#marca_obligg").html("");
    $("#cantidad_obligg").html("");
    $("#precio_obligg").html("");
    $("#peso_obligg").html("");
    $("#detalle_obligg").html("");
  }

  var formdata = new FormData();
  var foto = $("#foto")[0].files[0];
  //est valores son como los que van en la data del ajax
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo);
  formdata.append("marca", marca);
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio);
  formdata.append("peso", peso);
  formdata.append("detalle", detalle);
  formdata.append("foto", foto);

  $.ajax({
    url: "/alimento/registrar_alimento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".card-success").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/alimento");

          return Swal.fire(
            "Alimento creado con exito",
            "El alimento se creo con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Codigo ya existe",
            "El codigo '" + codigo + "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear el alimento, falla en la matrix",
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
  return false;
}

function validar_registro_alimento(
  codigo,
  nombre,
  tipo,
  marca,
  cantidad,
  precio,
  peso,
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig").html("Ingrese codigo");
  } else {
    $("#codigo_oblig").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre del alimento");
  } else {
    $("#nombre_obligg").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg").html("Ingrese el tipo");
  } else {
    $("#tipo_obligg").html("");
  }

  if (marca == 0 || marca.trim() == "") {
    $("#marca_obligg").html("Ingrese la marca");
  } else {
    $("#marca_obligg").html("");
  }

  if (cantidad < 0 || cantidad.trim() == "") {
    $("#cantidad_obligg").html("Ingrese la cantidad");
  } else {
    $("#cantidad_obligg").html("");
  }

  if (precio < 0 || precio.trim() == "") {
    $("#precio_obligg").html("Ingrese el precio");
  } else {
    $("#precio_obligg").html("");
  }

  if (peso < 0 || peso.trim() == "") {
    $("#peso_obligg").html("Ingrese el peso");
  } else {
    $("#peso_obligg").html("");
  }

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg").html("Ingrese el detalle del alimento");
  } else {
    $("#detalle_obligg").html("");
  }
}

function listado_alimento_cerdo() {
  tabla_alimento = $("#tabla_alimento").DataTable({
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
      url: "/alimento/listar_alimentos",
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
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el cerdo'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='photo btn btn-outline-warning' title='foto del cerdo'><i class='fa fa-image' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "codigo" },
      { data: "nombre" },
      { data: "tipo_alimento" },
      { data: "marca_alimento" },
      {
        data: "foto",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return (
            "<img class='img-circle' src='static/uploads/alimento/" +
            data +
            "' width='50px' />"
          );
        },
      },
      { data: "cantidad" },
      { data: "precio" },

      {
        data: "peso",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return data + " Kg";
        },
      },

      { data: "detalle" },
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
  tabla_alimento.on("draw.dt", function () {
    var pageinfo = $("#tabla_alimento").DataTable().page.info();
    tabla_alimento
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_alimento").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_alimento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_alimento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_alimento.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del alimento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_alimento(id, dato);
    }
  });
});

$("#tabla_alimento").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_alimento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_alimento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_alimento.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del alimento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_alimento(id, dato);
    }
  });
});

function cambiar_estado_alimento(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/alimento/estado_alimento",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_alimento.ajax.reload();
        return Swal.fire(
          "Estado alimento",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado alimento",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_alimento").on("click", ".photo", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_alimento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_alimento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_alimento.row(this).data();
  }

  var id = data.id;
  var foto = data.foto;

  $("#id_cerdo_foto").val(id);
  $("#foto_actu_c").val(foto);
  $("#img_cerdo").attr("src", "static/uploads/alimento/" + foto);

  $("#foto_new_c").val("");

  $("#modal_editar_foto_cerdo").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_foto_cerdo").modal("show");
});

function editar_foto_alimento() {
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
    url: "/alimento/cambiar_foto_alimento",
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
          tabla_alimento.ajax.reload();
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

$("#tabla_alimento").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_alimento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_alimento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_alimento.row(this).data();
  }

  $("#id_Alimento_editt").val(data.id);
  $("#codigo_alimento_edi").val(data.codigo);
  $("#nombre_edi").val(data.nombre);
  $("#tipo_id_edi").val(data.tipo_id).trigger("change");
  $("#marca_id_edi").val(data.marca_id).trigger("change");
  $("#cantidad_edi").val(data.cantidad);
  $("#precio_c_edi").val(data.precio);
  $("#peso_edi").val(data.peso);
  $("#detalle_a_edi").val(data.detalle);

  $("#codigo_oblig_edi").html("");
  $("#nombre_obligg_edi").html("");
  $("#tipo_obligg_edi").html("");
  $("#marca_obligg_edi").html("");
  $("#cantidad_obligg_edi").html("");
  $("#precio_obligg_edi").html("");
  $("#peso_obligg_edi").html("");
  $("#detalle_obligg_edi").html("");

  $("#modal_editar_alimento").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_alimento").modal("show");
});

function editar_alimento() {
  var id = $("#id_Alimento_editt").val();
  var codigo = $("#codigo_alimento_edi").val();
  var nombre = $("#nombre_edi").val();
  var tipo = $("#tipo_id_edi").val();
  var marca = $("#marca_id_edi").val();
  var cantidad = $("#cantidad_edi").val();
  var precio = $("#precio_c_edi").val();
  var peso = $("#peso_edi").val();
  var detalle = $("#detalle_a_edi").val();

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    marca == 0 ||
    marca.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    peso < 0 ||
    peso.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_editar_alimento(
      codigo,
      nombre,
      tipo,
      marca,
      cantidad,
      precio,
      peso,
      detalle
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#codigo_oblig_edi").html("");
    $("#nombre_obligg_edi").html("");
    $("#tipo_obligg_edi").html("");
    $("#marca_obligg_edi").html("");
    $("#cantidad_obligg_edi").html("");
    $("#precio_obligg_edi").html("");
    $("#peso_obligg_edi").html("");
    $("#detalle_obligg_edi").html("");
  }

  var formdata = new FormData(); 
  //est valores son como los que van en la data del ajax
  formdata.append("id", id);
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo);
  formdata.append("marca", marca);
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio);
  formdata.append("peso", peso);
  formdata.append("detalle", detalle); 

  $.ajax({
    url: "/alimento/editar_alimento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".bg-primary").LoadingOverlay("hide");          
          $("#modal_editar_alimento").modal("hide");
          tabla_alimento.ajax.reload();

          return Swal.fire(
            "Alimento editado con exito",
            "El alimento se edito con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".bg-primary").LoadingOverlay("hide");
          return Swal.fire(
            "Codigo ya existe",
            "El codigo '" + codigo + "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".bg-primary").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el alimento, falla en la matrix",
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

function validar_editar_alimento(
  codigo,
  nombre,
  tipo,
  marca,
  cantidad,
  precio,
  peso,
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig_edi").html("Ingrese codigo");
  } else {
    $("#codigo_oblig_edi").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg_edi").html("Ingrese nombre del alimento");
  } else {
    $("#nombre_obligg_edi").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg_edi").html("Ingrese el tipo");
  } else {
    $("#tipo_obligg_edi").html("");
  }

  if (marca == 0 || marca.trim() == "") {
    $("#marca_obligg_edi").html("Ingrese la marca");
  } else {
    $("#marca_obligg_edi").html("");
  }

  if (cantidad < 0 || cantidad.trim() == "") {
    $("#cantidad_obligg_edi").html("Ingrese la cantidad");
  } else {
    $("#cantidad_obligg_edi").html("");
  }

  if (precio < 0 || precio.trim() == "") {
    $("#precio_obligg_edi").html("Ingrese el precio");
  } else {
    $("#precio_obligg_edi").html("");
  }

  if (peso < 0 || peso.trim() == "") {
    $("#peso_obligg_edi").html("Ingrese el peso");
  } else {
    $("#peso_obligg_edi").html("");
  }

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg_edi").html("Ingrese el detalle del alimento");
  } else {
    $("#detalle_obligg_edi").html("");
  }
}

//////////////////
//////////// tipo de alimentacion
function listar_tipo_alimentacion() {
  tabla_tipo_alimentacion = $("#tabla_tipo_alimentacion").DataTable({
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
      url: "/alimento/listar_tipo_alimentacion",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el rol'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el rol'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el rol'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "tipo" },
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
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_tipo_alimentacion.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_alimentacion").DataTable().page.info();
    tabla_tipo_alimentacion
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

function registra_tipo_alimentacion() {
  var valor = $("#tipo_alimentacion").val();

  $("#mensaje_tipo_alimentacion_success").text("");
  $(".alerta_sms_tipo_alimentacion_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_alimentacion").text("Ingrese el tipo de alimentación");
    $(".alerta_sms_tipo_alimentacion").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_alimentacion").text("");
    $(".alerta_sms_tipo_alimentacion").hide(1000);
  }

  funcion = "registrar_tipo_alimentacion";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_tipo_alimentacionn",
    data: { valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {

        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_alimentacion").val("");

        $("#mensaje_tipo_alimentacion_success").text(
          "El tipo de alimento se creo con exito"
        );
        $(".alerta_sms_tipo_alimentacion_success").show(3000);
        tabla_tipo_alimentacion.ajax.reload();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_alimentacion").text(
          "El tipo de alimentación: '" + valor + "', ya existe"
        );
        $(".alerta_sms_tipo_alimentacion").show(1000);

      } else {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_alimentacion").text("Error:" + response);
        $(".alerta_sms_tipo_alimentacion").show(1000);

      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

$("#tabla_tipo_alimentacion").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_alimentacion.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_alimentacion.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_alimentacion.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo alimentación se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_alimentacion(id, dato);
    }
  });
});

$("#tabla_tipo_alimentacion").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_alimentacion.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_alimentacion.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_alimentacion.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo alimentación se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_alimentacion(id, dato);
    }
  });
});

function cambiar_estado_tipo_alimentacion(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  funcion = "estado_alimentacion";

  $.ajax({
    url: "/alimento/acciones_tipo_alimentacionn",
    type: "POST",
    data: { id: id, dato: dato, funcion: funcion },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_tipo_alimentacion.ajax.reload();
        return Swal.fire(
          "Estado de marca",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado de marca",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_tipo_alimentacion").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_alimentacion.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_alimentacion.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_alimentacion.row(this).data();
  }

  $("#mensaje_tipo_alimentacion_success").text("");
  $(".alerta_sms_tipo_alimentacion_success").hide(1000);

  $("#mensaje_tipo_alimentacion").text("");
  $(".alerta_sms_tipo_alimentacion").hide(1000);

  document.getElementById("id_tipo_alimentacion").value = data.id;
  document.getElementById("tipo_alimentacion").value = data.tipo;

  $("#unir_texto_a").text("Editar tipo de alimentación");
  $("#btn_registrar").hide();
  $("#btn_editar").show();
  $("#btn_nuevo").show();
});

function editar_tipo_alimentacion() {
  var id = $("#id_tipo_alimentacion").val();
  var valor = $("#tipo_alimentacion").val();

  $("#mensaje_tipo_alimentacion_success").text("");
  $(".alerta_sms_tipo_alimentacion_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_alimentacion").text("Ingrese el tipo de alimentación");
    $(".alerta_sms_tipo_alimentacion").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_alimentacion").text("");
    $(".alerta_sms_tipo_alimentacion").hide(1000);
  }

  funcion = "editar_tipo_alimentacion";

  $.ajax({
    type: "POST",
    url: "/alimento/acciones_tipo_alimentacionn",
    data: { id: id, valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {
        $(".card-dark").LoadingOverlay("hide");
        document.getElementById("tipo_alimentacion").value = "";
        $("#id_tipo_alimentacion").val("");

        $("#mensaje_tipo_alimentacion_success").text(
          "El tipo de alimentación se edito con exito"
        );
        $(".alerta_sms_tipo_alimentacion_success").show(3000);

        tabla_tipo_alimentacion.ajax.reload();

        $("#unir_texto_a").text("Registrar tipo alimentación");
        $("#btn_registrar").show();
        $("#btn_editar").hide();
        $("#btn_nuevo").hide();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_alimentacion").text(
          "El tipo de alimentación: '" + valor + "', ya existe"
        );
        $(".alerta_sms_tipo_alimentacion").show(1000);

      } else {
        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_alimentacion").text("Error:" + response);
        $(".alerta_sms_tipo_alimentacion").show(1000);
      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

///////////////// alimentacion del cerdo
function registrar_alimentacion_cerdo_comer(){
  Swal.fire({
    title: 'Guardar alimentación?',
    text: "La alimentación se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_la_alimentacion();
    }
  })
}

function guardar_la_alimentacion(){
  var alimento_id = $("#alimento").val();
  var tipo_id = $("#tipo_alimentacion").val();
  var fecha_c = $("#fecha_c").val();
  var cantidad_sacos = $("#cantidad_sacos").val();
  var observacion = $("#observacion").val(); 
  var numero_sacos = $("#numero_sacos").val(); 
  var count = 0;

  if (
    alimento_id.length == 0 ||
    alimento_id == "0" ||
    tipo_id.length == 0 ||
    tipo_id == "0" ||
    fecha_c.length == 0 ||
    fecha_c.trim() == "0" ||
    cantidad_sacos.length == 0 ||
    cantidad_sacos.trim() == "0" ||
    observacion.length == 0 ||
    observacion.trim() == ""
  ) {
    valida_registro_alimentacion(
      alimento_id,
      tipo_id,
      fecha_c,
      cantidad_sacos,
      observacion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else { 
    $("#alimento_obligg").html("");
    $("#tipo_alimentacion_obligg").html("");
    $("#fecha_c_obligg").html("");
    $("#cantidad_obligg").html("");
    $("#observacion_obligg").html("");
  }

  $("#tabla_detalle_cerdos tbody#tbody_tabla_detalle_cerdos tr").each(function () {
    count++;
    }
  );

  if(count == 0){ 
    $("#unir_no_c").html('<span class="badge badge-danger"><b>.:No hay cerdo en el detalle de alimentación:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay cerdo en el detalle de alimentación",
      "warning"
    );
  }else{
    $("#unir_no_c").html("");
  }

  if(parseInt(cantidad_sacos) > parseInt(numero_sacos)){
    $("#numero_sacos_obligg").html("Sacos insuficiente");
    $("#cantidad_obligg").html("Cantidad supera los sacos disponible");
    return swal.fire(
      "Cantidad",
      "La cantidad ingresada supera los sacos disponibles de alimento",
      "warning"
    );
  }else{
    $("#numero_sacos_obligg").html("");
    $("#cantidad_obligg").html("");
  }

  var formdata = new FormData();
  formdata.append("alimento_id", alimento_id);
  formdata.append("tipo_id", tipo_id);
  formdata.append("fecha_c", fecha_c);
  formdata.append("cantidad_sacos", cantidad_sacos);
  formdata.append("observacion", observacion); 

  $.ajax({
    url: "/alimento/guardar_la_alimentacion",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) { 
          guardar_detalle_alimentacion(parseInt(resp)); 
      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo guardar el registro, falla en la matrix",
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
  return false;
}

function valida_registro_alimentacion(
  alimento_id,
  tipo_id,
  fecha_c,
  cantidad_sacos,
  observacion 
) {
  if (alimento_id.length == 0 || alimento_id == "0") {
    $("#alimento_obligg").html("Seleccione el alimento");
  } else {
    $("#alimento_obligg").html("");
  }

  if (tipo_id.length == 0 || tipo_id == "0") {
    $("#tipo_alimentacion_obligg").html("Seleccione el tipo alimentación");
  } else {
    $("#tipo_alimentacion_obligg").html("");
  }

  if (fecha_c.length == 0 || fecha_c.trim() == "") {
    $("#fecha_c_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_c_obligg").html("");
  }

  if (cantidad_sacos.length == 0 || cantidad_sacos.trim() == "") {
    $("#cantidad_obligg").html("Ingrese la cantidad");
  } else {
    $("#cantidad_obligg").html("");
  }

  if (observacion.length == 0 || observacion.trim() == "") {
    $("#observacion_obligg").html("Ingrese la observación");
  } else {
    $("#observacion_obligg").html("");
  }
}

function guardar_detalle_alimentacion(id){
  var count = 0;
  var arrego_cerdo_id = new Array();
  var arreglo_peso = new Array(); 

  $("#tabla_detalle_cerdos tbody#tbody_tabla_detalle_cerdos tr").each(
    function () {
      arrego_cerdo_id.push($(this).find("td").eq(0).text());
      arreglo_peso.push($(this).find("td").eq(3).text()); 
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var idc = arrego_cerdo_id.toString();
  var peso = arreglo_peso.toString(); 

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/alimento/guardar_detalle_alimentacion",
    type: "POST",
    data: { 
      id: id,
      idc: idc,
      peso: peso, 
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        Swal.fire({
          title: "Registro realizada con exito",
          text: "Desea imprimir la alimentación??",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Imprimir!!",
        }).then((result) => {
          if (result.value) {
            window.open("/reporte/reporte_alimentacion/" + parseInt(id) + "#zoom=100%", "Reporte de alimentación","scrollbards=No");
            cargar_contenido('contenido_principal','/alimentacion_cerdos');
          }
        });
        cargar_contenido('contenido_principal','/alimentacion_cerdos');
      }
    } else {

      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de alimentación, falla en la matrix",
        "error"
      );

    }
  });
}

/////////////////
////////////// para el peso del cerdo
function registrar_peso_cerdo(){
  Swal.fire({
    title: 'Guardar peso del cerdo?',
    text: "El pesaje del cerdo se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_pesaje_cerdo();
    }
  })
}

function guardar_pesaje_cerdo(){
  var cerdo_id = $("#cerdo_p").val();
  var fecha_c = $("#fecha_c").val();
  var metodo = $("#metodo").val();
  var estado_c = $("#estado_c").val();
  var observacion = $("#observacion").val(); 
  var peso_actual = $("#peso_actual").val(); 

  var p_b = $("#nuevo_pesaje").val(); 
  var p_t = $("#perimetro_t").val();
  var l_c = $("#largo_c").val(); 
  var p_v = $("#peso_v").val(); 

  if (
    cerdo_id.length == 0 ||
    cerdo_id == "0" ||
    fecha_c.length == 0 ||
    fecha_c.trim() == "" ||  
    observacion.length == 0 ||
    observacion.trim() == ""
  ) {
    validar_pesaje(
      cerdo_id,
      fecha_c,
      observacion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else { 
    $("#cerdo_p_obligg").html(""); 
    $("#fecha_c_obligg").html(""); 
    $("#observacion_obligg").html("");
  }

  if (metodo == "vivo") { 

    if (p_t.length == 0 || p_t.trim() == "") {
      $("#perimetro_t_obligg").html("Ingrese perimetro toracico");
      return swal.fire(
          "Mensaje de advertencia",
          "Ingrese perimetro toracico",
          "warning"
      );
    }else if (l_c.length == 0 || l_c.trim() == "") {
      $("#perimetro_t_obligg").html("");
      $("#largo_c_obligg").html("Ingrese largo de cuerpo");
      return swal.fire(
          "Mensaje de advertencia",
          "Ingrese largo de cuerpo",
          "warning"
      );
    }else if (p_v.length == 0 || p_v.trim() == "") {
      $("#perimetro_t_obligg").html("");
      $("#largo_c_obligg").html("");
      $("#peso_v_obligg").html("No hay cálculo del peso vivo");
      return swal.fire(
          "Mensaje de advertencia",
          "No hay cálculo del peso vivo",
          "warning"
      );
    }else{
      $("#perimetro_t_obligg").html("");
      $("#largo_c_obligg").html("");
      $("#peso_v_obligg").html("");
    }

  } else { 

    if (p_b.length == 0 || p_b.trim() == "") {
      $("#nuevo_pesaje_obligg").html("Ingrese el peso de báscula");
      return swal.fire(
          "Mensaje de advertencia",
          "Ingrese el peso de báscula",
          "warning"
      );
    }else{
      $("#nuevo_pesaje_obligg").html("");
    }

  }

  var formdata = new FormData();
  formdata.append("cerdo_id", cerdo_id);
  formdata.append("fecha_c", fecha_c);
  formdata.append("metodo", metodo);
  formdata.append("estado_c", estado_c);
  formdata.append("observacion", observacion); 

  formdata.append("peso_actual", peso_actual);
  formdata.append("p_b", p_b);
  formdata.append("p_t", p_t); 
  formdata.append("l_c", l_c);
  formdata.append("p_v", p_v); 

  $.ajax({
    url: "/alimento/guardar_pesaje_cerdo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) { 
        
        if (resp == 1) {
          $(".card-success").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/peso_cerdo");
          return Swal.fire(
            "Registro exitoso",
            "El peso del cerdo se registro con exito",
            "success"
          );
        }
         
      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo guardar el registro, falla en la matrix",
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
  return false;
}

function validar_pesaje(
  cerdo_id,
  fecha_c,
  observacion 
) {
  if (cerdo_id.length == 0 || cerdo_id == "0") {
    $("#cerdo_p_obligg").html("Seleccione el cerdo");
  } else {
    $("#cerdo_p_obligg").html("");
  }

  if (fecha_c.trim().length == 0 || fecha_c.trim() == "") {
    $("#fecha_c_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_c_obligg").html("");
  }

  if (observacion.length == 0 || observacion.trim() == "") {
    $("#observacion_obligg").html("Ingrese la observación");
  } else {
    $("#observacion_obligg").html("");
  }
}

/// seguimiento peso del cerdo
$("#cerdo_se").on("change", function(){
   var id = $(this).val();

  $.ajax({
    url: "/alimento/traer_pesos_cerdo",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) { 
      $('#tbala_seguimento_peso').DataTable().destroy();
      $(".select_cerdo_seguir").LoadingOverlay("hide");
      if(resp != 0){
          let count = 0;   
          var llenat = "";
          var metodo = "";
          var estado = "";
          var pb = "";
          var pv = "";
          resp['data'].forEach((row) => {  
            count++;

            if (row["metodo"] == "exacto")
            { 
              metodo = '<span style="font-size: 13px;" class="badge badge-success">Peso exacto (Bascula)</span>';
            } else {
              metodo = '<span style="font-size: 13px;" class="badge badge-warning">Peso vivo aproximado</span>';
            }

            if (row["estado_cerdo"] == 'd_flaco')
            {
              estado = '<span style="font-size: 13px;" class="badge badge-danger">Demasiado flaco</span>';
            }         
            else if (row["estado_cerdo"] == 'flaco')
            {
              estado = '<span style="font-size: 13px;" class="badge badge-warning">Flaco</span>';
            }        
            else if (row["estado_cerdo"] == 'gordo') {
              estado = '<span style="font-size: 13px;" class="badge badge-info">Gordo</span>';
            }        
            else{
              estado = '<span style="font-size: 13px;" class="badge badge-success">Demasiado Gordo</span>';
            } 

            if (row["metodo"] == 'exacto'){
              pb = '<span style="font-size: 13px;" class="badge badge-success">'+ row['peso_b'] +' Kg</span>';
            } else{
              pb = '<span style="font-size: 13px;" class="badge badge-warning">0 Kg</span>';
            }
          
            if (row["metodo"]  == 'vivo'){
              pv = '<span style="font-size: 13px;" class="badge badge-success">'+ row['p_v'] +' Kg</span>';
            } else{
              pv = '<span style="font-size: 13px;" class="badge badge-warning">0 Kg</span>';
            }      
        
            llenat += `<tr>
                        <td> ${count}  </td>
                        <td> ${row["fecha"]} </td>
                        <td> ${metodo} </td>                    
                        <td> ${estado} </td>                   
                        <td> <span style="font-size: 13px;" class="badge badge-dark"> ${row["peso_a"]} Kg</span> </td>
                        <td> ${pb}  </td>
                        <td> ${pv}  </td>
                        <td> ${row["observacion"]} </td>   
                      </tr>`;
            
            $("#tbody_detalle_seguimiento_alimentacion").html(llenat);
            
          }); 
      }else{
        $('#tbody_detalle_seguimiento_alimentacion').empty();
      }
      Crear_tabla_seguiminto();
    },

    beforeSend: function () {
        $(".select_cerdo_seguir").LoadingOverlay("show", {
          text: "Cargando..."});
      },
  });

});

/// seguimiento alimento del cerdo 
$("#cerdo_aliemntacion").on("change", function(){
  var id = $(this).val();

 $.ajax({
   url: "/alimento/traer_alimentos_del_cerdo",
   type: "POST", 
   data: {id: id}, 
   success: function (resp) {
     $('#tbala_seguimento_alimento').DataTable().destroy();
     $(".select_cerdo_alimento").LoadingOverlay("hide");
     if(resp != 0){
         let count = 0; 
         var llenat = ""; 
         resp['data'].forEach((row) => {  
           count++;   
           llenat += `<tr>
                       <td> ${count}  </td>
                       <td> ${row["fecha"]} </td>
                       <td> <span style="font-size: 13px;" class="badge badge-info">${row["tipo_alimentcion"]}</span>  </td> 
                       <td> ${row["alimento"]} </td>            
                       <td> ${row["observacion"]} </td>   
                     </tr>`;           
           $("#tbody_detalle_seguimento_alimento").html(llenat);           
         }); 
     }else{
       $('#tbody_detalle_seguimento_alimento').empty();
     }
     Crear_tabla_seguiminto_alimento();
   },

   beforeSend: function () {
       $(".select_cerdo_alimento").LoadingOverlay("show", {
         text: "Cargando..."});
     },
 });

})

function eliminar_peso_cerdo(id){
  Swal.fire({
    title: "Eliminar peso del cerdo?",
    text: "El peso del cerdo se borrará del sistema!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({
        type: "POST",
        url: "/alimento/eliminar_peso",
        data: { id: id},
        success: function (response) {
          if (response == 1) {

            cargar_contenido('contenido_principal','/peso_cerdo');
            $(".card-info").LoadingOverlay("hide");
            return Swal.fire(
              "Peso eliminado",
              "El peso del cerdo se elimino",
              "success"
            );
            
          } else {

            $(".card-info").LoadingOverlay("hide");
            return Swal.fire(
              "Error",
              "No se pudo eliminar el peso, falla en la matrix",
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


 
