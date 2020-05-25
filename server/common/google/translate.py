from google.cloud import translate_v2 as translate

translate_client = translate.Client()

FLAG_TO_LANGUAGE_CODE_DICT = {
    'GB': 'EN',
    'ES': 'ES',
    'FR': 'FR',
    'DE': 'DE',
    # Testing unified error handling
    # 'DE': 'DEU',
}

def translate_text(text, source, target):
    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.

    source = FLAG_TO_LANGUAGE_CODE_DICT.get(source)
    target = FLAG_TO_LANGUAGE_CODE_DICT.get(target)

    if not (source or target):
        return ''

    result = translate_client.translate(text, source_language=source, target_language=target)

    return result['translatedText']
