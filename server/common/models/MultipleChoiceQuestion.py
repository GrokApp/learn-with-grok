from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class MultipleChoiceQuestion(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    language = db.Column(db.String(10))
    question = db.Column(db.Text())
    sequence = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

    multiple_choice_answers = relationship('MultipleChoiceAnswer')

class MultipleChoiceQuestionSchema(ModelSchema):
    class Meta:
        model = MultipleChoiceQuestion
        sqla_session = db.session

    multiple_choice_answers = Nested('MultipleChoiceAnswerSchema', many=True)
