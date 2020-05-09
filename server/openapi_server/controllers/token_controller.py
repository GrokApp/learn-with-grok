import connexion
import six

from openapi_server.models.excerpt import Excerpt  # noqa: E501
from openapi_server import util


def sentence_tokenize(body):  # noqa: E501
    """Tokenize an excerpt into sentences

     # noqa: E501

    :param body: Excerpt of text
    :type body: dict | bytes

    :rtype: object
    """
    if connexion.request.is_json:
        body = Excerpt.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
