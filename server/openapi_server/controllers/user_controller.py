import connexion
import six

from openapi_server import util
from openapi_server.db import db

import bcrypt
import logging

from common.models.User import User
from common.models.LanguageHistory import LanguageHistory

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
    password_hash = bcrypt.hashpw(password, salt)

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

    return 'Success!', 200
