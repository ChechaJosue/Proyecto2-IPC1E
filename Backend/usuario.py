class Usuario:
    def __init__(self, id, correo, pwd, nombre, edad, fecha_nacimiento):
        self.id = id
        self.correo = correo
        self.pwd = pwd
        self.nombre = nombre
        self.edad = edad
        self.fecha_nacimiento = fecha_nacimiento

    def dump(self):
        return {
            'id': self.id,
            'correo': self.correo,
            'pwd': self.pwd,
            'nombre': self.nombre,
            'edad': self.edad,
            'fecha_nacimiento': self.fecha_nacimiento
        }