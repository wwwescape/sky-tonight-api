# FROM debian:bullseye as builder
FROM node:latest  as builder

RUN mkdir /app
WORKDIR /app

# NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# to install all modules: "npm install --production=false".
# Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

ENV NODE_ENV production
COPY . .
RUN npm install

#######################################################################

FROM node:latest

COPY --from=builder /app /app
WORKDIR /app
ENV NODE_ENV production

CMD [ "npm", "run", "start" ]