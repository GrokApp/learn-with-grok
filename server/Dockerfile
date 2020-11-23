FROM python:3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/

RUN pip3 install --no-cache-dir -r requirements.txt

RUN [ "python3", "-c", "import nltk; nltk.download('punkt')" ]

COPY . /usr/src/app
