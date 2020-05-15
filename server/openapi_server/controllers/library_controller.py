import connexion
import six

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

from openapi_server import util

from common.models.User import User, UserSchema
from common.models.LanguageHistory import LanguageHistory
from common.models.SchoolLevel import SchoolLevel, SchoolLevelSchema

import logging


def fetch_library():  # noqa: E501
    """Fetch the library for the current user

    Fetch the library for the current user # noqa: E501


    :rtype: object
    """

    user_schema = UserSchema()
    school_level_schema = SchoolLevelSchema()
    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()

    school_levels = SchoolLevel.query.filter_by(language='GB').all()

    response = {
        'success': True,
        'message': 'Successfully fetched library',
        'currentUser': user_schema.dump(user),
        'schoolLevels': school_level_schema.dump(school_levels, many=True)
    }
    return response
