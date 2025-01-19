FROM node:23-bullseye-slim

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build
# COPY .env.production ./build/.env
# RUN apt-get update && apt-get install -y bash

# RUN mv ./build/* ./ && \
#     rm -rf ./build && \
#     bash -c 'shopt -s extglob && rm -rf !(node_modules)'
RUN mv ./build/* ./ && \
    rm -rf ./build && \
    find . ! -name 'node_modules' -type f -exec rm -rf {} + && \
    rm -rf .env .git .gitignore

RUN groupadd -g 10014 choreo && \
    useradd --no-create-home --uid 10014 --gid 10014 --system choreouser && \
    mkdir -p /home/choreouser/.npm/_logs && \
    chmod -R 755 /home/choreouser/.npm && \
    chown -R choreouser:choreo /home/choreouser


USER 10014

EXPOSE 3333

CMD ["node", "./bin/server.js"]
