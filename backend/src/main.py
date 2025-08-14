from flask import Flask
import sqlite3
from flask_socketio import SocketIO
from marketplace.routes import products_bp
from home.routes import home_bp
from chat.routes import chat_bp, socketio

app = Flask(__name__)
app.register_blueprint(products_bp, url_prefix="/products")
app.register_blueprint(chat_bp, url_prefix="/chat")
app.register_blueprint(home_bp, url_prefix="/")

socketio.init_app(app, cors_allowed_origins="*")

def init_db():
    conn = sqlite3.connect('database.db')
    conn.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT
        )
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    socketio.run(app, debug=True)  # Run using socketio instead of app.run
