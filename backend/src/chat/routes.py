import json
from flask import Blueprint
from flask_socketio import SocketIO, send
import os
from model.general import generate_answer_without_rag

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "database.db")

chat_bp = Blueprint("chat", __name__)
socketio = SocketIO()  # Will be initialized in main.py

def model(msg):
    # msg is a dict, so access like this
    user_id = msg.get("userID")
    context = msg.get("context")
    message = generate_answer_without_rag(context)

    return {"userID": user_id, "context": message}

# WebSocket event for chat
@socketio.on("message", namespace="/chat")

def handle_message(msg):
    message = model(msg)
    response_data = {
        "answer": message,
        "status": "success"
    }
    send(json.dumps(response_data), namespace="/chat")