# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install

# Copies everything over to Docker environment
COPY . /usr/src/app

RUN npm run build
