import connexion
import six

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

from openapi_server.db import db
from openapi_server import util
import json
import math
import logging

from common.models.User import User, UserSchema
from common.models.LanguageHistory import LanguageHistory
from common.models.SchoolLevel import SchoolLevel, SchoolLevelSchema
from common.models.SchoolLevelTranslation import SchoolLevelTranslation, SchoolLevelTranslationSchema
from common.models.ShortStory import ShortStory, ShortStorySchema
from common.models.ShortStoryTranslation import ShortStoryTranslation, ShortStoryTranslationSchema
from common.models.ShortStoryContent import ShortStoryContent, ShortStoryContentSchema
from common.models.MultipleChoiceQuestion import MultipleChoiceQuestion, MultipleChoiceQuestionSchema
from common.models.MultipleChoiceQuestionTranslation import MultipleChoiceQuestionTranslation, MultipleChoiceQuestionTranslationSchema
from common.models.UserStoryAttempt import UserStoryAttempt, UserStoryAttemptSchema

@jwt_required
def answer(body):  # noqa: E501
    """Update user score when a correct answer is selected

    This can only be done by the logged in user. # noqa: E501

    :param body: Answer to multiple choice question
    :type body:

    :rtype: object
    """
    logging.warning(body)
    user_schema = UserSchema()
    school_level_schema = SchoolLevelSchema()
    school_level_translation_schema = SchoolLevelTranslationSchema()
    short_story_schema = ShortStorySchema()
    short_story_translation_schema = ShortStoryTranslationSchema()
    short_story_content_schema = ShortStoryContentSchema()
    multiple_choice_question_schema = MultipleChoiceQuestionSchema()
    multiple_choice_question_translation_schema = MultipleChoiceQuestionTranslationSchema()
    user_story_attempt_schema = UserStoryAttemptSchema()

    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()
    if not user:
        return "User does not exist", 400

    short_story_translation_id = body.get("shortStoryTranslationId")
    correct_answers = body.get("correctAnswers", [])
    responses = body.get("responses", {})
    question_id = body.get("questionId")
    number_of_questions = body.get("numberOfQuestions")
    complete = body.get("complete")

    user_story_attempt = UserStoryAttempt.query.filter_by(
        user_id=user.id,
        short_story_translation_id=short_story_translation_id
    ).order_by(UserStoryAttempt.created_at.desc()).first()

    if not user_story_attempt:
        user_story_attempt = UserStoryAttempt()
        user_story_attempt.score = 0
        user_story_attempt.user_id = user.id
        user_story_attempt.short_story_translation_id = short_story_translation_id
        user_story_attempt.language = body.get('language')

        db.session.add(user_story_attempt)
        db.session.commit()

    user_story_attempt.responses = json.loads(json.dumps(responses))
    logging.warning(complete)
    user_story_attempt.is_complete = complete

    points_per_question = 100.0 / number_of_questions
    points_per_correct_answer = points_per_question / len(correct_answers)
    # Scoring gives 100 if only right answers, deducts 25 for each wrong answer with a minimum of 0
    score = 0
    q_responses = responses.get(str(question_id))
    for answer in q_responses:
        if answer in correct_answers:
            score += points_per_correct_answer

    user_story_attempt.score += score
    if complete:
        user_story_attempt.score = round(user_story_attempt.score)
    db.session.add(user_story_attempt)
    db.session.commit()

    user_story_attempts = UserStoryAttempt.query.filter_by(
        user_id=user.id,
        short_story_translation_id=short_story_translation_id
    ).order_by(UserStoryAttempt.created_at.desc())

    return user_story_attempt_schema.dump(user_story_attempts, many=True)

@jwt_required
def new_attempt(body):  # noqa: E501
    """Update user score when a correct answer is selected

    This can only be done by the logged in user. # noqa: E501

    :param body: Answer to multiple choice question
    :type body:

    :rtype: object
    """
    logging.warning(body)
    user_story_attempt_schema = UserStoryAttemptSchema()

    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()
    if not user:
        return "User does not exist", 400

    short_story_translation_id = body.get("shortStoryTranslationId")

    user_story_attempt = UserStoryAttempt()
    user_story_attempt.score = 0
    user_story_attempt.user_id = user.id
    user_story_attempt.short_story_translation_id = short_story_translation_id
    user_story_attempt.language = user.language_i_want_to_learn
    user_story_attempt.is_complete = False

    db.session.add(user_story_attempt)
    db.session.commit()

    user_story_attempts = UserStoryAttempt.query.filter_by(
        user_id=user.id,
        short_story_translation_id=short_story_translation_id
    ).order_by(UserStoryAttempt.created_at.desc())

    return user_story_attempt_schema.dump(user_story_attempts, many=True)

@jwt_required
def fetch_attempts(body):  # noqa: E501
    """Update user score when a correct answer is selected

    This can only be done by the logged in user. # noqa: E501

    :param body: Answer to multiple choice question
    :type body:

    :rtype: object
    """
    logging.warning(body)
    user_story_attempt_schema = UserStoryAttemptSchema()

    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()
    if not user:
        return "User does not exist", 400

    short_story_translation_id = body.get("shortStoryTranslationId")

    user_story_attempts = UserStoryAttempt.query.filter_by(
        user_id=user.id,
        short_story_translation_id=short_story_translation_id
    ).order_by(UserStoryAttempt.created_at.desc()).all()

    return user_story_attempt_schema.dump(user_story_attempts, many=True)
