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

    def login(self, correo, pwd):
        for usuario in self.usuarios:
            if usuario.correo == correo and usuario.pwd == pwd:
                return usuario.dump()

        # No se encontro el usuario con correo y contraseña
        return None

    def cargaMasiva(self, usuarios_cm):
        for usuario in usuarios_cm:
            self.insertar(usuario['correo'], usuario['pwd'], usuario['nombre'], usuario['edad'], usuario['fecha_nacimiento'])
        return "OK"

    def obtener_todos(self):
        return [usuario.dump() for usuario in self.usuarios]