#!/usr/bin/env bash
FLASK_APP=openapi_server.wsgi:app flask db init
FLASK_APP=openapi_server.wsgi:app flask db migrate
FLASK_APP=openapi_server.wsgi:app flask db upgrade
