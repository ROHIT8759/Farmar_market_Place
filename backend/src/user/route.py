from flask import Blueprint, jsonify, request
import sqlite3
import os

user_bp = Blueprint("user", __name__)

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "database.db")

# establish connection
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# GET user by id
@user_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM user WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if user:
        return jsonify(dict(user))
    return jsonify({"error": "User not found"}), 404

