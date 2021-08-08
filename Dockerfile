FROM node:14
MAINTAINER ANGEL angel.tigua83@gmail.com

WORKDIR /opt/NodeAppMovie
COPY package.json .
RUN npm install

COPY . .

expose 7000
CMD [ "npm", "start" ]