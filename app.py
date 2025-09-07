from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from functools import wraps

from pymongo import MongoClient
client = MongoClient('mongodb+srv://jahnavik:VijiJanu@cluster0.pvmpwdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.RateMyCourse
app = Flask(__name__)
app.secret_key = b'\xf2B\xf7}\xec-\x94P\xc6B\xa8\xb4G\xac+A'

#Decorative
def login_required(f):
   @wraps(f)
   def wrap(*args, **kwargs):
      if 'logged_in' in session:
         return f(*args, **kwargs)
      else:
         return redirect(url_for('home'))
   return wrap
#Routes
# from user import routes

# Import and register blueprint
from user.routes import user_blueprint
app.register_blueprint(user_blueprint)

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/index.html')
def index():
   return render_template('index.html')

@app.route('/about.html')
def about():
   return render_template('about.html')

@app.route('/services.html')
def services():
   return render_template('services.html')

@app.route('/blog.html')
def contact():
   return render_template('blog.html')

@app.route('/dashboard.html')
@login_required
def dashboard():
   return render_template('dashboard.html')

if __name__ == '__main__':
   port = int(os.environ.get("PORT", 5000))  # use Render's PORT if available
   app.run(host="0.0.0.0", port=port, debug=True)