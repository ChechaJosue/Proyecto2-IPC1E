class Producto:
    def __init__(self, id, nombre, precio, descripcion, imagen):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.descripcion = descripcion
        self.imagen = imagen

    def dump(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'descripcion': self.descripcion,
            'imagen': self.imagen
        }