var tabla_veterinario, tabla_enfermedad, tabla_tipo_tratamiento;

function registrar_veterinario() {
  var nombre = $("#nombres").val();
  var apellido = $("#apellidos").val();
  var numero_doc = $("#numero_doc").val();
  var telefono = $("#telefono").val();
  var direccion = $("#direccion").val();
  var sucursal = $("#sucursal").val();

  if (
    nombre.trim() == "" ||
    apellido.trim() == "" ||
    numero_doc.trim() == "" ||
    telefono.trim() == "" ||
    direccion.trim() == "" ||
    sucursal.trim() == ""
  ) {
    validar_registro_veterinario(
      nombre,
      apellido,
      numero_doc,
      telefono,
      direccion,
      sucursal
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_obligg").html("");
    $("#apellido_obligg").html("");
    $("#numero_doc_obligg").html("");
    $("#telefono_obligg").html("");
    $("#direccion_obligg").html("");
    $("#sucursal_obligg").html("");
  }

  var formdata = new FormData();
  formdata.append("nombre", nombre);
  formdata.append("apellido", apellido);
  formdata.append("numero_doc", numero_doc);
  formdata.append("telefono", telefono);
  formdata.append("direccion", direccion);
  formdata.append("sucursal", sucursal);

  $.ajax({
    url: "/enfermedad/registrar_veterinario",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          
          $(".card-success").LoadingOverlay("hide"); 
          cargar_contenido('contenido_principal','/veterinario');
          return Swal.fire(
            "Veterinario creado con exito",
            "El veterinariordo se creo con exito",
            "success"
          );

        } else {

          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Número de documento ya existe",
            "El número de documento '" + numero_doc + "', ya existe en el sistema",
            "warning"
          );

        }  
      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear el veterinario, falla en la matrix",
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

function validar_registro_veterinario(
  nombre,
  apellido,
  numero_doc,
  telefono,
  direccion,
  sucursal
) {
  if (nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre");
  } else {
    $("#nombre_obligg").html("");
  }

  if (apellido.trim() == "") {
    $("#apellido_obligg").html("Ingrese apellido");
  } else {
    $("#apellido_obligg").html("");
  }

  if (numero_doc.trim() == "") {
    $("#numero_doc_obligg").html("Ingrese el documento");
  } else {
    $("#numero_doc_obligg").html("");
  }

  if (telefono.trim() == "") {
    $("#telefono_obligg").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg").html("");
  }

  if (direccion.trim() == "") {
    $("#direccion_obligg").html("Ingrese la dirección");
  } else {
    $("#direccion_obligg").html("");
  }

  if (sucursal.trim() == "") {
    $("#sucursal_obligg").html("Ingrese la sucursalo");
  } else {
    $("#sucursal_obligg").html("");
  }
}

function listar_veterinario() {
  tabla_veterinario = $("#tabla_veterinario").DataTable({
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
      url: "/enfermedad/listar_veterinario",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el cerdo'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el cerdo'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "nombre" },
      { data: "apellido" },
      { data: "telefono" },
      { data: "direccion" }, 
      { data: "sucursal" },
      { data: "documento" }, 
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
  tabla_veterinario.on("draw.dt", function () {
    var pageinfo = $("#tabla_veterinario").DataTable().page.info();
    tabla_veterinario
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_veterinario").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_veterinario.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_veterinario.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_veterinario.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del veterinario se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_veterinario(id, dato);
    }
  });
});

$("#tabla_veterinario").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_veterinario.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_veterinario.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_veterinario.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del veterinario se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_veterinario(id, dato);
    }
  });
});

function cambiar_estado_veterinario(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/enfermedad/estado_veterinario",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {

    if (response > 0) {
      if (response == 1) {
        tabla_veterinario.ajax.reload();
        return Swal.fire(
          "Estado veterinario",
          "EL estado se " + res + " con extio",
          "success"
        );
      }

    } else {
      return Swal.fire(
        "Estado veterinario",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_veterinario").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_veterinario.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_veterinario.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_veterinario.row(this).data();
  }

  $("#id_veterinario").val(data.id);
  $("#nombres_edit").val(data.nombre);
  $("#apellidos_edit").val(data.apellido);
  $("#numero_doc_edit").val(data.documento);
  $("#telefono_edit").val(data.telefono);
  $("#direccion_edit").val(data.direccion);
  $("#sucursal_edit").val(data.sucursal); 

  $("#nombre_obligg_edit").html("");
  $("#apellido_obligg_edit").html("");
  $("#numero_doc_obligg_edit").html("");
  $("#telefono_obligg_edit").html("");
  $("#direccion_obligg_edit").html("");
  $("#sucursal_obligg_edit").html("");

  $("#modal_editar_veterinario").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_veterinario").modal("show");
});

function editar_veterinario() {
  var id = $("#id_veterinario").val();
  var nombre = $("#nombres_edit").val();
  var apellido = $("#apellidos_edit").val();
  var numero_doc = $("#numero_doc_edit").val();
  var telefono = $("#telefono_edit").val();
  var direccion = $("#direccion_edit").val();
  var sucursal = $("#sucursal_edit").val();

  if (
    nombre.trim() == "" ||
    apellido.trim() == "" ||
    numero_doc.trim() == "" ||
    telefono.trim() == "" ||
    direccion.trim() == "" ||
    sucursal.trim() == ""
  ) {
    validar_editar_veterinario(
      nombre,
      apellido,
      numero_doc,
      telefono,
      direccion,
      sucursal
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#nombre_obligg_edit").html("");
    $("#apellido_obligg_edit").html("");
    $("#numero_doc_obligg_edit").html("");
    $("#telefono_obligg_edit").html("");
    $("#direccion_obligg_edit").html("");
    $("#sucursal_obligg_edit").html("");
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("nombre", nombre);
  formdata.append("apellido", apellido);
  formdata.append("numero_doc", numero_doc);
  formdata.append("telefono", telefono);
  formdata.append("direccion", direccion);
  formdata.append("sucursal", sucursal);

  $.ajax({
    url: "/enfermedad/editarr_veterinario",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          
          $(".bg-primary").LoadingOverlay("hide"); 
          $("#modal_editar_veterinario").modal("hide");
          tabla_veterinario.ajax.reload();
          return Swal.fire(
            "Veterinario editado con exito",
            "El veterinariordo se edito con exito",
            "success"
          );

        } else {

          $(".bg-primary").LoadingOverlay("hide");
          return Swal.fire(
            "Número de documento ya existe",
            "El número de documento '" + numero_doc + "', ya existe en el sistema",
            "warning"
          );

        }  
      } else {

        $(".bg-primary").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el veterinario, falla en la matrix",
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

function validar_editar_veterinario(
  nombre,
  apellido,
  numero_doc,
  telefono,
  direccion,
  sucursal
) {
  if (nombre.trim() == "") {
    $("#nombre_obligg_edit").html("Ingrese nombre");
  } else {
    $("#nombre_obligg_edit").html("");
  }

  if (apellido.trim() == "") {
    $("#apellido_obligg_edit").html("Ingrese apellido");
  } else {
    $("#apellido_obligg_edit").html("");
  }

  if (numero_doc.trim() == "") {
    $("#numero_doc_obligg_edit").html("Ingrese el documento");
  } else {
    $("#numero_doc_obligg_edit").html("");
  }

  if (telefono.trim() == "") {
    $("#telefono_obligg_edit").html("Ingrese el telefono");
  } else {
    $("#telefono_obligg_edit").html("");
  }

  if (direccion.trim() == "") {
    $("#direccion_obligg_edit").html("Ingrese la dirección");
  } else {
    $("#direccion_obligg_edit").html("");
  }

  if (sucursal.trim() == "") {
    $("#sucursal_obligg_edit").html("Ingrese la sucursalo");
  } else {
    $("#sucursal_obligg_edit").html("");
  }
}

//// enfermedades
function registrar_tipo_enfermedad() {
  var nombre = $("#enfermedad").val();
  var descripcion = $("#descripcion").val(); 

  if (
    nombre.trim() == "" ||
    descripcion.trim() == ""  
  ) {
    validar_registro_enfermedad(
      nombre,
      descripcion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#enfermedad_obligg").html("");
    $("#descripcion_obligg").html(""); 
  }

  var formdata = new FormData();
  formdata.append("nombre", nombre);
  formdata.append("descripcion", descripcion); 

  $.ajax({
    url: "/enfermedad/registrar_tipo_enfermedad",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {

        if (resp == 1) {
          
          $(".card-success").LoadingOverlay("hide"); 
          cargar_contenido('contenido_principal','/tipo_enfermedad');
          return Swal.fire(
            "Enfermedad creado con exito",
            "La enfermedad se creo con exito",
            "success"
          );

        } else {

          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Enfermedad ya existe",
            "La enfermedad '" + nombre + "', ya existe en el sistema",
            "warning"
          );

        }  

      } else {

        $(".card-success").LoadingOverlay("hide");

        return Swal.fire(
          "Error",
          "No se pudo crear la enfermedad, falla en la matrix",
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

function validar_registro_enfermedad(
  nombre,
  descripcion 
) {
  if (nombre.trim() == "") {
    $("#enfermedad_obligg").html("Ingrese enfermedad");
  } else {
    $("#enfermedad_obligg").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_obligg").html("Ingrese descripción");
  } else {
    $("#descripcion_obligg").html("");
  }

}

function listar_enfermedad() {
  tabla_enfermedad = $("#tabla_enfermedad").DataTable({
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
      url: "/enfermedad/listar_enfermedad",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el cerdo'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el cerdo'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "nombre" },
      { data: "descripcion" }, 
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
  tabla_enfermedad.on("draw.dt", function () {
    var pageinfo = $("#tabla_enfermedad").DataTable().page.info();
    tabla_enfermedad
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_enfermedad").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_enfermedad.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_enfermedad.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_enfermedad.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la enfermedad se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_enfermedad(id, dato);
    }
  });
});

$("#tabla_enfermedad").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_enfermedad.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_enfermedad.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_enfermedad.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de la enfermedad se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_enfermedad(id, dato);
    }
  });
});

function cambiar_estado_enfermedad(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/enfermedad/estado_enfermedad",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_enfermedad.ajax.reload();
        return Swal.fire(
          "Estado enfermedad",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado enfermedad",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_enfermedad").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_enfermedad.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_enfermedad.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_enfermedad.row(this).data();
  }

  $("#enfermedad_obligg_edit").html("");
  $("#descripcion_obligg_edit").html(""); 

  document.getElementById("id_enfermedad").value = data.id;
  document.getElementById("enfermedad_edit").value = data.nombre; 
  document.getElementById("descripcion_edit").value = data.descripcion; 

  $("#modal_editar_enfermedad").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_enfermedad").modal("show");
});

function editar_enfermedad() {
  var id = $("#id_enfermedad").val();
  var nombre = $("#enfermedad_edit").val();
  var descripcion = $("#descripcion_edit").val(); 

  if (
    nombre.trim() == "" ||
    descripcion.trim() == ""  
  ) {
    validar_editar_enfermedad(
      nombre,
      descripcion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#descripcion_obligg_edit").html("");
    $("#descripcion_obligg_edit").html(""); 
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("nombre", nombre);
  formdata.append("descripcion", descripcion); 

  $.ajax({
    url: "/enfermedad/editar_tipo_enfermedad",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {

        if (resp == 1) {
          
          $(".modal-lg").LoadingOverlay("hide"); 
          $("#modal_editar_enfermedad").modal("hide");
          tabla_enfermedad.ajax.reload();

          return Swal.fire(
            "Enfermedad editada con exito",
            "La enfermedad se edito con exito",
            "success"
          );

        } else {

          $(".modal-lg").LoadingOverlay("hide");
          return Swal.fire(
            "Enfermedad ya existe",
            "La enfermedad '" + nombre + "', ya existe en el sistema",
            "warning"
          );

        }  

      } else {

        $(".modal-lg").LoadingOverlay("hide");

        return Swal.fire(
          "Error",
          "No se pudo crear la enfermedad, falla en la matrix",
          "error"
        );

      }

    },

    beforeSend: function () {
      $(".modal-lg").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },

  });
  return false;
}

function validar_editar_enfermedad(
  nombre,
  descripcion 
) {
  if (nombre.trim() == "") {
    $("#enfermedad_obligg_edit").html("Ingrese enfermedad");
  } else {
    $("#enfermedad_obligg_edit").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_obligg_edit").html("Ingrese descripción");
  } else {
    $("#descripcion_obligg_edit").html("");
  }

}

//// tipo tratamiento
function registrar_tipo_tratamientos() {
  var nombre = $("#tratamiento").val();
  var descripcion = $("#descripcion").val(); 

  if (
    nombre.trim() == "" ||
    descripcion.trim() == ""  
  ) {
    validar_registro_tipo_tramiento(
      nombre,
      descripcion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#tratamiento_obligg").html("");
    $("#descripcion_obligg").html(""); 
  }

  var formdata = new FormData();
  formdata.append("nombre", nombre);
  formdata.append("descripcion", descripcion); 

  $.ajax({
    url: "/enfermedad/registrar_tipo_tratamiento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {

        if (resp == 1) {
          
          $(".card-success").LoadingOverlay("hide"); 
          cargar_contenido('contenido_principal','/tipo_tratamientos');
          return Swal.fire(
            "Tratamiento creado con exito",
            "El tratamiento se creo con exito",
            "success"
          );

        } else {

          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Tratamiento ya existe",
            "El tratamiento '" + nombre + "', ya existe en el sistema",
            "warning"
          );

        }  

      } else {

        $(".card-success").LoadingOverlay("hide");

        return Swal.fire(
          "Error",
          "No se pudo crear el tratamiento, falla en la matrix",
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

function validar_registro_tipo_tramiento(
  nombre,
  descripcion 
) {
  if (nombre.trim() == "") {
    $("#tratamiento_obligg").html("Ingrese tipo de tratamiento");
  } else {
    $("#tratamiento_obligg").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_obligg").html("Ingrese descripción");
  } else {
    $("#descripcion_obligg").html("");
  }

}

function listar_tipo_tratamiento() {
  tabla_tipo_tratamiento = $("#tabla_tipo_tratamiento").DataTable({
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
      url: "/enfermedad/listar_tipo_tratamiento",
      type: "GET",
    },
    //hay que poner la misma cantidad de columnas y tambien en el html
    columns: [
      { defaultContent: "" },
      {
        data: "estado",
        render: function (data, type, row) {
          if (data == 1) {
            return `<button style='font-size:10px;' type='button' class='inactivar btn btn-outline-danger' title='Inactivar el cerdo'><i class='fa fa-times' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          } else {
            return `<button style='font-size:10px;' type='button' class='activar btn btn-outline-success' title='Activar el cerdo'><i class='fa fa-check' style='font-size: 15px;'></i></button> - <button style='font-size:10px;' type='button' class='editar btn btn-outline-primary' title='Editar el cerdo'><i class='fa fa-edit' style='font-size: 15px;'></i></button>`;
          }
        },
      },
      { data: "nombre" },
      { data: "descripcion" }, 
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
  tabla_tipo_tratamiento.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_tratamiento").DataTable().page.info();
    tabla_tipo_tratamiento
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_tipo_tratamiento").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_tratamiento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_tratamiento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_tratamiento.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo tratamiento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_tratamiento(id, dato);
    }
  });
});

$("#tabla_tipo_tratamiento").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_tratamiento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_tratamiento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_tratamiento.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo tratamiento se cambiara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_tratamiento(id, dato);
    }
  });
});

function cambiar_estado_tipo_tratamiento(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/enfermedad/estado_tipo_tratamiento",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {

        tabla_tipo_tratamiento.ajax.reload();
        return Swal.fire(
          "Estado tipo tratamiento",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado tipo tratamiento",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_tipo_tratamiento").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_tratamiento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_tratamiento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_tratamiento.row(this).data();
  }

  $("#tratamiento_obligg_edit").html("");
  $("#descripcion_obligg_edit").html(""); 

  document.getElementById("id_t_t").value = data.id;
  document.getElementById("tratamiento_edit").value = data.nombre; 
  document.getElementById("descripcion_edit").value = data.descripcion; 

  $("#modal_editar_tratamiento").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_tratamiento").modal("show");
});

function editar_tipo_tratamientos() {
  var id = $("#id_t_t").val();
  var nombre = $("#tratamiento_edit").val();
  var descripcion = $("#descripcion_edit").val(); 

  if (
    nombre.trim() == "" ||
    descripcion.trim() == ""  
  ) {
    validar_editar_tipo_tramiento(
      nombre,
      descripcion 
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else {
    $("#tratamiento_obligg_edit").html("");
    $("#descripcion_obligg_edit").html(""); 
  }

  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("nombre", nombre);
  formdata.append("descripcion", descripcion); 

  $.ajax({
    url: "/enfermedad/editar_tipo_tratamiento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {

        if (resp == 1) {
          
          $(".bg-primary").LoadingOverlay("hide"); 
          $("#modal_editar_tratamiento").modal("hide");
          tabla_tipo_tratamiento.ajax.reload();
          return Swal.fire(
            "Tratamiento editado con exito",
            "El tratamiento se edito con exito",
            "success"
          );

        } else {

          $(".bg-primary").LoadingOverlay("hide");
          return Swal.fire(
            "Tratamiento ya existe",
            "El tratamiento '" + nombre + "', ya existe en el sistema",
            "warning"
          );

        }  

      } else {

        $(".bg-primary").LoadingOverlay("hide");

        return Swal.fire(
          "Error",
          "No se pudo crear el tratamiento, falla en la matrix",
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

function validar_editar_tipo_tramiento(
  nombre,
  descripcion 
) {
  if (nombre.trim() == "") {
    $("#tratamiento_obligg_edit").html("Ingrese tipo de tratamiento");
  } else {
    $("#tratamiento_obligg_edit").html("");
  }

  if (descripcion.trim() == "") {
    $("#descripcion_obligg_edit").html("Ingrese descripción");
  } else {
    $("#descripcion_obligg_edit").html("");
  }

}

/////////// compras de alimentos para cerdos
function registra_enfermedad(){
  Swal.fire({
    title: 'Guardar los datos?',
    text: "La información se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_enfermedad_cerdo();
    }
  })
}

function guardar_enfermedad_cerdo(){
  var cerdo_id = $("#cerdo_id").val(); 
  var fecha = $("#fecha_r").val(); 
  var sintomas = $("#sintomas").val(); 
  var diagnostico = $("#diagnostico").val(); 
  var veterinario = $("#veterinario_id").val(); 
  var count = 0;

  if(cerdo_id == "0" || 
    fecha.length == 0 || 
    fecha.trim() == "" ||
    sintomas.length == 0 || 
    sintomas.trim() == "" ||
    diagnostico.length == 0 || 
    diagnostico.trim() == "" ||
    veterinario == "0")
    {
    validar_registro_cerdos_enfermos(cerdo_id,fecha,sintomas,diagnostico,veterinario);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  }else{  
    $("#cerdo_obligg").html(""); 
    $("#fecha_obligg").html(""); 
    $("#sintomas_oblig").html(""); 
    $("#diagnostico_oblig").html(""); 
    $("#veterinario_obligg").html("");
  }

  $("#tabla_enfermedad tbody#tbody_tabla_enfermedad tr").each(function () {
      count++;
    }
  );

  if(count == 0){ 
    $("#unir_no_hay").html('<span class="badge badge-danger"><b>.:No hay enfermedades en la tabla:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay enfermedades en la tabla",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  var formdata = new FormData();
  formdata.append("cerdo_id", cerdo_id);
  formdata.append("fecha", fecha);
  formdata.append("sintomas", sintomas);
  formdata.append("diagnostico", diagnostico);
  formdata.append("veterinario", veterinario); 

  $.ajax({
    url: "/enfermedad/guardar_enfermedad_cerdo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {

      if (resp > 0) { 

        guardar_detalle_enfermedad_cerdo(parseInt(resp));

      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo registrar la enfermedad, falla en la matrix",
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

function validar_registro_cerdos_enfermos(cerdo_id,fecha,sintomas,diagnostico,veterinario)
{
  if (cerdo_id == "0") {
    $("#cerdo_obligg").html("Seleccione el cerdo");
  } else {
    $("#cerdo_obligg").html("");
  }

  if (fecha.length == 0 || fecha.trim() == "") {
    $("#fecha_obligg").html("Ingrese la fecha");
  } else {
    $("#fecha_obligg").html("");
  }

  if (sintomas.length == 0 || sintomas.trim() == "") {
    $("#sintomas_oblig").html("Ingrese los sintomas");
  } else {
    $("#sintomas_oblig").html("");
  }

  if (diagnostico.length == 0 || diagnostico.trim() == "") {
    $("#diagnostico_oblig").html("Ingrese el diagnóstico");
  } else {
    $("#diagnostico_oblig").html("");
  }

  if (veterinario == "0") {
    $("#veterinario_obligg").html("Seleccione el veterinario");
  } else {
    $("#veterinario_obligg").html("");
  }
}

function guardar_detalle_enfermedad_cerdo(id){
  var count = 0;
  var arrego_id = new Array(); 

  $("#tabla_enfermedad tbody#tbody_tabla_enfermedad tr").each(
    function () {
      arrego_id.push($(this).find("td").eq(0).text()); 
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_id.toString(); 

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/enfermedad/guardar_detalle_enfermedad_cerdo",
    type: "POST",
    data: { 
      id: id,
      ida: ida
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        
        $(".card-success").LoadingOverlay("hide");
        cargar_contenido('contenido_principal','/registro_enfermos');
        return Swal.fire(
          "Registro guardado",
          "El registro se guardo con exito",
          "success"
        );

      }
    } else {

      $(".card-success").LoadingOverlay("hide");
      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de enfermedad, falla en la matrix",
        "error"
      );

    }
  });
}

function modal_enfermedad_detalle(id){
  $.ajax({
    url: "/enfermedad/modal_enfermedad_detalle",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) {
      $('#tbody_enfermedad').empty();
      $(".card-info").LoadingOverlay("hide");
      if(resp != 0){

          let count = 0; 
          var llenat = ""; 
            resp['data'].forEach((row) => {  
            count++;   
            llenat += `<tr>
                        <td> ${count}  </td>
                        <td><a title="eliminar enfermedad del cerdo" onclick="eliminar_detalle_enfermedad_cerdo(${row["id"]})" class="btn btn-outline-danger"><i class="fa fa-trash"></i></a> </td>            
                        <td> ${row["nombre"]} </td>   
                      </tr>`;           
            $("#tbody_enfermedad").html(llenat);           
          }); 

          $("#modal_enfermedades_cerdo").modal({ backdrop: "static", keyboard: false });
          $("#modal_enfermedades_cerdo").modal("show");

      }else{
        $('#tbody_enfermedad').empty();
        return Swal.fire(
          "No hay enfermedad",
          "El cerdo no tiene detalle de enfermedades",
          "error"
        );
      }

    },
 
    beforeSend: function () {
        $(".card-info").LoadingOverlay("show", {
          text: "Cargando..."});
    },
  });
}

/// para lo cerdos tratados
function modal_enfermedad_detalle_tratado(id){
  $.ajax({
    url: "/enfermedad/modal_enfermedad_detalle",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) {
      $('#tbody_enfermedad').empty();
      $(".card-info").LoadingOverlay("hide");
      if(resp != 0){

          let count = 0; 
          var llenat = ""; 
            resp['data'].forEach((row) => {  
            count++;   
            llenat += `<tr>
                        <td> ${count}  </td>
                        <td> ${row["nombre"]} </td>   
                      </tr>`;           
            $("#tbody_enfermedad").html(llenat);           
          }); 

          $("#modal_enfermedades_cerdo").modal({ backdrop: "static", keyboard: false });
          $("#modal_enfermedades_cerdo").modal("show");

      }else{
        $('#tbody_enfermedad').empty();
        return Swal.fire(
          "No hay enfermedad",
          "El cerdo no tiene detalle de enfermedades",
          "error"
        );
      }

    },
 
    beforeSend: function () {
        $(".card-info").LoadingOverlay("show", {
          text: "Cargando..."});
    },
  });
}

function eliminar_cerdo_espera(id){
  Swal.fire({
    title: 'Eliminar dato?',
    text: "El registro se eliminará!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
  
      $.ajax({
        url: "/enfermedad/eliminar_cerdo_espera",
        type: "POST", 
        data: {id: id}, 
        success: function (resp) {  
          if(resp == 1){
            $(".card-info").LoadingOverlay("hide");
            cargar_contenido('contenido_principal','/cerdos_enfermos_espera');
            return Swal.fire(
              "Enfermedad eliminada",
              "La enfermedad se elimino con exito",
              "success"
            );
          }else{
            $(".card-info").LoadingOverlay("hide");
            return Swal.fire(
              "Error",
              "No se pudo eliminar la enfermedad, falla en la matrix",
              "error"
            );
          }
    
        },
     
        beforeSend: function () {
            $(".card-info").LoadingOverlay("show", {
              text: "Cargando..."});
        },
      });
      
    }
  })
}

function eliminar_detalle_enfermedad_cerdo(id){
  Swal.fire({
    title: 'Eliminar enfermedad?',
    text: "La enfermedad del cerdo se eliminará!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
  
      $.ajax({
        url: "/enfermedad/eliminar_detalle_enfermedad_cerdo",
        type: "POST", 
        data: {id: id}, 
        success: function (resp) {  
          if(resp == 1){

            $(".bg-primary").LoadingOverlay("hide");
            $("#modal_enfermedades_cerdo").modal("hide");
            return Swal.fire(
              "Enfermedad eliminada",
              "La enfermedad se elimino del detalle con exito",
              "success"
            );

          }else{
            
            $(".bg-primary").LoadingOverlay("hide");
            return Swal.fire(
              "Error",
              "No se pudo eliminar la enfermedad del detalle, falla en la matrix",
              "error"
            );
          }
    
        },
     
        beforeSend: function () {
            $(".bg-primary").LoadingOverlay("show", {
              text: "Cargando..."});
        },
      });
      
    }
  })
}

/////////// registrar_tratamiento
function registra_tratamientos_cerdoos(){
  Swal.fire({
    title: 'Guardar los datos?',
    text: "La información se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_tratamientos_cerdoos();
    }
  })
}

function guardar_tratamientos_cerdoos(){
  var cerdo_id = $("#cerdo_id").val(); 
  var peso = $("#peso_a").val(); 
  var fecha_i = $("#fecha_i").val(); 
  var fecha_f = $("#fecha_f").val(); 
  var observacion = $("#observacion").val(); 
  var count_insumo = 0;
  var count_medicamento = 0;
  var count_tratamiento = 0;

  if(cerdo_id == "0" || 
    fecha_i.length == 0 || 
    fecha_i.trim() == "" || 
    fecha_f.length == 0 || 
    fecha_f.trim() == "" || 
    observacion.length == 0 || 
    observacion.trim() == "")
    {
    validar_registro_tratamientos_cerdos(cerdo_id,fecha_i,fecha_f,observacion);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  }else{   
    $("#cerdo_obligg").html(""); 
    $("#fecha_i_obligg").html(""); 
    $("#fecha_f_obligg").html(""); 
    $("#observacion_oblig").html("");
  }

  // insumo
  $("#tabla_insumo tbody#tbody_tabla_insumo tr").each(function () {
      count_insumo++;
    }
  );

  if(count_insumo == 0){ 
    $("#unir_no_hay").html('<span style="font-size: 20px;" class="badge badge-danger"><b>.:No hay insumo en la tabla:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay insumo en la tabla",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  // medicamento
  $("#tabla_medicamento tbody#tbody_tabla_medicamento tr").each(function () {
      count_medicamento++;
    }
  );

  if(count_medicamento == 0){ 
    $("#unir_no_hay").html('<span style="font-size: 20px;" class="badge badge-danger"><b>.:No hay medicamento en la tabla:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay medicamento en la tabla",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  // tratamiento
  $("#tabla_tratamiento tbody#tbody_tabla_tratamiento tr").each(function () {
      count_tratamiento++;
    }
  );

  if(count_tratamiento == 0){ 
    $("#unir_no_hay").html('<span style="font-size: 20px;" class="badge badge-danger"><b>.:No hay tratamiento en la tabla:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay tratamiento en la tabla",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  var formdata = new FormData();
  formdata.append("cerdo_id", cerdo_id);
  formdata.append("peso", peso);
  formdata.append("fecha_i", fecha_i);
  formdata.append("fecha_f", fecha_f);
  formdata.append("observacion", observacion); 

  $.ajax({
    url: "/enfermedad/guardar_tratamiendo_cerdoos",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) { 

        guardar_detalle_insumo_enfermedad(parseInt(resp));

      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo registrar la enfermedad, falla en la matrix",
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

function validar_registro_tratamientos_cerdos(cerdo_id,fecha_i,fecha_f,observacion)
{
  if (cerdo_id == "0") {
    $("#cerdo_obligg").html("Seleccione el cerdo");
  } else {
    $("#cerdo_obligg").html("");
  }

  if (fecha_i.length == 0 || fecha_i.trim() == "") {
    $("#fecha_i_obligg").html("Ingrese la fecha inicio");
  } else {
    $("#fecha_i_obligg").html("");
  }

  if (fecha_f.length == 0 || fecha_f.trim() == "") {
    $("#fecha_f_obligg").html("Ingrese la fecha fin");
  } else {
    $("#fecha_f_obligg").html("");
  }

  if (observacion.length == 0 || observacion.trim() == "") {
    $("#observacion_oblig").html("Ingrese la observación");
  } else {
    $("#observacion_oblig").html("");
  }

  
}

function guardar_detalle_insumo_enfermedad(id){
  var count = 0;
  var arrego_id = new Array();
  var arrego_cantidad = new Array(); 

  $("#tabla_insumo tbody#tbody_tabla_insumo tr").each(
    function () {
      arrego_id.push($(this).find("td").eq(0).text()); 
      arrego_cantidad.push($(this).find("td").eq(2).text()); 
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_id.toString(); 
  var cantidad = arrego_cantidad.toString(); 

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/enfermedad/guardar_detalle_insumo_enfermedad",
    type: "POST",
    data: { 
      id: id,
      ida: ida,
      cantidad: cantidad
    },
  }).done(function (resp) {
    if (resp > 0) {
      guardar_detalle_medicina_enfermedad(parseInt(id));
    } else {
      $(".card-success").LoadingOverlay("hide");
      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de insumo, falla en la matrix",
        "error"
      );

    }
  });
}

function guardar_detalle_medicina_enfermedad(id){
  var count = 0;
  var arrego_id = new Array();
  var arrego_cantidad = new Array(); 

  $("#tabla_medicamento tbody#tbody_tabla_medicamento tr").each(
    function () {
      arrego_id.push($(this).find("td").eq(0).text()); 
      arrego_cantidad.push($(this).find("td").eq(2).text()); 
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_id.toString(); 
  var cantidad = arrego_cantidad.toString(); 

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/enfermedad/guardar_detalle_medicina_enfermedad",
    type: "POST",
    data: { 
      id: id,
      ida: ida,
      cantidad: cantidad
    },
  }).done(function (resp) {
    if (resp > 0) {
      guardar_detalle_tratamiento_enfermedad(parseInt(id)); 
    } else {
      $(".card-success").LoadingOverlay("hide");
      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de tratamiento, falla en la matrix",
        "error"
      );

    }

  });
}

function guardar_detalle_tratamiento_enfermedad(id){
  var count = 0;
  var arrego_id = new Array(); 

  $("#tabla_tratamiento tbody#tbody_tabla_tratamiento tr").each(
    function () {
      arrego_id.push($(this).find("td").eq(0).text());  
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_id.toString();  

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/enfermedad/guardar_detalle_tratamiento_enfermedad",
    type: "POST",
    data: { 
      id: id,
      ida: ida, 
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        $(".card-success").LoadingOverlay("hide");
        cargar_contenido('contenido_principal','/tratar_cerdos');
        return Swal.fire(
          "Registro guardado",
          "El registro se guardo con exito",
          "success"
        );
      }
    } else {
      $(".card-success").LoadingOverlay("hide");
      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de tratamiento, falla en la matrix",
        "error"
      );
    }
  });
}

/// detalle del tratamiendo del cerdo
function ver_detalle_tratamiendo_cerdo(id, id_enfer){

  $("#sintomas").val("");
  $("#diagnostico").val("");
  $("#fecha_r").val("");

  $.ajax({
    url: "/enfermedad/ver_detalle_tratamiendo_cerdo",
    type: "POST", 
    data: {id: id, id_enfer: id_enfer}, 
    success: function (resp) {

      $('#tbody_enfermedad').empty();

      $("#sintomas").val(resp['cabeza'][1]);
      $("#diagnostico").val(resp['cabeza'][2]);
      $("#fecha_r").val(resp['cabeza'][0]);

      let count = 0; 
      var llenat = ""; 
      resp['detalle'].forEach((row) => { 
      count++;   
      llenat += `<tr>
                  <td> ${count}  </td>
                  <td> ${row[1]} </td>   
                </tr>`;           
        $("#tbody_enfermedad").html(llenat);           
      }); 

      traer_insumo_enfermedad_detalle(id);
    },
 
    beforeSend: function () {
        $(".card-dark").LoadingOverlay("show", {
          text: "Cargando..."});
    },
  });
}

function traer_insumo_enfermedad_detalle(id){
  $.ajax({
    url: "/enfermedad/traer_insumo_enfermedad_detalle",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) {

      $('#tbody_tabla_insumo').empty();

      var llenat = ""; 
      resp.forEach((row) => { 
      llenat += `<tr>
                  <td> ${row[0]} - ${row[1]}  </td>
                  <td> ${row[2]} </td>  
                </tr>`;           
        $("#tbody_tabla_insumo").html(llenat);           
      }); 

      traer_insumo_medicamento_detalle(id);
    },
 
  });
}

function traer_insumo_medicamento_detalle(id){
  $.ajax({
    url: "/enfermedad/traer_insumo_medicamento_detalle",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) {

      $('#tbody_tabla_medicamento').empty();

      var llenat = ""; 
      resp.forEach((row) => { 
      llenat += `<tr>
                  <td> ${row[0]} - ${row[1]}  </td>
                  <td> ${row[2]} </td>  
                </tr>`;           
        $("#tbody_tabla_medicamento").html(llenat);           
      }); 

      traer_insumo_tratamiento_detalle(id);
    },
 
  });
}

function traer_insumo_tratamiento_detalle(id){
  $.ajax({
    url: "/enfermedad/traer_insumo_tratamiento_detalle",
    type: "POST", 
    data: {id: id}, 
    success: function (resp) {

      $('#tbody_tabla_tratamiento').empty();
      $(".card-dark").LoadingOverlay("hide");

      let count = 0; 
      var llenat = ""; 
      resp.forEach((row) => { 
      count++;   
      llenat += `<tr>
                  <td> ${count}</td> 
                  <td> ${row[0]}</td> 
                </tr>`;           
        $("#tbody_tabla_tratamiento").html(llenat);           
      }); 

      $("#moodal_detalle").modal({ backdrop: "static", keyboard: false });
      $("#moodal_detalle").modal("show");
    },
 
  });
}