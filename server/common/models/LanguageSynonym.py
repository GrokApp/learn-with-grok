from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

from sqlalchemy.sql import func

class LanguageSynonym(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    source = db.Column(db.String(20))
    short_name = db.Column(db.String(10))
    long_name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())
