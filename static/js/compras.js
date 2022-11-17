var tabla_proveedor, tabla_tipo_insumo, tabla_insumo, tabla_tipo_medicamento, tabla_medicamento;

function registro_proveedor() { 
    var razon_social = $("#razon_social").val();
    var ruc = $("#ruc").val();
    var telefonoo = $("#telefonoo").val();
    var correo = $("#correo").val();
    var direccion = $("#direccion").val();
    var descripcion = $("#descripcion").val();
    var encargdo = $("#encargdo").val();
    var telefonoo_en = $("#telefonoo_en").val();
  
    if (
      razon_social.length == 0 ||
      razon_social.trim() == "" ||
      ruc.length == 0 ||
      ruc.trim() == "" ||
      telefonoo.length == 0 ||
      telefonoo.trim() == "" ||
      correo.length == 0 ||
      correo.trim() == "" ||
      direccion.length == 0 ||
      direccion.trim() == "" ||
      descripcion.length == 0 ||
      descripcion.trim() == "" ||
      encargdo.length == 0 ||
      encargdo.trim() == "" ||
      telefonoo_en.length == 0 ||
      telefonoo_en.trim() == ""
    ) {
      validar_registro_proveedor(
        razon_social,
        ruc,
        telefonoo,
        correo,
        direccion,
        descripcion,
        encargdo,
        telefonoo_en
      );
  
      return swal.fire(
        "Campo vacios",
        "Los campos no deben quedar vacios, complete los datos",
        "warning"
      );
    } else { 
        $("#razon_social_oblig").html(""); 
        $("#ruc_obligg").html(""); 
        $("#telefonoo_obligg").html(""); 
        $("#correo_obligg").html(""); 
        $("#direccion_obligg").html(""); 
        $("#descripcion_obligg").html(""); 
        $("#encargdo_oblig").html(""); 
        $("#telefonoo_en__obligg").html("");
    }

    if(!valid_email){
        return swal.fire(
            "Correo incorrecto",
            "El correo ingresado es incorrecto",
            "warning"
          );
    }
  
    var formdata = new FormData(); 
    formdata.append("razon_social", razon_social);
    formdata.append("ruc", ruc);
    formdata.append("telefonoo", telefonoo);
    formdata.append("correo", correo);
    formdata.append("direccion", direccion);
    formdata.append("descripcion", descripcion);
    formdata.append("encargdo", encargdo);
    formdata.append("telefonoo_en", telefonoo_en); 
  
    $.ajax({
      url: "/compras/registrar_proveedor",
      type: "POST",
      //aqui envio toda la formdata
      data: formdata,
      contentType: false,
      processData: false,
      success: function (resp) {
        if (resp > 0) {
          if (resp == 1) {
            $(".card-success").LoadingOverlay("hide");               
            cargar_contenido('contenido_principal','/proveedor');
            return Swal.fire(
              "Proveedor registrado con exito",
              "El proveedor se registro con exito",
              "success"
            );
          } else if (resp == 2) {
            $(".card-success").LoadingOverlay("hide");
            return Swal.fire(
              "Rúc ya existe",
              "El rúc '" + ruc + "', ya existe en el sistema",
              "warning"
            );
          }
        } else {
          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Error",
            "No se pudo registrar el proveedor, falla en la matrix",
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
  
function validar_registro_proveedor(
    razon_social,
    ruc,
    telefonoo,
    correo,
    direccion,
    descripcion,
    encargdo,
    telefonoo_en
  ) {
    if (razon_social.length == 0 || razon_social.trim() == "") {
      $("#razon_social_oblig").html("Ingrese razón social");
    } else {
      $("#razon_social_oblig").html("");
    }
  
    if (ruc.length == 0 || ruc.trim() == "") {
      $("#ruc_obligg").html("Ingrese el ruc");
    } else {
      $("#ruc_obligg").html("");
    }
  
    if (telefonoo.length == 0  || telefonoo.trim() == "") {
      $("#telefonoo_obligg").html("Ingrese el telefono");
    } else {
      $("#telefonoo_obligg").html("");
    }
  
    if (correo.length == 0 || correo.trim() == "") {
      $("#correo_obligg").html("Ingrese el correo");
    } else {
      $("#correo_obligg").html("");
    }
  
    if (direccion.length == 0 || direccion.trim() == "") {
      $("#direccion_obligg").html("Ingrese la dirección");
    } else {
      $("#direccion_obligg").html("");
    }
  
    if (descripcion.length == 0 || descripcion.trim() == "") {
      $("#descripcion_obligg").html("Ingrese la descripción");
    } else {
      $("#descripcion_obligg").html("");
    }
  
    if (encargdo.length == 0 || encargdo.trim() == "") {
      $("#encargdo_oblig").html("Ingrese el encargdo");
    } else {
      $("#encargdo_oblig").html("");
    }
  
    if (telefonoo_en.length == 0 || telefonoo_en.trim() == "") {
      $("#telefonoo_en__obligg").html("Ingrese el telefono del encargado");
    } else {
      $("#telefonoo_en__obligg").html("");
    }
}

function listado_proveedores() {
    tabla_proveedor = $("#tabla_proveedore").DataTable({
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
        url: "/compras/listado_proveedores",
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
        { data: "razon" },
        { data: "ruc" },
        { data: "telefono" },
        { data: "correo" },     
        { data: "direccion" },
        { data: "encargado" },
        { data: "telefono_en" },
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
    tabla_proveedor.on("draw.dt", function () {
      var pageinfo = $("#tabla_proveedore").DataTable().page.info();
      tabla_proveedor
        .column(0, { page: "current" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1 + pageinfo.start;
        });
    });
}

$("#tabla_proveedore").on("click", ".inactivar", function () {
    //esto esta extrayendo los datos de la tabla el (data)
    var data = tabla_proveedor.row($(this).parents("tr")).data(); //a que fila deteta que doy click
    //esta condicion es importante para el responsibe porque salda un error si no lo pongo
    if (tabla_proveedor.row(this).child.isShown()) {
      //esto es cuando esta en tamaño responsibo
      var data = tabla_proveedor.row(this).data();
    }
    var dato = 0;
    var id = data.id;
  
    Swal.fire({
      title: "Cambiar estado?",
      text: "El estado del proveedor se cambiara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!",
    }).then((result) => {
      if (result.isConfirmed) {
        cambiar_estado_proveedor(id, dato);
      }
    });
});
  
$("#tabla_proveedore").on("click", ".activar", function () {
    //esto esta extrayendo los datos de la tabla el (data)
    var data = tabla_proveedor.row($(this).parents("tr")).data(); //a que fila deteta que doy click
    //esta condicion es importante para el responsibe porque salda un error si no lo pongo
    if (tabla_proveedor.row(this).child.isShown()) {
      //esto es cuando esta en tamaño responsibo
      var data = tabla_proveedor.row(this).data();
    }
    var dato = 1;
    var id = data.id;
  
    Swal.fire({
      title: "Cambiar estado?",
      text: "El estado del proveedor se cambiara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!",
    }).then((result) => {
      if (result.isConfirmed) {
        cambiar_estado_proveedor(id, dato);
      }
    });
});
  
function cambiar_estado_proveedor(id, dato) {
    var res = "";
    if (dato == 1) {
      res = "activo";
    } else {
      res = "inactivo";
    }
  
    $.ajax({
      url: "/compras/estado_proveedor",
      type: "POST",
      data: { id: id, dato: dato },
    }).done(function (response) {
      if (response > 0) {
        if (response == 1) {
          tabla_proveedor.ajax.reload();
          return Swal.fire(
            "Estado proveedor",
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
  
$("#tabla_proveedore").on("click", ".editar", function () {
    //esto esta extrayendo los datos de la tabla el (data)
    var data = tabla_proveedor.row($(this).parents("tr")).data(); //a que fila deteta que doy click
    //esta condicion es importante para el responsibe porque salda un error si no lo pongo
    if (tabla_proveedor.row(this).child.isShown()) {
      //esto es cuando esta en tamaño responsibo
      var data = tabla_proveedor.row(this).data();
    }

    $("#id_proveedor").val(data.id);
    $("#razon_social_edit").val(data.razon);
    $("#ruc_edit").val(data.ruc);
    $("#telefonoo_edit").val(data.telefono);
    $("#correo_edit").val(data.correo);
    $("#direccion_edit").val(data.direccion);
    $("#descripcion_edit").val(data.descripcion);
    $("#encargdo_edit").val(data.encargado);
    $("#telefonoo_en_edit").val(data.telefono_en);

    $("#razon_social_oblig_edit").html(""); 
    $("#ruc_oblig_edit").html(""); 
    $("#telefonoo_oblig_edit").html(""); 
    $("#correo_oblig_edit").html(""); 
    $("#direccion_oblig_edit").html(""); 
    $("#descripcion_oblig_edit").html(""); 
    $("#encargdo_oblig_edit").html(""); 
    $("#telefonoo_en_oblig_edit").html("");
  
    $("#modal_editar_proveedor").modal({ backdrop: "static", keyboard: false });
    $("#modal_editar_proveedor").modal("show");
});

function editar_proveedor() { 
  var id = $("#id_proveedor").val();
  var razon_social = $("#razon_social_edit").val();
  var ruc = $("#ruc_edit").val();
  var telefonoo = $("#telefonoo_edit").val();
  var correo = $("#correo_edit").val();
  var direccion = $("#direccion_edit").val();
  var descripcion = $("#descripcion_edit").val();
  var encargdo = $("#encargdo_edit").val();
  var telefonoo_en = $("#telefonoo_en_edit").val();

  if (
    razon_social.length == 0 ||
    razon_social.trim() == "" ||
    ruc.length == 0 ||
    ruc.trim() == "" ||
    telefonoo.length == 0 ||
    telefonoo.trim() == "" ||
    correo.length == 0 ||
    correo.trim() == "" ||
    direccion.length == 0 ||
    direccion.trim() == "" ||
    descripcion.length == 0 ||
    descripcion.trim() == "" ||
    encargdo.length == 0 ||
    encargdo.trim() == "" ||
    telefonoo_en.length == 0 ||
    telefonoo_en.trim() == ""
  ) {
    validar_editar_proveedor(
      razon_social,
      ruc,
      telefonoo,
      correo,
      direccion,
      descripcion,
      encargdo,
      telefonoo_en
    );

    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  } else { 
      $("#razon_social_oblig_edit").html(""); 
      $("#ruc_oblig_edit").html(""); 
      $("#telefonoo_oblig_edit").html(""); 
      $("#correo_oblig_edit").html(""); 
      $("#direccion_oblig_edit").html(""); 
      $("#descripcion_oblig_edit").html(""); 
      $("#encargdo_oblig_edit").html(""); 
      $("#telefonoo_en_oblig_edit").html("");
  }

  var formdata = new FormData(); 
  formdata.append("id", id);
  formdata.append("razon_social", razon_social);
  formdata.append("ruc", ruc);
  formdata.append("telefonoo", telefonoo);
  formdata.append("correo", correo);
  formdata.append("direccion", direccion);
  formdata.append("descripcion", descripcion);
  formdata.append("encargdo", encargdo);
  formdata.append("telefonoo_en", telefonoo_en); 

  $.ajax({
    url: "/compras/editar_proveedor",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".bg-primary").LoadingOverlay("hide");               
          $("#modal_editar_proveedor").modal("hide");
          tabla_proveedor.ajax.reload();
          return Swal.fire(
            "Proveedor editado con exito",
            "El proveedor se edito con exito",
            "success"
          );
        } else if (resp == 2) {
          $(".bg-primary").LoadingOverlay("hide");
          return Swal.fire(
            "Rúc ya existe",
            "El rúc '" + ruc + "', ya existe en el sistema",
            "warning"
          );
        }
      } else {
        $(".bg-primary").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo editar el proveedor, falla en la matrix",
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

function validar_editar_proveedor(
  razon_social,
  ruc,
  telefonoo,
  correo,
  direccion,
  descripcion,
  encargdo,
  telefonoo_en
) {
  if (razon_social.length == 0 || razon_social.trim() == "") {
    $("#razon_social_oblig_edit").html("Ingrese razón social");
  } else {
    $("#razon_social_oblig_edit").html("");
  }

  if (ruc.length == 0 || ruc.trim() == "") {
    $("#ruc_oblig_edit").html("Ingrese el ruc");
  } else {
    $("#ruc_oblig_edit").html("");
  }

  if (telefonoo.length == 0  || telefonoo.trim() == "") {
    $("#telefonoo_oblig_edit").html("Ingrese el telefono");
  } else {
    $("#telefonoo_oblig_edit").html("");
  }

  if (correo.length == 0 || correo.trim() == "") {
    $("#correo_oblig_edit").html("Ingrese el correo");
  } else {
    $("#correo_oblig_edit").html("");
  }

  if (direccion.length == 0 || direccion.trim() == "") {
    $("#direccion_oblig_edit").html("Ingrese la dirección");
  } else {
    $("#direccion_oblig_edit").html("");
  }

  if (descripcion.length == 0 || descripcion.trim() == "") {
    $("#descripcion_oblig_edit").html("Ingrese la descripción");
  } else {
    $("#descripcion_oblig_edit").html("");
  }

  if (encargdo.length == 0 || encargdo.trim() == "") {
    $("#encargdo_oblig_edit").html("Ingrese el encargdo");
  } else {
    $("#encargdo_oblig_edit").html("");
  }

  if (telefonoo_en.length == 0 || telefonoo_en.trim() == "") {
    $("#telefonoo_en_oblig_edit").html("Ingrese el telefono del encargado");
  } else {
    $("#telefonoo_en_oblig_edit").html("");
  }
}

////////////////////////
/////////// compras de alimentos para cerdos
function registra_compra_alimento(){
  Swal.fire({
    title: 'Guardar compra de alimento?',
    text: "La compra se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_compra_alimento();
    }
  })
}

function guardar_compra_alimento(){
  var proveedor = $("#proveedor").val(); 
  var fecha_c = $("#fecha_c").val(); 
  var numero_compra = $("#numero_compra").val(); 
  var tipo_comprobante = $("#tipo_comprobante").val(); 
  var iva = $("#iva").val(); 

  var subtotal = $("#subtotal").val(); 
  var impuesto_sub = $("#impuesto_sub").val(); 
  var total_pagar = $("#total_pagar").val(); 
  var count = 0;

  if(proveedor == "0" || 
  numero_compra.length == 0 || 
  numero_compra.trim() == "" ||
  iva.length == 0 || 
  iva.trim() == ""){
    validar_registro_compra(proveedor,numero_compra,iva);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  }else{ 
      $("#proveedor_obligg").html(""); 
      $("#numero_c_obligg").html(""); 
      $("#ivaa_obligg").html("");
  }

  $("#tabla_compra_alimento tbody#tbody_tabla_compra_alimento tr").each(function () {
      count++;
    }
  );

  if(count == 0){ 
    $("#unir_no_hay").html('<span class="badge badge-danger"><b>.:No hay alimentos en el detalle de compra:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay alimentos en el detalle de compra",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  var formdata = new FormData();
  formdata.append("proveedor", proveedor);
  formdata.append("fecha_c", fecha_c);
  formdata.append("numero_compra", numero_compra);
  formdata.append("tipo_comprobante", tipo_comprobante);
  formdata.append("iva", iva);
  formdata.append("subtotal", subtotal);
  formdata.append("impuesto_sub", impuesto_sub);
  formdata.append("total_pagar", total_pagar); 

  $.ajax({
    url: "/compras/registrar_compra_alimento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp != 2) {

          guardar_detalle_compra_alimento(parseInt(resp));

        } else {
          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Número de compra ya existe",
            "El número de compra: '" + numero_compra + "', ya existe en el sistema",
            "warning"
          );

        } 

      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear la comppra, falla en la matrix",
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

function guardar_detalle_compra_alimento(id){
  var count = 0;
  var arrego_alimento = new Array();
  var arreglo_precio = new Array();
  var arreglo_cantidad = new Array();
  var arreglo_descuento = new Array();
  var arreglo_subtotal = new Array();

  $("#tabla_compra_alimento tbody#tbody_tabla_compra_alimento tr").each(
    function () {
      arrego_alimento.push($(this).find("td").eq(0).text());
      arreglo_precio.push($(this).find("td").eq(3).text());
      arreglo_cantidad.push($(this).find("#cantida_a").val());
      arreglo_descuento.push($(this).find("#descuento_a").val());
      arreglo_subtotal.push($(this).find("td").eq(6).text());
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_alimento.toString();
  var precio = arreglo_precio.toString();
  var cantidad = arreglo_cantidad.toString();
  var descuento = arreglo_descuento.toString();
  var total = arreglo_subtotal.toString();

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/compras/registrar_detalle_compra_alimento",
    type: "POST",
    data: { 
      id: id,
      ida: ida,
      precio: precio,
      cantidad: cantidad,
      descuento: descuento,
      total: total,
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        Swal.fire({
          title: "Campra realizada con exito",
          text: "Desea imprimir la compra??",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Imprimir!!",
        }).then((result) => {
          if (result.value) {
            window.open("/reporte/compra_alimento/" + parseInt(id) + "#zoom=100%", "Reporte de compra","scrollbards=No");
            cargar_contenido('contenido_principal','/compra_alimento');
          }
        });
        cargar_contenido('contenido_principal','/compra_alimento');
      }
    } else {

      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de comppra, falla en la matrix",
        "error"
      );

    }
  });
}

function validar_registro_compra(proveedor,numero_compra,iva) {
  if (proveedor == "0") {
    $("#proveedor_obligg").html("Seleccione el proveedor");
  } else {
    $("#proveedor_obligg").html("");
  }

  if (numero_compra.length == 0 || numero_compra.trim() == "") {
    $("#numero_c_obligg").html("Ingrese número compra");
  } else {
    $("#numero_c_obligg").html("");
  }

  if (iva.length == 0 || iva.trim() == "") {
    $("#ivaa_obligg").html("Ingrese el iva");
  } else {
    $("#ivaa_obligg").html("");
  }
}

function anular_compa_alimento(id){
  Swal.fire({
    title: "Anular la compra?",
    text: "La compra se anulará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, anular!",
  }).then((result) => {
    if (result.isConfirmed) {
      compra_alimneto_anular(id);
    }
  });
}

function compra_alimneto_anular(id) {
  $.ajax({
    url: "/compras/compra_alimneto_anular",
    type: "POST",
    data: { id: id },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        cargar_contenido('contenido_principal','/compra_alimento');
        return Swal.fire(
          "Compar anulada",
          "La compra se anulo con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Error",
        "No se pudo anular la compra, error en la matrix",
        "error"
      );
    }
  });
}

///// insumos
function registra_tipo_insumo() {
  var valor = $("#tipo_insumo").val();

  $("#mensaje_tipo_i_success").text("");
  $(".alerta_smsm_tipo_i_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_i").text("Ingrese el tipo de insumo");
    $(".alerta_smsm_tipo_i").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_i").text("");
    $(".alerta_smsm_tipo_i").hide(1000);
  }

  funcion = "registra_tipo_insumo";

  $.ajax({
    type: "POST",
    url: "/compras/accion_tipo_insumo",
    data: { valor: valor, funcion: funcion },
    success: function (response) {

      if (response == 1) {

        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_insumo").val("");

        $("#mensaje_tipo_i_success").text("El tipo de insumo se creo con exito");
        $(".alerta_smsm_tipo_i_success").show(3000);
        
        tabla_tipo_insumo.ajax.reload();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_i").text("El tipo de insumo: '" + valor + "', ya existe");
        $(".alerta_smsm_tipo_i").show(1000);

      } else {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_i").text("Error:" + response);
        $(".alerta_smsm_tipo_i").show(1000);

      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function Listar_tipo_insumo() {
  tabla_tipo_insumo = $("#tabla_tipo_i_").DataTable({
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
      url: "/compras/listar_tipo_insumo",
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
    order: [[0, "ASC"]],
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_tipo_insumo.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_i_").DataTable().page.info();
    tabla_tipo_insumo
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_tipo_i_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_insumo.row(this).data();
  }

  $("#mensaje_tipo_i_success").text("");
  $(".alerta_smsm_tipo_i_success").hide(1000);

  $("#mensaje_tipo_i").text("");
  $(".alerta_smsm_tipo_i").hide(1000);

  document.getElementById("id_tipo_i").value = data.id;
  document.getElementById("tipo_insumo").value = data.tipo;

  $("#unir_texto").text("Editar tipo de insumo");
  $("#btn_registrar").hide();
  $("#btn_editar").show();
  $("#btn_nuevo").show();
});

function editar_tipo_insumo() {
  var id = $("#id_tipo_i").val();
  var valor = $("#tipo_insumo").val();

  $("#mensaje_tipo_i_success").text("");
  $(".alerta_smsm_tipo_i_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_i").text("Ingrese el tipo de insumo");
    $(".alerta_smsm_tipo_i").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_i").text("");
    $(".alerta_smsm_tipo_i").hide(1000);
  }

  funcion = "editar_tipo_insumo";

  $.ajax({
    type: "POST",
    url: "/compras/accion_tipo_insumo",
    data: { valor: valor, funcion: funcion, id: id },
    success: function (response) {

      if (response == 1) {

        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_insumo").val("");
        $("#id_tipo_i").val("");

        $("#mensaje_tipo_i_success").text("El tipo de insumo se edito con exito");
        $(".alerta_smsm_tipo_i_success").show(3000);
        
        tabla_tipo_insumo.ajax.reload();

        $("#unir_texto").text("Registrar tipo insumo");
        $("#btn_registrar").show();
        $("#btn_editar").hide();
        $("#btn_nuevo").hide();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_i").text("El tipo de insumo: '" + valor + "', ya existe");
        $(".alerta_smsm_tipo_i").show(1000);

      } else {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_i").text("Error:" + response);
        $(".alerta_smsm_tipo_i").show(1000);

      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

$("#tabla_tipo_i_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_insumo.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo insumo se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_insumo(id, dato);
    }
  });
});

$("#tabla_tipo_i_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_insumo.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo insumo se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_insumo(id, dato);
    }
  });
});

function cambiar_estado_tipo_insumo(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  funcion = "estado_tipo_insumo";

  $.ajax({
    url: "/compras/accion_tipo_insumo",
    type: "POST",
    data: { id: id, dato: dato, funcion: funcion },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        
        tabla_tipo_insumo.ajax.reload();
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

//// insumos
function registrar_insumo(){
  Swal.fire({
    title: 'Guardar registro?',
    text: "El registro se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_insumo();
    }
  })
}

function guardar_insumo(){
  var codigo = $("#codigo_alimento").val();
  var nombre = $("#nombre").val();
  var tipo = $("#tipo_id").val();
  var cantidad = $("#cantidad").val();
  var precio = $("#precio_c").val(); 
  var detalle = $("#detalle_a").val(); 

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_registro_insumo(
      codigo,
      nombre,
      tipo, 
      cantidad,
      precio, 
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
    $("#cantidad_obligg").html("");
    $("#precio_obligg").html(""); 
    $("#detalle_obligg").html("");
  }

  var formdata = new FormData();
  var foto = $("#foto")[0].files[0];
  //est valores son como los que van en la data del ajax
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo); 
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio); 
  formdata.append("detalle", detalle);
  formdata.append("foto", foto);

  $.ajax({
    url: "/compras/registrar_insumo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".card-success").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/insumo");

          return Swal.fire(
            "Insumo creado con exito",
            "El insumo se creo con exito",
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
          "No se pudo crear el insumo, falla en la matrix",
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

function validar_registro_insumo(
  codigo,
  nombre,
  tipo, 
  cantidad,
  precio, 
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig").html("Ingrese código");
  } else {
    $("#codigo_oblig").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre del insumo");
  } else {
    $("#nombre_obligg").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg").html("Ingrese el tipo insumo");
  } else {
    $("#tipo_obligg").html("");
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

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg").html("Ingrese el detalle del insumo");
  } else {
    $("#detalle_obligg").html("");
  }
}

function listar_insumos() {
  tabla_insumo = $("#tabla_insumo").DataTable({
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
      url: "/compras/listar_insumos",
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
      { data: "tipo" }, 
      {
        data: "foto",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return (
            "<img class='img-circle' src='static/uploads/insumo/" +
            data +
            "' width='50px' />"
          );
        },
      },
      { data: "cantidad" },
      { data: "precio" },
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
  tabla_insumo.on("draw.dt", function () {
    var pageinfo = $("#tabla_insumo").DataTable().page.info();
    tabla_insumo
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_insumo").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_insumo.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de insumo se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_insumo(id, dato);
    }
  });
});

$("#tabla_insumo").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_insumo.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del insumo se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_insumo(id, dato);
    }
  });
});

function cambiar_estado_insumo(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/compras/estado_insumo",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_insumo.ajax.reload();
        return Swal.fire(
          "Estado del insumo",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado del insumo",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_insumo").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_insumo.row(this).data();
  }

  $("#id_insumo_edit").val(data.id);
  $("#codigo_insumo_edit").val(data.codigo);
  $("#nombre_edit").val(data.nombre);
  $("#tipo_id_edit").val(data.tipo_id).trigger("change");
  $("#cantidad_edit").val(data.cantidad);
  $("#precio_c_edit").val(data.precio);
  $("#detalle_a_edit").val(data.detalle); 

  $("#codigo_oblig_edi").html(""); 
  $("#nombre_obligg_edi").html(""); 
  $("#tipo_obligg_edi").html(""); 
  $("#cantidad_obligg_edi").html(""); 
  $("#precio_obligg_edi").html(""); 
  $("#detalle_obligg_edi").html("");  

  $("#modal_editar_insumo").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_insumo").modal("show");
});

function editar_insumo(){
  var id = $("#id_insumo_edit").val();
  var codigo = $("#codigo_insumo_edit").val();
  var nombre = $("#nombre_edit").val();
  var tipo = $("#tipo_id_edit").val();
  var cantidad = $("#cantidad_edit").val();
  var precio = $("#precio_c_edit").val(); 
  var detalle = $("#detalle_a_edit").val(); 

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_editar_insumo(
      codigo,
      nombre,
      tipo, 
      cantidad,
      precio, 
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
    $("#cantidad_obligg_edi").html("");
    $("#precio_obligg_edi").html(""); 
    $("#detalle_obligg_edi").html("");
  }

  var formdata = new FormData(); 
  formdata.append("id", id);
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo); 
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio); 
  formdata.append("detalle", detalle); 

  $.ajax({
    url: "/compras/editar_insumo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {

          $(".bg-primary").LoadingOverlay("hide");
          $("#modal_editar_insumo").modal("hide");
          tabla_insumo.ajax.reload();
          return Swal.fire(
            "Insumo editado con exito",
            "El insumo se edito con exito",
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
          "No se pudo editar el insumo, falla en la matrix",
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

function validar_editar_insumo(
  codigo,
  nombre,
  tipo, 
  cantidad,
  precio, 
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig_edi").html("Ingrese código");
  } else {
    $("#codigo_oblig_edi").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg_edi").html("Ingrese nombre del insumo");
  } else {
    $("#nombre_obligg_edi").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg_edi").html("Ingrese el tipo insumo");
  } else {
    $("#tipo_obligg_edi").html("");
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

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg_edi").html("Ingrese el detalle del insumo");
  } else {
    $("#detalle_obligg_edi").html("");
  }
}

$("#tabla_insumo").on("click", ".photo", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_insumo.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_insumo.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_insumo.row(this).data();
  }

  var id = data.id;
  var foto = data.foto;

  $("#id_cerdo_foto").val(id);
  $("#foto_actu_c").val(foto);
  $("#img_cerdo").attr("src", "static/uploads/insumo/" + foto);

  $("#foto_new_c").val("");

  $("#modal_editar_foto_insumo").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_foto_insumo").modal("show");
});

function editar_foto_insumo() {
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
    url: "/compras/cambiar_foto_insumo",
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
          tabla_insumo.ajax.reload();
          $("#modal_editar_foto_insumo").modal("hide");
          return Swal.fire(
            "Foto cambiada",
            "La foto del insumo se cambio con exito",
            "success"
          );

        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "Error al cambiar la foto del insumo",
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

/////////// compras de alimentos para cerdos
function registra_compra_insumo(){
  Swal.fire({
    title: 'Guardar compra de insumo?',
    text: "La compra se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_compra_insumo();
    }
  })
}

function guardar_compra_insumo(){
  var proveedor = $("#proveedor").val(); 
  var fecha_c = $("#fecha_c").val(); 
  var numero_compra = $("#numero_compra").val(); 
  var tipo_comprobante = $("#tipo_comprobante").val(); 
  var iva = $("#iva").val(); 

  var subtotal = $("#subtotal").val(); 
  var impuesto_sub = $("#impuesto_sub").val(); 
  var total_pagar = $("#total_pagar").val(); 
  var count = 0;

  if(proveedor == "0" || 
  numero_compra.length == 0 || 
  numero_compra.trim() == "" ||
  iva.length == 0 || 
  iva.trim() == ""){

    validar_registro_compra_insumo(proveedor,numero_compra,iva);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  }else{ 
      $("#proveedor_obligg").html(""); 
      $("#numero_c_obligg").html(""); 
      $("#ivaa_obligg").html("");
  }

  $("#tabla_compra_insumo tbody#tbody_tabla_compra_insumo tr").each(function () {
      count++;
    }
  );

  if(count == 0){ 
    $("#unir_no_hay").html('<span class="badge badge-danger"><b>.:No hay insumo en el detalle de compra:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay insumo en el detalle de compra",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  var formdata = new FormData();
  formdata.append("proveedor", proveedor);
  formdata.append("fecha_c", fecha_c);
  formdata.append("numero_compra", numero_compra);
  formdata.append("tipo_comprobante", tipo_comprobante);
  formdata.append("iva", iva);
  formdata.append("subtotal", subtotal);
  formdata.append("impuesto_sub", impuesto_sub);
  formdata.append("total_pagar", total_pagar); 

  $.ajax({
    url: "/compras/registrar_compra_insumo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {

      if (resp > 0) {
        if (resp != 2) {
          guardar_detalle_compra_insumo(parseInt(resp));
        } else {
          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Número de compra ya existe",
            "El número de compra: '" + numero_compra + "', ya existe en el sistema",
            "warning"
          );
        } 

      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear la compra, falla en la matrix",
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

function validar_registro_compra_insumo(proveedor,numero_compra,iva) {
  if (proveedor == "0") {
    $("#proveedor_obligg").html("Seleccione el proveedor");
  } else {
    $("#proveedor_obligg").html("");
  }

  if (numero_compra.length == 0 || numero_compra.trim() == "") {
    $("#numero_c_obligg").html("Ingrese número compra");
  } else {
    $("#numero_c_obligg").html("");
  }

  if (iva.length == 0 || iva.trim() == "") {
    $("#ivaa_obligg").html("Ingrese el iva");
  } else {
    $("#ivaa_obligg").html("");
  }
}

function guardar_detalle_compra_insumo(id){
  var count = 0;
  var arrego_alimento = new Array();
  var arreglo_precio = new Array();
  var arreglo_cantidad = new Array();
  var arreglo_descuento = new Array();
  var arreglo_subtotal = new Array();

  $("#tabla_compra_insumo tbody#tbody_tabla_compra_insumo tr").each(
    function () {
      arrego_alimento.push($(this).find("td").eq(0).text());
      arreglo_precio.push($(this).find("td").eq(3).text());
      arreglo_cantidad.push($(this).find("#cantida_a").val());
      arreglo_descuento.push($(this).find("#descuento_a").val());
      arreglo_subtotal.push($(this).find("td").eq(6).text());
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_alimento.toString();
  var precio = arreglo_precio.toString();
  var cantidad = arreglo_cantidad.toString();
  var descuento = arreglo_descuento.toString();
  var total = arreglo_subtotal.toString();

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/compras/registrar_detalle_compra_insumo",
    type: "POST",
    data: { 
      id: id,
      ida: ida,
      precio: precio,
      cantidad: cantidad,
      descuento: descuento,
      total: total,
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        Swal.fire({
          title: "Campra realizada con exito",
          text: "Desea imprimir la compra??",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Imprimir!!",
        }).then((result) => {
          if (result.value) {
            window.open("/reporte/compra_insumo/" + parseInt(id) + "#zoom=100%", "Reporte de compra","scrollbards=No");
            cargar_contenido('contenido_principal','/compra_insumos');
          }
        });
        cargar_contenido('contenido_principal','/compra_insumos');
      }
    } else {

      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de comppra, falla en la matrix",
        "error"
      );

    }
  });
}

function anular_compa_insumo(id){
  Swal.fire({
    title: "Anular la compra de insumo?",
    text: "La compra se anulará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, anular!",
  }).then((result) => {
    if (result.isConfirmed) {
      compra_insumo_anular(id);
    }
  });
}

function compra_insumo_anular(id) {
  $.ajax({
    url: "/compras/compra_insumo_anular",
    type: "POST",
    data: { id: id },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        cargar_contenido('contenido_principal','/compra_insumos');
        return Swal.fire(
          "Compar de insumo anulada",
          "La compra se anulo con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Error",
        "No se pudo anular la compra, error en la matrix",
        "error"
      );
    }
  });
}

///// mediamento
function registra_tipo_medicamento() {
  var valor = $("#tipo_medicamento").val();

  $("#mensaje_tipo_m_success").text("");
  $(".alerta_smsm_tipo_m_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_m").text("Ingrese el tipo de medicamento");
    $(".alerta_smsm_tipo_m").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_m").text("");
    $(".alerta_smsm_tipo_m").hide(1000);
  }

  funcion = "registra_tipo_medicamento";

  $.ajax({
    type: "POST",
    url: "/compras/accion_tipo_medicamento",
    data: { valor: valor, funcion: funcion },
    success: function (response) {
      if (response == 1) {

        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_medicamento").val("");

        $("#mensaje_tipo_m_success").text("El tipo de medicamento se creo con exito");
        $(".alerta_smsm_tipo_m_success").show(3000);
        
        tabla_tipo_medicamento.ajax.reload();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_m").text("El tipo de medicamento: '" + valor + "', ya existe");
        $(".alerta_smsm_tipo_m").show(1000);

      } else {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_m").text("Error:" + response);
        $(".alerta_smsm_tipo_m").show(1000);

      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function Listar_tipo_medicamento() {
  tabla_tipo_medicamento = $("#tabla_tipo_m_").DataTable({
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
      url: "/compras/listar_tipo_medicamento",
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
    order: [[0, "ASC"]],
  });

  //esto es para crearn un contador para la tabla este contador es automatico
  tabla_tipo_medicamento.on("draw.dt", function () {
    var pageinfo = $("#tabla_tipo_m_").DataTable().page.info();
    tabla_tipo_medicamento
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_tipo_m_").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_medicamento.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo medicamento se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_medicamento(id, dato);
    }
  });
});

$("#tabla_tipo_m_").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_medicamento.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del tipo medicamento se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_tipo_medicamento(id, dato);
    }
  });
});

function cambiar_estado_tipo_medicamento(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  funcion = "estado_tipo_medicamento";

  $.ajax({
    url: "/compras/accion_tipo_medicamento",
    type: "POST",
    data: { id: id, dato: dato, funcion: funcion },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        
        tabla_tipo_medicamento.ajax.reload();

        return Swal.fire(
          "Estado de medicamento",
          "El estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado de medicamento",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_tipo_m_").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_tipo_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_tipo_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_tipo_medicamento.row(this).data();
  }

  $("#mensaje_tipo_m_success").text("");
  $(".alerta_smsm_tipo_m_success").hide(1000);

  $("#mensaje_tipo_m").text("");
  $(".alerta_smsm_tipo_m").hide(1000);

  document.getElementById("id_tipo_m").value = data.id;
  document.getElementById("tipo_medicamento").value = data.tipo;

  $("#unir_texto").text("Editar tipo de medicamento");
  $("#btn_registrar").hide();
  $("#btn_editar").show();
  $("#btn_nuevo").show();
});

function editar_tipo_medicamento() {
  var id = $("#id_tipo_m").val();
  var valor = $("#tipo_medicamento").val();

  $("#mensaje_tipo_m_success").text("");
  $(".alerta_smsm_tipo_m_success").hide(1000);

  if (valor.length == 0 || valor.trim() == "") {
    $("#mensaje_tipo_m").text("Ingrese el tipo de medicamento");
    $(".alerta_smsm_tipo_m").show(3000);
    return false;
  } else {
    $("#mensaje_tipo_m").text("");
    $(".alerta_smsm_tipo_m").hide(1000);
  }

  funcion = "editar_tipo_medicamento";

  $.ajax({
    type: "POST",
    url: "/compras/accion_tipo_medicamento",
    data: { valor: valor, funcion: funcion, id: id },
    success: function (response) {

      if (response == 1) {

        $(".card-dark").LoadingOverlay("hide");
        $("#tipo_medicamento").val("");
        $("#id_tipo_m").val("");

        $("#mensaje_tipo_m_success").text("El tipo de insumo se edito con exito");
        $(".alerta_smsm_tipo_m_success").show(3000);
        
        tabla_tipo_medicamento.ajax.reload();

        $("#unir_texto").text("Registrar tipo medicamento");
        $("#btn_registrar").show();
        $("#btn_editar").hide();
        $("#btn_nuevo").hide();

      } else if (response == 2) {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_m").text("El tipo de medicamento: '" + valor + "', ya existe");
        $(".alerta_smsm_tipo_m").show(1000);

      } else {

        $(".card-dark").LoadingOverlay("hide");
        $("#mensaje_tipo_m").text("Error:" + response);
        $(".alerta_smsm_tipo_m").show(1000);

      }
    },

    beforeSend: function () {
      $(".card-dark").LoadingOverlay("show", {
        text: "Cargando...",
      });
    },
  });
}

function registrar_medicamentos(){
  Swal.fire({
    title: 'Guardar registro?',
    text: "El registro se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_medicamento();
    }
  })
}

function guardar_medicamento(){
  var codigo = $("#codigo_medicamento").val();
  var nombre = $("#nombre").val();
  var tipo = $("#tipo_id").val();
  var cantidad = $("#cantidad").val();
  var precio = $("#precio_c").val(); 
  var detalle = $("#detalle_m").val(); 

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_registro_medicamento(
      codigo,
      nombre,
      tipo, 
      cantidad,
      precio, 
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
    $("#cantidad_obligg").html("");
    $("#precio_obligg").html(""); 
    $("#detalle_obligg").html("");
  }

  var formdata = new FormData();
  var foto = $("#foto")[0].files[0];
  //est valores son como los que van en la data del ajax
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo); 
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio); 
  formdata.append("detalle", detalle);
  formdata.append("foto", foto);

  $.ajax({
    url: "/compras/registrar_medicamento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {
          $(".card-success").LoadingOverlay("hide");
          cargar_contenido("contenido_principal", "/medicamentos");

          return Swal.fire(
            "Medicamento creado con exito",
            "El medicamento se creo con exito",
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
          "No se pudo crear el medicamento, falla en la matrix",
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

function validar_registro_medicamento(
  codigo,
  nombre,
  tipo, 
  cantidad,
  precio, 
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig").html("Ingrese código");
  } else {
    $("#codigo_oblig").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg").html("Ingrese nombre del medicamento");
  } else {
    $("#nombre_obligg").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg").html("Ingrese el tipo medicamento");
  } else {
    $("#tipo_obligg").html("");
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

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg").html("Ingrese el detalle del medicamento");
  } else {
    $("#detalle_obligg").html("");
  }

}

function listar_medicamento() {
  tabla_medicamento = $("#tabla_medicamento").DataTable({
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
      url: "/compras/listar_medicamento",
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
      { data: "tipo" }, 
      {
        data: "foto",
        render: function (data, type, row) {
          // {{url_for('static', filename='assets/img/admin-avatar.png')}}
          return (
            "<img class='img-circle' src='static/uploads/medicamento/" +
            data +
            "' width='50px' />"
          );
        },
      },
      { data: "cantidad" },
      { data: "precio" },
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
  tabla_medicamento.on("draw.dt", function () {
    var pageinfo = $("#tabla_medicamento").DataTable().page.info();
    tabla_medicamento
      .column(0, { page: "current" })
      .nodes()
      .each(function (cell, i) {
        cell.innerHTML = i + 1 + pageinfo.start;
      });
  });
}

$("#tabla_medicamento").on("click", ".inactivar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_medicamento.row(this).data();
  }
  var dato = 0;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado de medicamento se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_medicamento(id, dato);
    }
  });
});

$("#tabla_medicamento").on("click", ".activar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_medicamento.row(this).data();
  }
  var dato = 1;
  var id = data.id;

  Swal.fire({
    title: "Cambiar estado?",
    text: "El estado del medicamento se cambiará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, cambiar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cambiar_estado_medicamento(id, dato);
    }
  });
});

function cambiar_estado_medicamento(id, dato) {
  var res = "";
  if (dato == 1) {
    res = "activo";
  } else {
    res = "inactivo";
  }

  $.ajax({
    url: "/compras/estado_medicamento",
    type: "POST",
    data: { id: id, dato: dato },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        tabla_medicamento.ajax.reload();
        return Swal.fire(
          "Estado del medicamento",
          "EL estado se " + res + " con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Estado del medicamento",
        "No se pudo cambiar el estado, error en la matrix",
        "error"
      );
    }
  });
}

$("#tabla_medicamento").on("click", ".editar", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_medicamento.row(this).data();
  }

  $("#id_medicamento_edit").val(data.id);
  $("#codigo_medicamento_edit").val(data.codigo);
  $("#nombre_edit").val(data.nombre);
  $("#tipo_id_edit").val(data.tipo_id).trigger("change");
  $("#cantidad_edit").val(data.cantidad);
  $("#precio_c_edit").val(data.precio);
  $("#detalle_m_edit").val(data.detalle); 

  $("#codigo_oblig_edi").html(""); 
  $("#nombre_obligg_edi").html(""); 
  $("#tipo_obligg_edi").html(""); 
  $("#cantidad_obligg_edi").html(""); 
  $("#precio_obligg_edi").html(""); 
  $("#detalle_obligg_edi").html("");  

  $("#modal_editar_medicamento").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_medicamento").modal("show");
});

function editar_medicamento(){
  var id = $("#id_medicamento_edit").val();
  var codigo = $("#codigo_medicamento_edit").val();
  var nombre = $("#nombre_edit").val();
  var tipo = $("#tipo_id_edit").val();
  var cantidad = $("#cantidad_edit").val();
  var precio = $("#precio_c_edit").val(); 
  var detalle = $("#detalle_m_edit").val(); 

  if (
    codigo.length == 0 ||
    codigo.trim() == "" ||
    nombre.length == 0 ||
    nombre.trim() == "" ||
    tipo == 0 ||
    tipo.trim() == "0" ||
    cantidad < 0 ||
    cantidad.trim() == "" ||
    precio < 0 ||
    precio.trim() == "" ||
    detalle.length == 0 ||
    detalle.trim() == ""
  ) {
    validar_editar_medicamento(
      codigo,
      nombre,
      tipo, 
      cantidad,
      precio, 
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
    $("#cantidad_obligg_edi").html("");
    $("#precio_obligg_edi").html(""); 
    $("#detalle_obligg_edi").html("");
  }

  var formdata = new FormData(); 
  formdata.append("id", id);
  formdata.append("codigo", codigo);
  formdata.append("nombre", nombre);
  formdata.append("tipo", tipo); 
  formdata.append("cantidad", cantidad);
  formdata.append("precio", precio); 
  formdata.append("detalle", detalle); 

  $.ajax({
    url: "/compras/editar_medicamento",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp == 1) {

          $(".bg-primary").LoadingOverlay("hide");
          $("#modal_editar_medicamento").modal("hide");
          tabla_medicamento.ajax.reload();
          return Swal.fire(
            "Medicamento editado con exito",
            "El medicamento se edito con exito",
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
          "No se pudo editar el medicamento, falla en la matrix",
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

function validar_editar_medicamento(
  codigo,
  nombre,
  tipo, 
  cantidad,
  precio, 
  detalle
) {
  if (codigo.length == 0 || codigo.trim() == "") {
    $("#codigo_oblig_edi").html("Ingrese código");
  } else {
    $("#codigo_oblig_edi").html("");
  }

  if (nombre.length == 0 || nombre.trim() == "") {
    $("#nombre_obligg_edi").html("Ingrese nombre del medicamento");
  } else {
    $("#nombre_obligg_edi").html("");
  }

  if (tipo == 0 || tipo.trim() == "") {
    $("#tipo_obligg_edi").html("Ingrese el tipo medicamento");
  } else {
    $("#tipo_obligg_edi").html("");
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

  if (detalle.length == 0 || detalle.trim() == "") {
    $("#detalle_obligg_edi").html("Ingrese el detalle del medicamento");
  } else {
    $("#detalle_obligg_edi").html("");
  }
}

$("#tabla_medicamento").on("click", ".photo", function () {
  //esto esta extrayendo los datos de la tabla el (data)
  var data = tabla_medicamento.row($(this).parents("tr")).data(); //a que fila deteta que doy click
  //esta condicion es importante para el responsibe porque salda un error si no lo pongo
  if (tabla_medicamento.row(this).child.isShown()) {
    //esto es cuando esta en tamaño responsibo
    var data = tabla_medicamento.row(this).data();
  }

  var id = data.id;
  var foto = data.foto;

  $("#id_cerdo_foto").val(id);
  $("#foto_actu_c").val(foto);
  $("#img_cerdo").attr("src", "static/uploads/medicamento/" + foto);

  $("#foto_new_c").val("");

  $("#modal_editar_foto_medicamento").modal({ backdrop: "static", keyboard: false });
  $("#modal_editar_foto_medicamento").modal("show");
});

function editar_foto_medicamento() {
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
    url: "/compras/cambiar_foto_medicamento",
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
          tabla_medicamento.ajax.reload();
          $("#modal_editar_foto_medicamento").modal("hide");
          return Swal.fire(
            "Foto cambiada",
            "La foto del medicamento se cambio con exito",
            "success"
          );

        }
      } else {
        $(".modal-body").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "Error al cambiar la foto del medicamento",
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

//// COMPRAS DE MEDICAMENTOS 
function registra_compra_medicamento(){
  Swal.fire({
    title: 'Guardar compra de medicamento?',
    text: "La compra se guardará en el sistema!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      guardar_compra_medicamentoo();
    }
  })
}

function guardar_compra_medicamentoo(){
  var proveedor = $("#proveedor").val(); 
  var fecha_c = $("#fecha_c").val(); 
  var numero_compra = $("#numero_compra").val(); 
  var tipo_comprobante = $("#tipo_comprobante").val(); 
  var iva = $("#iva").val(); 

  var subtotal = $("#subtotal").val(); 
  var impuesto_sub = $("#impuesto_sub").val(); 
  var total_pagar = $("#total_pagar").val(); 
  var count = 0;

  if(proveedor == "0" || 
  numero_compra.length == 0 || 
  numero_compra.trim() == "" ||
  iva.length == 0 || 
  iva.trim() == ""){

    validar_registro_compra_medicamento(proveedor,numero_compra,iva);
    return swal.fire(
      "Campo vacios",
      "Los campos no deben quedar vacios, complete los datos",
      "warning"
    );
  }else{ 
      $("#proveedor_obligg").html(""); 
      $("#numero_c_obligg").html(""); 
      $("#ivaa_obligg").html("");
  }

  $("#tabla_compra_medicamentoo tbody#tbody_tabla_compra_medicamentoo tr").each(function () {
      count++;
    }
  );

  if(count == 0){ 
    $("#unir_no_hay").html('<span class="badge badge-danger"><b>.:No hay medicamento en el detalle de compra:.</b></span>');
    return swal.fire(
      "Detalle vacío",
      "No hay medicamento en el detalle de compra",
      "warning"
    );
  }else{
    $("#unir_no_hay").html("");
  }

  var formdata = new FormData();
  formdata.append("proveedor", proveedor);
  formdata.append("fecha_c", fecha_c);
  formdata.append("numero_compra", numero_compra);
  formdata.append("tipo_comprobante", tipo_comprobante);
  formdata.append("iva", iva);
  formdata.append("subtotal", subtotal);
  formdata.append("impuesto_sub", impuesto_sub);
  formdata.append("total_pagar", total_pagar); 

  $.ajax({
    url: "/compras/registrar_compra_medicamentoo",
    type: "POST",
    //aqui envio toda la formdata
    data: formdata,
    contentType: false,
    processData: false,
    success: function (resp) {
      if (resp > 0) {
        if (resp != 2) {
          guardar_detalle_compra_medicamento(parseInt(resp));
        } else {
          $(".card-success").LoadingOverlay("hide");
          return Swal.fire(
            "Número de compra ya existe",
            "El número de compra: '" + numero_compra + "', ya existe en el sistema",
            "warning"
          );
        } 

      } else {

        $(".card-success").LoadingOverlay("hide");
        return Swal.fire(
          "Error",
          "No se pudo crear la compra, falla en la matrix",
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

function validar_registro_compra_medicamento(proveedor,numero_compra,iva) {
  if (proveedor == "0") {
    $("#proveedor_obligg").html("Seleccione el proveedor");
  } else {
    $("#proveedor_obligg").html("");
  }

  if (numero_compra.length == 0 || numero_compra.trim() == "") {
    $("#numero_c_obligg").html("Ingrese número compra");
  } else {
    $("#numero_c_obligg").html("");
  }

  if (iva.length == 0 || iva.trim() == "") {
    $("#ivaa_obligg").html("Ingrese el iva");
  } else {
    $("#ivaa_obligg").html("");
  }
}

function guardar_detalle_compra_medicamento(id){
  var count = 0;
  var arrego_alimento = new Array();
  var arreglo_precio = new Array();
  var arreglo_cantidad = new Array();
  var arreglo_descuento = new Array();
  var arreglo_subtotal = new Array();

  $("#tabla_compra_medicamentoo tbody#tbody_tabla_compra_medicamentoo tr").each(
    function () {
      arrego_alimento.push($(this).find("td").eq(0).text());
      arreglo_precio.push($(this).find("td").eq(3).text());
      arreglo_cantidad.push($(this).find("#cantida_a").val());
      arreglo_descuento.push($(this).find("#descuento_a").val());
      arreglo_subtotal.push($(this).find("td").eq(6).text());
      count++;
    }
  );

  //aqui combierto el arreglo a un string
  var ida = arrego_alimento.toString();
  var precio = arreglo_precio.toString();
  var cantidad = arreglo_cantidad.toString();
  var descuento = arreglo_descuento.toString();
  var total = arreglo_subtotal.toString();

  if (count == 0) {
    return false;
  }

  $.ajax({
    url: "/compras/registrar_detalle_compra_medicamento",
    type: "POST",
    data: { 
      id: id,
      ida: ida,
      precio: precio,
      cantidad: cantidad,
      descuento: descuento,
      total: total,
    },
  }).done(function (resp) {
    if (resp > 0) {
      if (resp == 1) {
        Swal.fire({
          title: "Campra realizada con exito",
          text: "Desea imprimir la compra??",
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Imprimir!!",
        }).then((result) => {
          if (result.value) {
            window.open("/reporte/compra_medicamento/" + parseInt(id) + "#zoom=100%", "Reporte de compra","scrollbards=No");
            cargar_contenido('contenido_principal','/compra_medicamento');
          }
        });
        cargar_contenido('contenido_principal','/compra_medicamento');
      }
    } else {

      return Swal.fire(
        "Error",
        "No se pudo crear el detalle de compra, falla en la matrix",
        "error"
      );

    }
  });
}

function anular_compa_medicamento(id){
  Swal.fire({
    title: "Anular la compra de medicamento?",
    text: "La compra se anulará!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, anular!",
  }).then((result) => {
    if (result.isConfirmed) {
      compra_medicamento_anular(id);
    }
  });
}

function compra_medicamento_anular(id) {
  $.ajax({
    url: "/compras/compra_medicamento_anular",
    type: "POST",
    data: { id: id },
  }).done(function (response) {
    if (response > 0) {
      if (response == 1) {
        cargar_contenido('contenido_principal','/compra_medicamento');
        return Swal.fire(
          "Compar de medicamento anulada",
          "La compra se anulo con extio",
          "success"
        );
      }
    } else {
      return Swal.fire(
        "Error",
        "No se pudo anular la compra, error en la matrix",
        "error"
      );
    }
  });
}