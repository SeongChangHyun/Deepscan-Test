# build stage
FROM asia.gcr.io/widerplanet/node:lts-alpine as build-stage

WORKDIR /app
RUN apk add git
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# production stage
FROM asia.gcr.io/widerplanet/nginx:stable-alpine as production-stage

RUN adduser -D -s /bin/sh sysoper
RUN mkdir -p /var/log/wpweb/access
RUN mkdir -p /var/log/wpweb/error
RUN mkdir -p /srv/widerplanet/tg3_fe

COPY --from=build-stage /app/dist /srv/widerplanet/tg3_fe

COPY nginx.conf /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid && \
  chown -R sysoper:sysoper /var/run/nginx.pid && \
  chown -R sysoper:sysoper /var/cache/nginx && \
  chown -R sysoper:sysoper /srv/widerplanet && \
  chown -R sysoper:sysoper /var/log/nginx && \
  chown -R sysoper:sysoper /var/log/wpweb

EXPOSE 8000

USER sysoper

CMD ["nginx", "-g", "daemon off;"]
