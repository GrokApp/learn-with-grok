from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class ShortStory(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    school_level_id = db.Column(db.Integer(), db.ForeignKey('school_level.id'))
    # Added a separate ShortStoryTranslation table, but we will keep all these other fields
    # and have the English translation on here as well as a record on the ShortStoryTranslation table
    language = db.Column(db.String(10))
    title = db.Column(db.String(256)) # Default title in English
    illustration_url = db.Column(db.String(128))
    sequence = db.Column(db.Integer())
    word_count = db.Column(db.Integer())
    difficulty = db.Column(db.String(20))
    published_at = db.Column(db.DateTime())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    # TODO Eventually add who translated/vetted the story?

    short_story_content = relationship('ShortStoryContent')
    short_story_translation = relationship('ShortStoryTranslation')
    multiple_choice_questions = relationship('MultipleChoiceQuestion')

class ShortStorySchema(ModelSchema):
    class Meta:
        model = ShortStory
        sqla_session = db.session

    # short_story_content = Nested('ShortStoryContentSchema', many=True)
    # short_story_translation = Nested('ShortStoryTranslationSchema', many=True)
    # multiple_choice_questions = Nested('MultipleChoiceQuestionSchema', many=True)
