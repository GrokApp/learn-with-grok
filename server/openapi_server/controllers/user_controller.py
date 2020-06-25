import connexion
import six
import re

from openapi_server import util
from openapi_server.db import db

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

import uuid
import os
import bcrypt
import base64
import logging

from google.cloud import storage

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
    db.session.add(new_user)
    # here we says that db.session.add(new_user) is a pending transaction. This will allow us to get its id
    db.session.flush()

    for language_studied in body.get('languageHistory'):
        lh = LanguageHistory(uxser_id=new_user.id)
        lh.language = language_studied.get('language')
        lh.years_of_study = language_studied.get('yearsOfStudy')
        lh.proficiency_level = language_studied.get('proficiencyLevel')
        db.session.add(lh)

    db.session.commit()

    user_schema = UserSchema()
    access_token = create_access_token(identity=email_lower)

    response = {
        'success': True,
        'message': 'User created successfully',
        'accessToken': access_token,
        'currentUser': user_schema.dump(new_user)
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

    password_hash = bcrypt.hashpw(password, existing_user.password_hash.encode('utf-8'))

    # TODO add lock after too many incorrect attempts?
    if password_hash.decode() != existing_user.password_hash:
        return "Incorrect password", 400

    access_token = create_access_token(identity=email_lower)
    user_schema = UserSchema()
    response = {
        'success': True,
        'message': 'User logged in successfully',
        'accessToken': access_token,
        'currentUser': user_schema.dump(existing_user)
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

@jwt_required
def verify_email():  # noqa: E501
    # TODO Finish implementing this
    """Verify Email

    Get the current user # noqa: E501

    :rtype: object
    """
    # jti = get_raw_jwt()['jti']
    # blacklist.add(jti)
    current_user = get_jwt_identity()
    user = User.query.filter_by(email_lower=current_user).one_or_none()
    if not user.email_verified:
        user.email_verified = True
        db.session.add(user)
        db.session.commit()
    
    user_schema = UserSchema()
    return user_schema.dump(user), 200

@jwt_required
def update_user(body):  # noqa: E501
    """Update user

    This can only be done by the logged in user. # noqa: E501

    :param body: Update user object
    :type body:

    :rtype: object
    """
    logging.warning(body)
    email_lower = body.get("email").lower()
    existing_user = User.query.filter_by(email_lower=email_lower).one_or_none()
    if not existing_user:
        return "User does not exist", 400

    if body.get('username'):
        if not existing_user.username or (existing_user.username != body.get('username')):
            existing_username = User.query.filter_by(username=body.get('username')).one_or_none()
            if not existing_username:
                existing_user.username = body.get('username')
            else:
                return "Username already exists", 400

    if body.get('imageUrl'):
        existing_user.avatar_url = body.get('imageUrl')

    if body.get('nativeLanguage'):
        if not existing_user.native_language or (existing_user.native_language != body.get('nativeLanguage')):
            existing_user.native_language = body.get('nativeLanguage')

    if body.get('languageIWantToLearn'):
        if not existing_user.language_i_want_to_learn or (existing_user.language_i_want_to_learn != body.get('languageIWantToLearn')):
            existing_user.language_i_want_to_learn = body.get('languageIWantToLearn')

    db.session.add(existing_user)
    db.session.commit()

    user_schema = UserSchema()
    return user_schema.dump(existing_user), 200

@jwt_required
def upload_avatar(body):  # noqa: E501
    """Upload avatar

    This can only be done by the logged in user. # noqa: E501

    :param body: Upload avatar to Google cloud
    :type body:

    :rtype: object
    """
    logging.warning(body)
    if not body.get('image'):
        "Missing required parameter image", 400
    # Create a Cloud Storage client.
    gcs = storage.Client()

    # Get the bucket that the file will be uploaded to.
    bucket = gcs.get_bucket(os.getenv('CLOUD_STORAGE_BUCKET'))

    image_filename = f"avatar-{str(uuid.uuid4())}.png"
    blob = bucket.blob(image_filename)
    #  # Commit the transformation on the image data
    # result = image.execute_transforms(output_encoding=JPEG)
    # # Create a filename for the stored image
    # filename = 'avatar-{}.jpg'.format(uuid.uuid4())
    # filepath = '/{}/{}'.format(bucket_name, filename)
    # # Store the image in Cloud Storage with a random filename
    # f = gcs.open(filepath, 'w', content_type='image/jpg')
    # f.write(result)
    # f.close()

    image_data = base64.b64decode(re.sub('^data:image/.+;base64,', '', body.get('image')))
    blob.upload_from_string(
        image_data,
        content_type='image/png'
    )

    response = {
        'success': True,
        'message': 'User uploaded avatar successfully',
        'imageUrl': blob.public_url
    }
    return response, 200
