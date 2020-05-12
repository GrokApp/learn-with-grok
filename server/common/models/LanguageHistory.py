from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

class LanguageHistory(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    language = db.Column(db.String(10))
    years_of_study = db.Column(db.Integer())
    proficiency_level = db.Column(db.String(30))
