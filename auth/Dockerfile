FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --force --loglevel verbose
COPY ./ ./

CMD ["npm", "start"]
