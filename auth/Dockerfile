FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --force --loglevel verbose
COPY ./ ./

CMD ["npm", "start"]
