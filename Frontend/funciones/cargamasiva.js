const ruta = "http://localhost:4000/usuario";

function cargaMasiva() {
  let archivo = document.getElementById("input-file").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarUsuarios(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function cargaMasivaProductos() {
  let archivo = document.getElementById("input-file-productos").files[0];
  console.log(archivo);

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    procesarProductos(event.target.result);
  });

  reader.readAsText(archivo, "UTF-8");
}

function procesarUsuarios(texto) {
  const textarea_res = document.getElementById("textarea-res");
  let usuarios_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let usuario_aux = linea.split(",");
      textarea_res.innerHTML += `
        Correo: ${usuario_aux[0]}
        Pwd: ${usuario_aux[1]}
        Nombre: ${usuario_aux[2]}
        Edad: ${usuario_aux[3]}
        Fecha nacimiento: ${usuario_aux[4]}
        -------------------------------------

        `;

      let usuario = {
        correo: usuario_aux[0],
        pwd: usuario_aux[1],
        nombre: usuario_aux[2],
        edad: usuario_aux[3],
        fecha_nacimiento: usuario_aux[4],
      };

      usuarios_array.push(usuario);
    }
  });

  console.log(usuarios_array);

  let usuariosCM = {
    usuarios: usuarios_array,
  };

  fetch(`${ruta}/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(usuariosCM),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.mensaje != "OK") {
        console.error(response.mensaje);
        //alert("Error al realizar la carga masiva");
        
        Swal.fire({
            title: "Carga masiva",
            text: "Error al realizar la carga masiva",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
      }

      //alert("Carga masiva realizada con ??xito");
      Swal.fire({
        title: "Carga masiva",
        text: "Carga masiva realizada con ??xito",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    });
}

function procesarProductos(texto) {
  let productos_array = [];
  console.log(texto);

  texto = texto.split("\n");

  texto.forEach((linea) => {
    if (linea != "") {
      let producto_aux = linea.split(",");

      let producto = {
        nombre: producto_aux[0],
        precio: producto_aux[1],
        descripcion: producto_aux[2],
        imagen: producto_aux[3],
      };

      productos_array.push(producto);
    }
  });

  console.log(productos_array);

  let productosCM = {
    productos: productos_array,
  };

  fetch(`http://localhost:4000/producto/carga-masiva`, {
    method: "POST",
    body: JSON.stringify(productosCM),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.mensaje != "OK") {
        console.error(response.mensaje);
        //alert("Error al realizar la carga masiva");
        
        Swal.fire({
            title: "Carga masiva",
            text: "Error al realizar la carga masiva",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
      }

      //alert("Carga masiva realizada con ??xito");
      Swal.fire({
        title: "Carga masiva",
        text: "Carga masiva realizada con ??xito",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    });
}