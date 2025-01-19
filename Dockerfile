FROM node:23-bullseye-slim

WORKDIR /app

COPY . ./
RUN npm install
RUN npm build
# COPY .env.production ./build/.env

RUN addgroup -g 10014 choreo && \
    adduser --disabled-password --no-create-home --uid 10014 --ingroup choreo choreouser


USER 10014

EXPOSE 3333

CMD ["node", "./build/bin/server.js"]
