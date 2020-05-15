# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.test import BaseTestCase


class TestLibraryController(BaseTestCase):
    """LibraryController integration test stubs"""

    def test_fetch_library(self):
        """Test case for fetch_library

        Fetch the library for the current user
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/library/fetch',
            method='POST',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
