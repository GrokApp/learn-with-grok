from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema

from sqlalchemy.orm import relationship

class SchoolLevelTranslation(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    school_level_id = db.Column(db.Integer(), db.ForeignKey('school_level.id'))
    language = db.Column(db.String(10))
    name = db.Column(db.String(100))
    sequence = db.Column(db.Integer())

class SchoolLevelTranslationSchema(ModelSchema):
    class Meta:
        model = SchoolLevelTranslation
        sqla_session = db.session
