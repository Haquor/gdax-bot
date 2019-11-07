
#build stage
FROM node:10-alpine AS builder
RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app
WORKDIR /usr/app/
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
RUN ls -la
RUN whoami
RUN pwd
#RUN node bot.js

CMD [ "node", "bot.js", "--config", "config.json", "--run" ]

#WORKDIR /go/src/app
#COPY . .
#RUN apk add --no-cache git
#RUN go get -d -v ./...
#RUN go install -v ./...

#final stage

#FROM alpine:latest
#RUN apk --no-cache add ca-certificates
#COPY --from=builder /go/bin/app /app
#ENTRYPOINT ./app
#LABEL Name=gdax-bot Version=1.0.0
#EXPOSE 3000
