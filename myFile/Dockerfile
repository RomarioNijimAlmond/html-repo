FROM node:16

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    npm \
    git \
    libpq-dev \
    libvips42 \
    pkg-config \
    lsb-release

COPY . /html-css
RUN curl -s https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install -y nodejs
WORKDIR /html-css/myFile/uiAutomation
RUN npm install
RUN npx playwright install --with-deps

CMD [ "executable"]

