# Stage 1
FROM node:14

WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install
COPY . .

CMD npm run start
