# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.translated_text import TranslatedText  # noqa: E501
from openapi_server.test import BaseTestCase


class TestTranslateController(BaseTestCase):
    """TranslateController integration test stubs"""

    @unittest.skip("Connexion does not support multiple consummes. See https://github.com/zalando/connexion/pull/760")
    def test_translate_text(self):
        """Test case for translate_text

        Translate a sentence
        """
        body = {
  "text" : "Hello World!"
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/translate',
            method='POST',
            headers=headers,
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
