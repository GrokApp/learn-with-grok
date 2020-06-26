#!/usr/bin/env python3

import connexion

from openapi_server import encoder

import os
import datetime
import urllib
import json

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import click
from flask.cli import with_appcontext

from dotenv import load_dotenv

from flask_marshmallow import Marshmallow

from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .db import db, ma
from .cache import blob_cache

from common.models.UserStoryAttempt import UserStoryAttempt
from common.models.MultipleChoiceAnswerTranslation import MultipleChoiceAnswerTranslation
from common.models.MultipleChoiceQuestionTranslation import MultipleChoiceQuestionTranslation
from common.models.MultipleChoiceAnswer import MultipleChoiceAnswer
from common.models.MultipleChoiceQuestion import MultipleChoiceQuestion
from common.models.ShortStoryContent import ShortStoryContent
from common.models.ShortStoryTranslation import ShortStoryTranslation
from common.models.ShortStory import ShortStory
from common.models.LanguageHistory import LanguageHistory
from common.models.LanguageSynonym import LanguageSynonym
from common.models.SchoolLevelTranslation import SchoolLevelTranslation
from common.models.SchoolLevel import SchoolLevel
from common.models.UserResetPasswordToken import UserResetPasswordToken
from common.models.UserScore import UserScore
from common.models.UserRole import UserRole
from common.models.User import User

load_dotenv()


@click.command("seed_db")
@with_appcontext
def seed_db():
    # db.session.execute('''TRUNCATE TABLE short_story_content''')
    # db.session.execute('''TRUNCATE TABLE short_story''')

    print(os.getcwd())
    with open('openapi_server/data/grades.json', encoding='utf-8') as f:
        grades = json.load(f)

    print(grades)

    db.session.execute('''TRUNCATE TABLE school_level RESTART IDENTITY CASCADE''')
    db.session.commit()

    for idx, grade in enumerate(grades):
        school_level = SchoolLevel(language='GB', name=grade.get('GB'), sequence=(idx + 1) * 100)
        db.session.add(school_level)
        db.session.flush()
        for language, name in grade.items():
            translation = SchoolLevelTranslation(school_level_id=school_level.id, language=language, name=name,
                                                 sequence=(idx + 1) * 100)
            db.session.add(translation)

    db.session.commit()

    with open('openapi_server/data/stories.json', encoding='utf-8') as f:
        stories = json.load(f)

    for idx, story in enumerate(stories):
        grade = SchoolLevel.query.filter_by(name=story.get('grade')).one_or_none()
        short_story = ShortStory(school_level_id=grade.id, language='GB', title=story.get("title").get("GB"),
                                 sequence=(idx + 1) * 100, illustration_url=story.get("illustration_url"))
        db.session.add(short_story)
        db.session.flush()
        for language, title in story.get('title').items():
            translation = ShortStoryTranslation(short_story_id=short_story.id, language=language, title=title,
                                                sequence=(idx + 1) * 100)
            db.session.add(translation)

        db.session.commit()

        for language, content in story.get('content').items():
            content = "\n\n".join(content)
            content = ShortStoryContent(short_story_id=short_story.id, language=language, content=content)
            db.session.add(content)

        db.session.commit()

        for idx, q in enumerate(story.get("questions", [])):
            q_dict = {}
            english_question = q.get('question').get('GB')
            new_q = MultipleChoiceQuestion(
                short_story_id=short_story.id,
                language=language,
                question=english_question,
                sequence=(idx + 1) * 100
            )
            db.session.add(new_q)
            db.session.commit()
            for language, question in q.get('question').items():
                new_q_translation = MultipleChoiceQuestionTranslation(
                    short_story_id=short_story.id,
                    multiple_choice_question_id=new_q.id,
                    language=language,
                    question=question,
                    sequence=(idx + 1) * 100
                )
                q_dict[language] = new_q_translation
                db.session.add(new_q_translation)

            db.session.commit()

            order = 1
            for a in q.get("answers", []):
                is_correct = a.get("is_correct") == True
                english_answer = a.get("responses").get('GB')
                new_a = MultipleChoiceAnswer(
                    multiple_choice_question_id=new_q.id,
                    language=language,
                    answer=english_answer,
                    order=order,
                    is_correct=is_correct
                )
                db.session.add(new_a)
                db.session.commit()
                for language, answer in a.get("responses").items():
                    new_a_translation = MultipleChoiceAnswerTranslation(
                        multiple_choice_question_id=new_q.id,
                        multiple_choice_question_translation_id=q_dict[language].id,
                        multiple_choice_answer_id=new_a.id,
                        language=language,
                        answer=answer,
                        order=order,
                        is_correct=is_correct
                    )
                    db.session.add(new_a_translation)
                order += 1

            db.session.commit()

@click.command("send_email")
@with_appcontext
def send_email():
    message = Mail(
        from_email='no-reply@learnwithgrok.com',
        to_emails='craig5008@gmail.com',
        subject='Verify Learn with Grok Email')
    message.template_id = 'd-a6801f5ee6d0458197d515c6bbefa290'
    message.dynamic_template_data = {
        'verify_email_link': 'https://localhost:3000/verifyEmail'
    }
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)

def init_app():
    app = connexion.App(__name__, specification_dir='./openapi/')

    pg_password = urllib.parse.quote_plus(os.getenv('PG_PASSWORD'))
    pg_url = f"postgresql://{os.getenv('PG_USER')}:{pg_password}@{os.getenv('PG_HOST')}:{os.getenv('PG_PORT')}/{os.getenv('PG_DBNAME')}"

    app.app.config['SQLALCHEMY_DATABASE_URI'] = pg_url

    db.init_app(app.app)
    ma.init_app(app.app)
    migrate = Migrate(app.app, db)

    blob_cache.init_app(app.app)

    app.app.cli.add_command(seed_db)
    app.app.cli.add_command(send_email)

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
