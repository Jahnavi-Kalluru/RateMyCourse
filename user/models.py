from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
import uuid


class User:
    def start_session(self,user):
        from app import db
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200


    def signup(self):
        from app import db

        #Create user Object
        user = {
            "_id": uuid.uuid4().hex,
            "name": request.form.get('name'),
            "email": request.form.get('email') ,
            "password": request.form.get('password')
        }

        #encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])
        #check for email address duplication
        if db.user.find_one({"email": user['email']}):
            return jsonify({"error": "Email address already exist"}), 400

        if db.user.insert_one(user):
            return self.start_session(user)

        return jsonify({"error": "Signup failed"}), 400
    
    def signout(self):
        session.clear()
        return redirect('/')
    
    def login(self):
        from app import db
        user = db.user.find_one({
            "email" : request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
        
        return jsonify({ "error": "Invalid login credentials"}) , 401
    def feedback():
        from app import db

        # Get data from the request
        feedback_data = {
            "name": request.form.get('name'),
            "email": request.form.get('email'),
            "message": request.form.get('message')
        }

        # Insert feedback into the Feedback collection
        if db.feedback.insert_one(feedback_data):
            return jsonify({"message": "Feedback submitted successfully!"}), 201
        return jsonify({"error": "Failed to submit feedback."}), 400
