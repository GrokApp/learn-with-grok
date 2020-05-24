from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db, ma
from marshmallow_sqlalchemy import ModelSchema
from marshmallow_sqlalchemy.fields import Nested

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    email = db.Column(db.Text(), unique=True)
    email_lower = db.Column(db.Text(), unique=True)
    username = db.Column(db.String(30), unique=True)
    password_hash = db.Column(db.String(128))
    native_language = db.Column(db.String(10))
    language_i_want_to_learn = db.Column(db.String(10))
    has_studied_foreign_language = db.Column(db.Boolean())
    avatar_url = db.Column(db.String(128))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    deleted_at = db.Column(db.DateTime())

    score = relationship('UserScore', uselist=False)
    language_history = relationship('LanguageHistory')

user_email_lower_index = db.Index('user_email_lower_idx', User.email_lower)
user_username_index = db.Index('user_username_idx', User.username)

if __name__ == '__main__':
    user_email_lower_index.create(bind=engine)
    user_username_index.create(bind=engine)

class UserSchema(ModelSchema):
    class Meta:
        model = User
        sqla_session = db.session

    score = Nested('UserScoreSchema')
