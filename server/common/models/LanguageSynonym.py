from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

class LanguageSynonym(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    source = db.Column(db.String(20))
    short_name = db.Column(db.String(10))
    long_name = db.Column(db.String(50))
