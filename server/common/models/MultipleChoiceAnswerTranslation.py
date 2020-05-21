from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from sqlalchemy.sql import func

class MultipleChoiceAnswerTranslation(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    multiple_choice_question_id = db.Column(db.Integer(), db.ForeignKey('multiple_choice_question.id'))
    multiple_choice_question_translation_id = db.Column(db.Integer(), db.ForeignKey('multiple_choice_question_translation.id'))
    multiple_choice_answer_id = db.Column(db.Integer(), db.ForeignKey('multiple_choice_answer.id'))
    language = db.Column(db.String(10))
    answer = db.Column(db.Text())
    order = db.Column(db.Integer())
    is_correct = db.Column(db.Boolean())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

class MultipleChoiceAnswerTranslationSchema(ModelSchema):
    class Meta:
        model = MultipleChoiceAnswerTranslation
        sqla_session = db.session
