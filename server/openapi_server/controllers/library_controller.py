import connexion
import six

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

from openapi_server import util

from common.models.User import User, UserSchema
from common.models.LanguageHistory import LanguageHistory
from common.models.SchoolLevel import SchoolLevel, SchoolLevelSchema
from common.models.SchoolLevelTranslation import SchoolLevelTranslation, SchoolLevelTranslationSchema
from common.models.ShortStory import ShortStory, ShortStorySchema
from common.models.ShortStoryTranslation import ShortStoryTranslation, ShortStoryTranslationSchema
from common.models.ShortStoryContent import ShortStoryContent, ShortStoryContentSchema
from common.models.MultipleChoiceQuestion import MultipleChoiceQuestion, MultipleChoiceQuestionSchema

import logging

@jwt_required
def fetch_library(body):  # noqa: E501
    """Fetch the library for the current user

    Fetch the library for the current user # noqa: E501


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
    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()

    school_levels = SchoolLevel.query.filter_by(language=user.native_language).all()

    short_stories = []

    school_level = None
    default_school_level = None
    default_story = None
    if school_levels:
        default_school_level = school_levels[0].id
        school_level = SchoolLevelTranslation.query.filter_by(school_level_id=default_school_level, language=user.language_i_want_to_learn).one_or_none()

    grade = int(body.get('grade', default_school_level))
    if grade:
        short_stories = ShortStory.query.filter_by(school_level_id=grade).all()
        if short_stories:
            default_story = short_stories[0].id

    story = int(body.get('story', default_story))


    short_story = None
    short_story_illustration = None
    short_story_content = None
    multiple_choice_questions = []
    if default_story:
        short_story_illustration = ShortStory.query.filter_by(id=story).one_or_none()
        short_story = ShortStoryTranslation.query.filter_by(short_story_id=story, language=user.language_i_want_to_learn).one_or_none()
        short_story_content = ShortStoryContent.query.filter_by(short_story_id=story, language=user.language_i_want_to_learn).one_or_none()
        multiple_choice_questions = MultipleChoiceQuestion.query.filter_by(short_story_id=story, language=user.language_i_want_to_learn).all()
        if not short_story_content:
            return f"Cannot find story {default_story}", 400

    response = {
        'success': True,
        'message': 'Successfully fetched library',
        'currentUser': user_schema.dump(user),
        'schoolLevels': school_level_schema.dump(school_levels, many=True),
        'shortStories': short_story_schema.dump(short_stories, many=True),
        'grade': grade,
        'story': story,
        'schoolLevel': school_level_translation_schema.dump(school_level),
        'shortStory': short_story_translation_schema.dump(short_story),
        'shortStoryIllustration': short_story_schema.dump(short_story_illustration),
        'shortStoryContent': short_story_content_schema.dump(short_story_content),
        'multipleChoiceQuestions': multiple_choice_question_schema.dump(multiple_choice_questions, many=True),
    }
    return response
