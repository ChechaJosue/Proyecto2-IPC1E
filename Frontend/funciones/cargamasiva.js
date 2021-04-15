function verArchivo() {
    event.preventDefault();
    let archivo = document.getElementById('input-file').files[0];
    console.log(archivo)

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        console.log(event.target.result);
    })

    reader.readAsText(archivo, 'UTF-8');
}