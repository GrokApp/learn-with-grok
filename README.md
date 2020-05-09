### Prerequisites

Grok requires [OpenAPI Generator](https://openapi-generator.tech/docs/installation/)

To install via homebrew run `brew install openapi-generator`


### Google API Setup

Ask someone for the Google private key JSON.

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the location of the Google private key JSON.

### Codegen

To start code generation run `openapi-generator generate -i grok.yaml -g python-flask -o server/`
