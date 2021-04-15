from flask.json import dump
from usuario import Usuario

class CRUD_Usuario:
    def __init__(self):
        self.usuarios = []

    # Funcion para insertar un nuevo usuario
    def insertar(self, correo, pwd, nombre, edad, fecha_nacimiento):
        id = len(self.usuarios)
        self.usuarios.append(Usuario(id, correo, pwd, nombre, edad, fecha_nacimiento))
        return id

    # Funcion para obtener un usuario por id
    def obtener_porid(self, id):
        for usuario in self.usuarios:
            if usuario.id == id:
                return usuario.dump()

        # No se encontro el usuario
        return None

    def obtener_todos(self):
        return [usuario.dump() for usuario in self.usuarios]