FROM node:16

WORKDIR /uiAutomation

COPY package*.json ./
RUN npm ci

COPY . .

WORKDIR /myFile

COPY . .