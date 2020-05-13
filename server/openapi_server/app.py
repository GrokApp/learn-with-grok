#!/usr/bin/env python3

import connexion

from openapi_server import encoder

import os
import datetime
import urllib

from dotenv import load_dotenv

from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .db import db

from common.models.SchoolLevel import SchoolLevel
from common.models.User import User
from common.models.LanguageHistory import LanguageHistory
from common.models.LanguageSynonym import LanguageSynonym


load_dotenv()

def init_app():
    app = connexion.App(__name__, specification_dir='./openapi/')

    pg_password = urllib.parse.quote_plus(os.getenv('PG_PASSWORD'))
    pg_url = f"postgresql://{os.getenv('PG_USER')}:{pg_password}@{os.getenv('PG_HOST')}:{os.getenv('PG_PORT')}/{os.getenv('PG_DBNAME')}"

    app.app.config['SQLALCHEMY_DATABASE_URI'] = pg_url

    db.init_app(app.app)
    migrate = Migrate(app.app, db)

    return app

def create_app():
    app = init_app()
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('openapi.yaml',
                arguments={'title': 'OpenAPI Petstore'},
                pythonic_params=True)



    CORS(app.app)
    app.app.config['JWT_SECRET_KEY'] = os.getenv('FLASK_JWT_TOKEN')
    app.app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=30)
    # app.app.config['JWT_BLACKLIST_ENABLED'] = True
    # app.app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
    jwt = JWTManager(app.app)
    # Testing
    app.run(port=8080)
    return app
