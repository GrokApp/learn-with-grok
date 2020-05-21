from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

from sqlalchemy.sql import func

class LanguageHistory(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    language = db.Column(db.String(10))
    years_of_study = db.Column(db.Integer())
    proficiency_level = db.Column(db.String(30))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())
