from logging import debug
from flask import Flask, request, jsonify
from flask_cors import CORS
from usuario import Usuario
from CRUD_Usuario import CRUD_Usuario


usuarios = CRUD_Usuario()
app = Flask(__name__)
CORS(app)

# Métodos de peticiones

# PUT -> insertar un nuevo dato
# GET -> recuperar dato
# POST -> modificar un dato
# DELETE -> eliminar un dato

# Códigos HTTP comunes

# 200 -> OK
# 201 -> creado
# 400 -> peticion incorrecta
# 404 -> No se encontro

# return jsonify ({ JSON }), codigo_http

# Registrar un nuevo usuario
@app.route('/usuario', methods=['PUT'])
def insertarUsuario():
    correo = request.json["correo"]
    pwd = request.json["pwd"]
    nombre = request.json["nombre"]
    edad = request.json["edad"]
    fecha_nacimiento = request.json["fecha_nacimiento"]

    id = usuarios.insertar(correo, pwd, nombre, edad, fecha_nacimiento)
    return jsonify({ "mensaje": "OK",
     "usuario": {"id": id, "correo": correo, "pwd": pwd, "nombre": nombre, "edad": edad, "fecha_nacimiento": fecha_nacimiento}
    }), 200


@app.route('/usuario/login', methods=['POST'])
def logIn():
    correo = request.json["correo"]
    pwd = request.json["pwd"]
    
    usuario = usuarios.login(correo, pwd)

    if usuario:
        return jsonify({ "mensaje": "OK", "usuario": usuario}), 200
    else:
        return jsonify({ "mensaje": "Credenciales inválidas"}), 404

@app.route('/usuario/carga-masiva', methods=['POST'])
def cargaMasiva():
    usuariosCM = request.json["usuarios"]
    print (usuariosCM)
    res = usuarios.cargaMasiva(usuariosCM)

    if res == "OK":
        return jsonify({ "mensaje": "OK", "data": usuarios.obtener_todos()}), 200
    else:
        return jsonify({ "mensaje": "Hubo un error al realizar la carga masiva"}), 404

# Recuperar todos los usuarios
@app.route('/usuario', methods=['GET'])
def getUsuarios():
    return jsonify({"mensaje": "OK", "data": usuarios.obtener_todos()}), 200

# Recuperar usuario por id
@app.route('/usuario/<string:id_usuario>', methods=['GET'])
def getUsuarioID(id_usuario):
    usuario = usuarios.obtener_porid(int(id_usuario))
    
    if usuario:
        return jsonify({"mensaje": "OK", "data": usuario}), 201
    else:
        return jsonify({"mensaje": "No se encontró el usuario"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=4000)

