import json
from flask import Blueprint
from flask_socketio import SocketIO, send
from model.general import generate_answer_without_rag

chat_bp = Blueprint("chat", __name__)
socketio = SocketIO() 

def model(msg):
    user_id = msg.get("userID")
    context = msg.get("context")
    message = generate_answer_without_rag(context)

    return {"userID": user_id, "context": message}

@socketio.on("message", namespace="/chat")

def handle_message(msg):
    message = model(msg)
    response_data = {
        "answer": message,
        "status": "success"
    }
    send(json.dumps(response_data), namespace="/chat")