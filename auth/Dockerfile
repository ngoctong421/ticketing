FROM node:alpine

WORKDIR /app
COPY package*.json ./
# RUN npm install --omit=dev --force --loglevel verbose
RUN npm install --force --loglevel verbose
COPY ./ ./

RUN npm run build
# RUN rm -rf src

CMD ["npm", "start"]
