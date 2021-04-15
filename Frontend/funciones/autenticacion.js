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
  .then(res => res.json())
  .then(function(response) {
      if(response.mensaje == "OK"){
          localStorage.setItem("usuario", JSON.stringify(usuario))
          alert('Usuario creado correctamente')
          window.location.href="index.html";
      }

      // Recuperar usuario del local storage
      // let usuario = JSON.parse(localStorage.getItem("usuario"))
  })
  .catch(error => console.log(error))
}
