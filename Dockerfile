FROM node:15.5.1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y wget

COPY package*.json ./

RUN mkdir -p files \
    && npm install

COPY index.js .
#CMD ["/bin/bash"]
ENTRYPOINT [ "node","index.js" ]