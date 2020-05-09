# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.excerpt import Excerpt  # noqa: E501
from openapi_server.test import BaseTestCase


class TestExcerptController(BaseTestCase):
    """ExcerptController integration test stubs"""

    def test_sentence_tokenize(self):
        """Test case for sentence_tokenize

        Tokenize an excerpt into sentences
        """
        body = {
  "language" : "GB",
  "excerpt" : "Hello World! My name is Craig."
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/sentence_tokenize',
            method='POST',
            headers=headers,
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
