from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema

from sqlalchemy.orm import relationship

class ShortStory(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    school_level_id = db.Column(db.Integer(), db.ForeignKey('school_level.id'))
    language = db.Column(db.String(10))
    title = db.Column(db.String(256))
    sequence = db.Column(db.Integer())
    word_count = db.Column(db.Integer())
    difficulty = db.Column(db.String(20))

    short_story_content = relationship('ShortStoryContent')

class ShortStorySchema(ModelSchema):
    class Meta:
        model = ShortStory
        sqla_session = db.session
