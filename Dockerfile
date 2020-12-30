FROM node:12
ENV NODE_ENV=${DOCKER_ENV}

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm" , "start" ]

