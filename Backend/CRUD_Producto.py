from flask.json import dump
from producto import Producto

class CRUD_Producto:
    def __init__(self):
        self.productos = []

    # Funcion para insertar un nuevo producto
    def insertar(self, nombre, precio, descripcion, imagen):
        id = len(self.productos)
        self.productos.append(Producto(id, nombre, precio, descripcion, imagen))
        return id

    # Funcion para obtener un producto por id
    def obtener_porid(self, id):
        for producto in self.productos:
            if producto.id == id:
                return producto.dump()

        # No se encontro el producto
        return None

    def cargaMasiva(self, productos_cm):
        for producto in productos_cm:
            self.insertar(producto['nombre'], producto['precio'], producto['descripcion'], producto['imagen'])
        return "OK"

    def obtener_todos(self):
        return [producto.dump() for producto in self.productos]