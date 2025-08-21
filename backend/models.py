from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class Profile(db.Model):
    __tablename__ = "profiles"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    school_id = db.Column(db.String, nullable=False)
    role = db.Column(db.String, default="student")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    channel = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey("profiles.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Notice(db.Model):
    __tablename__ = "notices"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    category = db.Column(db.String, nullable=False)  # main, events, teachers
    author_id = db.Column(db.String, db.ForeignKey("profiles.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class LostFound(db.Model):
    __tablename__ = "lost_found"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    item_name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String, default="lost")  # lost or found
    reporter_id = db.Column(db.String, db.ForeignKey("profiles.id"))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Counselling(db.Model):
    __tablename__ = "counselling"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    student_id = db.Column(db.String, db.ForeignKey("profiles.id"))
    type = db.Column(db.String, nullable=False)  # career / psychological
    counsellor_gender = db.Column(db.String)  # male / female
    slot = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Society(db.Model):
    __tablename__ = "societies"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class SocietyMember(db.Model):
    __tablename__ = "society_members"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    society_id = db.Column(db.String, db.ForeignKey("societies.id"))
    user_id = db.Column(db.String, db.ForeignKey("profiles.id"))
    role = db.Column(db.String, default="member")
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String)
    time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)