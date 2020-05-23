import connexion
import six

from openapi_server import util
import logging


def answer(body):  # noqa: E501
    """Update user score when a correct answer is selected

    This can only be done by the logged in user. # noqa: E501

    :param body: Answer to multiple choice question
    :type body:

    :rtype: object
    """
    logging.warning(body)
    return 'do some magic!'
