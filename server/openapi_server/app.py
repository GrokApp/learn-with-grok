#!/usr/bin/env python3

import connexion

from openapi_server import encoder

import os
import urllib

from dotenv import load_dotenv

from flask_cors import CORS
from flask_migrate import Migrate
from .db import db

from common.models.SchoolLevel import SchoolLevel

load_dotenv()

def create_app():
    app = connexion.App(__name__, specification_dir='./openapi/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'OpenAPI Petstore'},
                pythonic_params=True)

    pg_password = urllib.parse.quote_plus(os.getenv('PG_PASSWORD'))
    pg_url = f"postgresql://{os.getenv('PG_USER')}:{pg_password}@{os.getenv('PG_HOST')}:{os.getenv('PG_PORT')}/{os.getenv('PG_DBNAME')}"

    app.app.config['SQLALCHEMY_DATABASE_URI'] = pg_url

    CORS(app.app)

    db.init_app(app.app)
    migrate = Migrate(app.app, db)
    # Testing
    app.run(port=8080)
    return app
