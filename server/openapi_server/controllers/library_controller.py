import connexion
import six

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

from openapi_server import util

from common.models.User import User, UserSchema
from common.models.LanguageHistory import LanguageHistory
from common.models.SchoolLevel import SchoolLevel, SchoolLevelSchema
from common.models.ShortStory import ShortStory, ShortStorySchema

import logging


def fetch_library(body):  # noqa: E501
    """Fetch the library for the current user

    Fetch the library for the current user # noqa: E501


    :rtype: object
    """
    logging.warning(body)
    user_schema = UserSchema()
    school_level_schema = SchoolLevelSchema()
    short_story_schema = ShortStorySchema()
    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()

    school_levels = SchoolLevel.query.filter_by(language='GB').all()

    short_stories = []

    default_school_level = None
    default_story = None
    if school_levels:
        default_school_level = school_levels[0].id

    grade = int(body.get('grade', default_school_level))
    if grade:
        short_stories = ShortStory.query.filter_by(school_level_id=grade).all()
        if short_stories:
            default_story = short_stories[0].id


    response = {
        'success': True,
        'message': 'Successfully fetched library',
        'currentUser': user_schema.dump(user),
        'schoolLevels': school_level_schema.dump(school_levels, many=True),
        'shortStories': short_story_schema.dump(short_stories, many=True),
        'grade': grade,
        'story': default_story
    }
    return response
