FROM node:16

COPY . /html-css
WORKDIR /html-css/uiAutomation

COPY package*.json ./
RUN npm ci

COPY . .

WORKDIR /myFile

COPY . .