from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class UserScore(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    username = db.Column(db.String(30))
    score = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

class UserScoreSchema(ModelSchema):
    class Meta:
        model = UserScore
        sqla_session = db.session
