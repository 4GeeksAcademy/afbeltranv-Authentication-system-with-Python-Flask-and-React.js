"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, flash
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

#Login para usuarios - done
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first() #Valida que existe un usuario en la base de datos que estoy manejando
    
    if user is None or email != user.email or password != user.password:
        flash("Incorrect username or password", "error")
        return jsonify({"msg": "Incorrect username or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token":access_token       
        })

# Crea un nuevo usuario - done
@api.route('/signup' , methods=['POST'])
def sign_up():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()

    if user == None:
        new_user = User(email = body["email"], password = body["password"])
        db.session.add(new_user)
        db.session.commit()

        response_body = {
            "message": "Se creo un nuevo usuario con exito.",
            "flash_message": "Se ha creado usuario con exito"
        }
        return jsonify(response_body), 200
    

    response_body = {
            "message": "Ya existe el usuario que intenta crear",
            "flash_message": "Ya existe este usuario"
        }
    return jsonify(response_body), 401



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200 