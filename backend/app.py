import jwt
import datetime
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, Profile, Message, Notice, LostFound, Counselling, Society, SocietyMember, Event
from flask_cors import CORS
import dotenv
import os
import bcrypt

dotenv.load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, resources={r"/*": {"origins" : {"*", "http://localhost:3000"}, "allow_headers" : "*"}})

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/")
def home():
    return {"message": "Campus Hub API running 🚀"}

@app.route('/login', methods=["POST"])
def login():
    data = request.json
    user = Profile.query.filter_by(username=data["username"], school_id=data["school_id"]).first()
    if user:
        if bcrypt.checkpw(data["password"].encode("utf-8"), user.password):
            token = jwt.encode(
                {"user_id": user.id, "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)},
                app.config["SECRET_KEY"],
                algorithm="HS256"
            )
            return {"message": "Login successful", "token": token}
    return {"message": "Login failed"}

@app.route('/logout', methods=["POST"])
def logout():
    return {"message": "Logged out successfully. Discard the token on client side."}

@app.route('/signup', methods=["POST"])
def signup():
    data = request.json
    user = Profile.query.filter_by(username=data["username"], school_id=data["school_id"]).first()
    if user:
        return {"message": "User already exists"}
    profile = Profile(name=data["name"], email=data["email"], username=data["username"], school_id=data["school_id"], password=bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()))
    db.session.add(profile)
    db.session.commit()
    return {"message": "User created successfully"}

@app.route("/profiles", methods=["GET", "POST"])
def profiles():
    if request.method == "GET":
        profiles = Profile.query.all()
        return jsonify([{"id": p.id, "name": p.name, "email": p.email, "role": p.role} for p in profiles])

    if request.method == "POST":
        data = request.json
        profile = Profile(name=data["name"], email=data["email"], role=data.get("role", "student"), username=data["username"], school_id=data["school_id"], password=bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()))
        db.session.add(profile)
        db.session.commit()
        return jsonify({"id": profile.id, "name": profile.name}), 201

@app.route("/messages/<channel>", methods=["GET", "POST"])
def messages(channel):
    if request.method == "GET":
        msgs = Message.query.filter_by(channel=channel).all()
        return jsonify([{"id": m.id, "user_id": m.user_id, "content": m.content} for m in msgs])

    if request.method == "POST":
        data = request.json
        msg = Message(channel=channel, user_id=data["user_id"], content=data["content"])
        db.session.add(msg)
        db.session.commit()
        return jsonify({"id": msg.id, "content": msg.content}), 201

@app.route("/notices", methods=["GET", "POST"])
def notices():
    if request.method == "GET":
        notices = Notice.query.all()
        return jsonify([{"title": n.title, "body": n.body, "category": n.category} for n in notices])

    if request.method == "POST":
        data = request.json
        notice = Notice(title=data["title"], body=data["body"], category=data["category"], author_id=data["author_id"])
        db.session.add(notice)
        db.session.commit()
        return jsonify({"id": notice.id, "title": notice.title}), 201

@app.route("/lostfound", methods=["GET", "POST"])
def lostfound():
    if request.method == "GET":
        items = LostFound.query.all()
        return jsonify([{"item": i.item_name, "status": i.status} for i in items])

    if request.method == "POST":
        data = request.json
        item = LostFound(item_name=data["item_name"], description=data.get("description"), reporter_id=data["reporter_id"])
        db.session.add(item)
        db.session.commit()
        return jsonify({"id": item.id, "item": item.item_name}), 201

@app.route("/counselling", methods=["GET", "POST"])
def counselling():
    if request.method == "GET":
        sessions = Counselling.query.all()
        return jsonify([{"student_id": c.student_id, "type": c.type, "slot": c.slot.isoformat()} for c in sessions])

    if request.method == "POST":
        data = request.json
        booking = Counselling(student_id=data["student_id"], type=data["type"], counsellor_gender=data["counsellor_gender"], slot=data["slot"])
        db.session.add(booking)
        db.session.commit()
        return jsonify({"id": booking.id}), 201

@app.route("/societies", methods=["GET", "POST"])
def societies():
    if request.method == "GET":
        socs = Society.query.all()
        return jsonify([{"id": s.id, "name": s.name, "desc": s.description} for s in socs])

    if request.method == "POST":
        data = request.json
        soc = Society(name=data["name"], description=data.get("description"))
        db.session.add(soc)
        db.session.commit()
        return jsonify({"id": soc.id, "name": soc.name}), 201

@app.route("/events", methods=["GET", "POST"])
def events():
    if request.method == "GET":
        evs = Event.query.all()
        return jsonify([{"title": e.title, "time": e.time.isoformat() if e.time else None} for e in evs])

    if request.method == "POST":
        data = request.json
        ev = Event(title=data["title"], description=data.get("description"), location=data.get("location"), time=data.get("time"))
        db.session.add(ev)
        db.session.commit()
        return jsonify({"id": ev.id, "title": ev.title}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)