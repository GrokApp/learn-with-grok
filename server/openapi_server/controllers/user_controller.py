import connexion
import six

from openapi_server import util


def create_user(body):  # noqa: E501
    """Create user

    This can only be done by the logged in user. # noqa: E501

    :param body: Created user object
    :type body: 

    :rtype: object
    """
    return 'do some magic!'
