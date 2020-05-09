import connexion
import six

from openapi_server.models.excerpt import Excerpt  # noqa: E501
from openapi_server import util

import nltk
import logging

FLAG_TO_LANGUAGE_DICT = {
    'GB': 'english',
    'ES': 'spanish',
    'FR': 'french',
    'DEU': 'german',
}

def sentence_tokenize(body):  # noqa: E501
    """Tokenize an excerpt into sentences

     # noqa: E501

    :param body: Excerpt of text
    :type body: dict | bytes

    :rtype: object
    """
    if connexion.request.is_json:
        body = Excerpt.from_dict(connexion.request.get_json())  # noqa: E501

    excerpt = body.excerpt
    language = body.language

    language = FLAG_TO_LANGUAGE_DICT.get(language)

    paragraphs = excerpt.strip().split('\n')
    paragraphs = [p.strip() for p in paragraphs if p.strip()]
    paragraphs = [nltk.sent_tokenize(p, language=language) for p in paragraphs]

    logging.warning(paragraphs)
    return paragraphs
