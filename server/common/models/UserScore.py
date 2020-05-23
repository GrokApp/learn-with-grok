from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db
from sqlalchemy.sql import func

class UserScore(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    username = db.Column(db.String(30))
    score = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())
