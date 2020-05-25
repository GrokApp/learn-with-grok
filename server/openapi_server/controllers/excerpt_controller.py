import connexion
import six

from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
)

from google.cloud import texttospeech

from openapi_server.models.excerpt import Excerpt  # noqa: E501
from openapi_server.cache import blob_cache
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

@jwt_required
def text_to_speech(body):  # noqa: E501
    """Tokenize an excerpt into sentences

     # noqa: E501

    :param body: Excerpt of text
    :type body: dict | bytes

    :rtype: object
    """

    language_dict = {
        'GB': 'en-US',
        'ES': 'es-ES',
        'FR': 'fr-FR',
        'DE': 'de-DE'
    }

    audio_content = blob_cache.get(body.get("sentence"))
    if not audio_content:

        # Instantiates a client
        client = texttospeech.TextToSpeechClient()

        # Set the text input to be synthesized
        synthesis_input = texttospeech.types.SynthesisInput(text=body.get("sentence"))

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("neutral")
        voice = texttospeech.types.VoiceSelectionParams(
            language_code=language_dict.get(body.get('language')),
            ssml_gender=texttospeech.enums.SsmlVoiceGender.NEUTRAL)

        # Select the type of audio file you want returned
        audio_config = texttospeech.types.AudioConfig(
            audio_encoding=texttospeech.enums.AudioEncoding.MP3)

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(synthesis_input, voice, audio_config)

        audio_content = response.audio_content

        blob_cache.set(body.get("sentence"), audio_content)
    else:
        logging.warning("Successfully fetched from cache")

    return audio_content
