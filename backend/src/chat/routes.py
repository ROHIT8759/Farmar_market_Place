import json
from flask import Blueprint
from flask_socketio import SocketIO, send

import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "database.db")

chat_bp = Blueprint("chat", __name__)
socketio = SocketIO()  # Will be initialized in main.py

def processMessage(msg):
    # Process the incoming message
    # For example, you could save it to a database or perform some action
    print("Processing message:", msg)
    user_str = f"user{msg.userID}"
    return {"message": f"Message processed for {user_str}"}

# WebSocket event for chat
@socketio.on("message")

def handle_message(msg):
    message = processMessage(msg)
    send(json.dumps({"userId": msg.userID, "message": message}))