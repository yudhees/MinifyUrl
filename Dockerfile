FROM node:23-bullseye-slim

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build
# COPY .env.production ./build/.env

RUN groupadd -g 10014 choreo && \
    useradd --no-create-home --uid 10014 --gid 10014 --system choreouser && \
    mkdir -p /home/choreouser/.npm/_logs && \
    chmod -R 755 /home/choreouser/.npm && \
    chown -R choreouser:choreo /home/choreouser


USER 10014

EXPOSE 3333

CMD ["node", "./build/bin/server.js"]
