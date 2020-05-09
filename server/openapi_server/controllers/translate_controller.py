import connexion
import six

from openapi_server.models.translated_text import TranslatedText  # noqa: E501
from openapi_server import util


def translate_text(body):  # noqa: E501
    """Translate a sentence

     # noqa: E501

    :param body: Translated Text
    :type body: dict | bytes

    :rtype: object
    """
    if connexion.request.is_json:
        body = TranslatedText.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
