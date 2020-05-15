from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

class ShortStoryContent(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    language = db.Column(db.String(10))
    content = db.Column(db.Text())
    illustration_url = db.Column(db.String(128))
