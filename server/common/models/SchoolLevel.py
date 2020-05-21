from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class SchoolLevel(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    language = db.Column(db.String(10))
    name = db.Column(db.String(100)) # Like ShortStory this is being used now to story the English name
    sequence = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

    short_stories = relationship('ShortStory')
    translations = relationship('SchoolLevelTranslation')

class SchoolLevelSchema(ModelSchema):
    class Meta:
        model = SchoolLevel
        sqla_session = db.session
