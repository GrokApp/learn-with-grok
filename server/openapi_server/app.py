#!/usr/bin/env python3

import connexion

from openapi_server import encoder

import os
import datetime
import urllib

import click
from flask.cli import with_appcontext

from dotenv import load_dotenv

from flask_marshmallow import Marshmallow

from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .db import db, ma

from common.models.ShortStoryContent import ShortStoryContent
from common.models.ShortStory import ShortStory
from common.models.LanguageHistory import LanguageHistory
from common.models.LanguageSynonym import LanguageSynonym
from common.models.SchoolLevel import SchoolLevel
from common.models.User import User

load_dotenv()

@click.command("seed_db")
@with_appcontext
def seed_db():
    # db.session.execute('''TRUNCATE TABLE short_story_content''')
    # db.session.execute('''TRUNCATE TABLE short_story''')
    db.session.execute('''TRUNCATE TABLE school_level CASCADE''')
    db.session.commit()

    school_level1 = SchoolLevel(id=1, language='GB', name='Grade 1 Worksheets', sequence=100)
    school_level2 = SchoolLevel(id=2, language='GB', name='Grade 2 Worksheets', sequence=200)
    school_level3 = SchoolLevel(id=3, language='GB', name='Grade 3 Worksheets', sequence=300)
    school_level4 = SchoolLevel(id=4, language='GB', name='Grade 4 Worksheets', sequence=400)
    school_level5 = SchoolLevel(id=5, language='GB', name='Grade 5 Worksheets', sequence=500)
    db.session.add(school_level1)
    db.session.add(school_level2)
    db.session.add(school_level3)
    db.session.add(school_level4)
    db.session.add(school_level5)
    db.session.flush()

    short_story1 = ShortStory(id=1, school_level_id=school_level1.id, language='GB', title="The New Bicycle", sequence=100)
    short_story2 = ShortStory(id=2, school_level_id=school_level2.id, language='GB', title="Grandpa's Cooking", sequence=100)
    short_story3 = ShortStory(id=3, school_level_id=school_level3.id, language='GB', title="The Bee", sequence=100)
    short_story4 = ShortStory(id=4, school_level_id=school_level1.id, language='GB', title="Apples", sequence=200)

    db.session.add(short_story1)
    db.session.add(short_story2)
    db.session.add(short_story3)
    db.session.add(short_story4)

    db.session.commit()


def init_app():
    app = connexion.App(__name__, specification_dir='./openapi/')

    pg_password = urllib.parse.quote_plus(os.getenv('PG_PASSWORD'))
    pg_url = f"postgresql://{os.getenv('PG_USER')}:{pg_password}@{os.getenv('PG_HOST')}:{os.getenv('PG_PORT')}/{os.getenv('PG_DBNAME')}"

    app.app.config['SQLALCHEMY_DATABASE_URI'] = pg_url

    db.init_app(app.app)
    ma.init_app(app.app)
    migrate = Migrate(app.app, db)

    app.app.cli.add_command(seed_db)

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
