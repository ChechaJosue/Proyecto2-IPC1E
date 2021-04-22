const ruta = "http://localhost:4000/usuario";

function registrarUsuario(event) {
  event.preventDefault();
  let input_correo = document.getElementById("input-correo").value;
  let input_pwd = document.getElementById("input-pwd").value;
  let input_nombre = document.getElementById("input-nombre").value;
  let input_edad = document.getElementById("input-edad").value;
  let input_fecha = document.getElementById("input-fecha").value;

  let usuario = {
    correo: input_correo,
    pwd: input_pwd,
    nombre: input_nombre,
    edad: input_edad,
    fecha_nacimiento: input_fecha,
  };

  fetch(ruta, {
    method: "PUT",
    body: JSON.stringify(usuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      if (response.mensaje == "OK") {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        //alert("Usuario creado correctamente");
        Swal.fire({
          title: "Registro",
          text: `Usuario creado correctamente`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        window.location.href = "index.html";
      }else{
        Swal.fire({
          title: "Registro",
          text: `No se pudo registrar el usuario`,
          icon: "warning",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      // Recuperar usuario del local storage
      // let usuario = JSON.parse(localStorage.getItem("usuario"))
    })
    .catch((error) => console.log(error));
}

function logIn() {
  const input_correo = document.getElementById("input-correo");
  const input_pwd = document.getElementById("input-pwd");

  let login = {
    correo: input_correo.value,
    pwd: input_pwd.value,
  };

  console.log(login)

  fetch(`${ruta}/login`, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(response => {

    if(response.mensaje != "OK"){
      //alert('Credenciales inválidas')
      Swal.fire({
        title: "Iniciar sesión",
        text: `Credenciales inválidas`,
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    //alert(`Bienvenido ${response.usuario.nombre}`);
    Swal.fire({
      title: "Iniciar sesión",
      text: `Bienvenido ${response.usuario.nombre}`,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    window.location.href = 'index.html';
  })
}
