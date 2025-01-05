# from flask import Flask
# from app import app
# from user.models import User

# @app.route('/user/signup', methods=['GET'])
# def signup():
#     return User().signup()

from flask import Blueprint
from user.models import User

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@user_blueprint.route('/user/signout',methods=['GET'])
def signout():
    return User().signout()

@user_blueprint.route('/user/login', methods=['POST'])
def login():
    return User().login()