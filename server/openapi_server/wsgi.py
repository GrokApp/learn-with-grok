#!/usr/bin/env python3

from .app import init_app

application = init_app()
app = application.app
