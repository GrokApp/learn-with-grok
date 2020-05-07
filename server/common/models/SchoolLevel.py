from flask_sqlalchemy import SQLAlchemy
from openapi_server.db import db

class SchoolLevel(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
