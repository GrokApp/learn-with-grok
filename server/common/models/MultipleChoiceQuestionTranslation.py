from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class MultipleChoiceQuestionTranslation(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    short_story_id = db.Column(db.Integer(), db.ForeignKey('short_story.id'))
    multiple_choice_question_id = db.Column(db.Integer(), db.ForeignKey('multiple_choice_question.id'))
    language = db.Column(db.String(10))
    question = db.Column(db.Text())
    sequence = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

    multiple_choice_answer_translations = relationship('MultipleChoiceAnswerTranslation')

class MultipleChoiceQuestionTranslationSchema(ModelSchema):
    class Meta:
        model = MultipleChoiceQuestionTranslation
        sqla_session = db.session

    multiple_choice_answer_translations = Nested('MultipleChoiceAnswerTranslationSchema', many=True)
