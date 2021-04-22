const ruta = "http://localhost:4000/usuario";
function cargarUsuarios() {
  const body_usuarios = document.getElementById("body-usuarios");

  fetch(ruta, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      let usuarios = response.data;

      let filas = "";

      usuarios.forEach((usuario) => {
        filas += `\n<tr>
        <td class="cell">${usuario.id}</td>
        <td class="cell">${usuario.nombre}</td>
        <td class="cell">${usuario.correo}</td>
        <td class="cell">${usuario.edad}</td>
        <td class="cell">${usuario.fecha_nacimiento}</td>
        </tr>`;
      });

      $('#body-usuarios').append(filas);
    })
    .catch(err => console.log(err))
}
