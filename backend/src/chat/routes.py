from flask import Blueprint
from flask_socketio import SocketIO, send

chat_bp = Blueprint("chat", __name__)
socketio = SocketIO()  # Will be initialized in main.py

# WebSocket event for chat
@socketio.on("message")
def handle_message(msg):
    print(f"Received: {msg}")
    send(msg)
