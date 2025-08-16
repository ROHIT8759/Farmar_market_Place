from flask import Flask
from marketplace.routes import products_bp
from home.routes import home_bp
from chat.routes import chat_bp, socketio
from user.route import user_bp

app = Flask(__name__)

app.register_blueprint(products_bp, url_prefix="/products")
app.register_blueprint(chat_bp, url_prefix="/chat")
app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(home_bp, url_prefix="/")

socketio.init_app(app, cors_allowed_origins="*")


if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)  # Run using socketio instead of app.run
