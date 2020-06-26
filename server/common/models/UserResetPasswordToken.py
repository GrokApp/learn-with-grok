from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db
from sqlalchemy.sql import func

class UserResetPasswordToken(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    token = db.Column(db.String(36))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
