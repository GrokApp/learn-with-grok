# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.test import BaseTestCase


class TestTestController(BaseTestCase):
    """TestController integration test stubs"""

    def test_check_token(self):
        """Test case for check_token

        Check token
        """
        query_string = [('token', 'token_example')]
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/test/checkResetPasswordToken',
            method='GET',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
