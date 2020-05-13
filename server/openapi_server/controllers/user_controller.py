import connexion
import six

from openapi_server import util
from openapi_server.db import db

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

import bcrypt
import logging

from common.models.User import User, UserSchema
from common.models.LanguageHistory import LanguageHistory

blacklist = set()

# @jwt.token_in_blacklist_loader
# def check_if_token_in_blacklist(decrypted_token):
#     jti = decrypted_token['jti']
#     return jti in blacklist

def create_user(body):  # noqa: E501
    """Create user

    This can only be done by the logged in user. # noqa: E501

    :param body: Created user object
    :type body:

    :rtype: object
    """
    logging.warning(body)
    password = body.get('password').encode('utf-8')
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password, salt).decode('utf-8')

    email_lower = body.get("email").lower()
    username = body.get("username")

    existing_user = User.query.filter_by(email_lower=email_lower).one_or_none()
    if existing_user:
        return "User already exists", 400

    if username:
        existing_username = User.query.filter_by(username=username).one_or_none()
        if existing_username:
            return "Username already exists", 400

    new_user = User()
    new_user.email = body.get("email")
    new_user.email_lower = email_lower
    if username:
        new_user.username = username
    new_user.native_language = body.get('nativeLanguage') or 'GB'
    new_user.language_i_want_to_learn = body.get('languageIWantToLearn')
    new_user.has_studied_foreign_language = body.get('hasStudiedForeignLanguage')
    new_user.password_hash = password_hash
    new_user.salt = salt
    db.session.add(new_user)
    # here we says that db.session.add(new_user) is a pending transaction. This will allow us to get its id
    db.session.flush()

    for language_studied in body.get('languageHistory'):
        lh = LanguageHistory(user_id=new_user.id)
        lh.language = language_studied.get('language')
        lh.years_of_study = language_studied.get('yearsOfStudy')
        lh.proficiency_level = language_studied.get('proficiencyLevel')
        db.session.add(lh)

    db.session.commit()

    access_token = create_access_token(identity=email_lower)

    response = {
        'success': True,
        'message': 'User created successfully',
        'accessToken': access_token
    }
    return response, 200


def login(body):  # noqa: E501
    """Login

    Log in to grok # noqa: E501

    :param body: LoginInfo
    :type body:

    :rtype: object
    """
    password = body.get('password').encode('utf-8')

    email_lower = body.get("email").lower()
    username = body.get("username")

    existing_user = User.query.filter_by(email_lower=email_lower).one_or_none()
    if not existing_user:
        return "Could not find user with that email address", 400

    salt = existing_user.salt
    password_hash = bcrypt.hashpw(password, existing_user.password_hash.encode('utf-8'))

    # TODO add lock after too many incorrect attempts?
    if password_hash.decode() != existing_user.password_hash:
        return "Incorrect password", 400

    access_token = create_access_token(identity=email_lower)
    response = {
        'success': True,
        'message': 'User logged in successfully',
        'accessToken': access_token
    }
    return response, 200

@jwt_required
def logout():  # noqa: E501
    """Logout

    Log out of grok # noqa: E501

    :rtype: object
    """
    # jti = get_raw_jwt()['jti']
    # blacklist.add(jti)
    response = {
        'success': True,
        'message': 'User logged out successfully',
    }
    return response, 200

@jwt_required
def fetch_user():  # noqa: E501
    """Fetch User

    Get the current user # noqa: E501

    :rtype: object
    """
    # jti = get_raw_jwt()['jti']
    # blacklist.add(jti)
    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()
    user_schema = UserSchema()
    return user_schema.dump(user), 200
