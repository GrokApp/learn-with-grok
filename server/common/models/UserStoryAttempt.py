from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class UserStoryAttempt(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    short_story_translation_id = db.Column(db.Integer(), db.ForeignKey('short_story_translation.id'))
    language = db.Column(db.String(10))
    score = db.Column(db.Integer())
    responses = db.Column(db.JSON())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

class UserStoryAttemptSchema(ModelSchema):
    class Meta:
        model = UserStoryAttempt
        sqla_session = db.session
