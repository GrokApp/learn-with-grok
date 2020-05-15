from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

from sqlalchemy.orm import relationship

class SchoolLevel(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    language = db.Column(db.String(10))
    name = db.Column(db.String(100))
    sequence = db.Column(db.Integer())

    short_stories = relationship('ShortStory')
