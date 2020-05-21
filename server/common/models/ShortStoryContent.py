from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from sqlalchemy.sql import func

class ShortStoryContent(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    language = db.Column(db.String(10))
    content = db.Column(db.Text())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

class ShortStoryContentSchema(ModelSchema):
    class Meta:
        model = ShortStoryContent
        sqla_session = db.session
