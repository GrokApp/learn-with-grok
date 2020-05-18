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

from common.models.MultipleChoiceAnswer import MultipleChoiceAnswer
from common.models.MultipleChoiceQuestion import MultipleChoiceQuestion
from common.models.ShortStoryContent import ShortStoryContent
from common.models.ShortStoryTranslation import ShortStoryTranslation
from common.models.ShortStory import ShortStory
from common.models.LanguageHistory import LanguageHistory
from common.models.LanguageSynonym import LanguageSynonym
from common.models.SchoolLevel import SchoolLevel
from common.models.UserRole import UserRole
from common.models.User import User

load_dotenv()

@click.command("seed_db")
@with_appcontext
def seed_db():
    # db.session.execute('''TRUNCATE TABLE short_story_content''')
    # db.session.execute('''TRUNCATE TABLE short_story''')
    db.session.execute('''TRUNCATE TABLE school_level RESTART IDENTITY CASCADE''')
    db.session.commit()

    school_level1 = SchoolLevel(language='GB', name='Grade 1 Worksheets', sequence=100)
    school_level2 = SchoolLevel(language='GB', name='Grade 2 Worksheets', sequence=200)
    school_level3 = SchoolLevel(language='GB', name='Grade 3 Worksheets', sequence=300)
    school_level4 = SchoolLevel(language='GB', name='Grade 4 Worksheets', sequence=400)
    school_level5 = SchoolLevel(language='GB', name='Grade 5 Worksheets', sequence=500)
    db.session.add(school_level1)
    db.session.add(school_level2)
    db.session.add(school_level3)
    db.session.add(school_level4)
    db.session.add(school_level5)
    db.session.flush()

    short_story1 = ShortStory(school_level_id=school_level1.id, language='GB', title="The New Bicycle", sequence=100)
    short_story2 = ShortStory(school_level_id=school_level2.id, language='GB', title="Grandpa's Cooking", sequence=100)
    short_story3 = ShortStory(school_level_id=school_level3.id, language='GB', title="The Bee", sequence=100)
    short_story4 = ShortStory(school_level_id=school_level1.id, language='GB', title="Apples", sequence=200)

    db.session.add(short_story1)
    db.session.add(short_story2)
    db.session.add(short_story3)
    db.session.add(short_story4)
    db.session.flush()

    ss1 = """
    Emma has a new bicycle. It is bright pink and shiny.

    It was a gift from her uncle. He hid it behind a bush to surprise her.

    When Emma looked behind the bush and saw the bicycle, she jumped for joy. It was just what she wanted. She gave her uncle a big hug.

    She loves her new bicycle, and she loves her uncle.
    """
    short_story_content1 = ShortStoryContent(short_story_id=short_story1.id, language='GB', content=ss1, illustration_url="https://storage.cloud.google.com/grok-avatars/pink-bicycle-transparent.png?authuser=1")

    db.session.add(short_story_content1)
    db.session.flush()

    multiple_choice_question1 = MultipleChoiceQuestion(short_story_id=short_story1.id, language='GB', question="What color is the bicycle?", sequence=100)

    db.session.add(multiple_choice_question1)
    db.session.flush()

    multiple_choice_answer1 = MultipleChoiceAnswer(multiple_choice_question_id=multiple_choice_question1.id, language='GB', answer="Blue", order=1, is_correct=False)
    multiple_choice_answer2 = MultipleChoiceAnswer(multiple_choice_question_id=multiple_choice_question1.id, language='GB', answer="Green", order=2, is_correct=False)
    multiple_choice_answer3 = MultipleChoiceAnswer(multiple_choice_question_id=multiple_choice_question1.id, language='GB', answer="Pink", order=3, is_correct=True)
    multiple_choice_answer4 = MultipleChoiceAnswer(multiple_choice_question_id=multiple_choice_question1.id, language='GB', answer="Yellow", order=4, is_correct=False)

    db.session.add(multiple_choice_answer1)
    db.session.add(multiple_choice_answer2)
    db.session.add(multiple_choice_answer3)
    db.session.add(multiple_choice_answer4)

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
