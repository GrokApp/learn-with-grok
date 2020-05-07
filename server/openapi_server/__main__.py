#!/usr/bin/env python3

import connexion

from openapi_server import encoder

from .app import create_app


def main():
    create_app()


if __name__ == '__main__':
    main()
