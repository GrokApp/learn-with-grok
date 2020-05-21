from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class ShortStoryTranslation(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    language = db.Column(db.String(10))
    title = db.Column(db.String(256))
    sequence = db.Column(db.Integer())
    word_count = db.Column(db.Integer())
    difficulty = db.Column(db.String(20))
    published_at = db.Column(db.DateTime())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())
    # TODO Eventually add who translated/vetted the story?

class ShortStoryTranslationSchema(ModelSchema):
    class Meta:
        model = ShortStoryTranslation
        sqla_session = db.session
