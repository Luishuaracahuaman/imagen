from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import ORACLE_URI

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = ORACLE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
   # 🔥 CONFIGURACIÓN CORS PARA CODESPACES 🔥
    CORS(app, 
         origins=[
             "http://localhost:5173",
             "https://redesigned-acorn-*.app.github.dev",
             "http://10.0.1.192:5001",
             "http://10.0.1.192:5173"
         ],
         supports_credentials=True,
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization"])
    
    from .routes import productos_bp
    app.register_blueprint(productos_bp)

    return app