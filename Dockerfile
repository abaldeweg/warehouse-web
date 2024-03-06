ARG VITE_BASE_URL

# build stage
FROM node:lts-alpine as build-stage

WORKDIR /usr/app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

ARG VITE_AUTH_URL
ENV VITE_AUTH_URL=$VITE_AUTH_URL

ARG VITE_AUTH_REALM
ENV VITE_AUTH_REALM=$VITE_AUTH_REALM

ARG VITE_AUTH_CLIENT
ENV VITE_AUTH_CLIENT=$VITE_AUTH_CLIENT

ARG VITE_AUTH_REDIRECT
ENV VITE_AUTH_REDIRECT=$VITE_AUTH_REDIRECT

RUN yarn build

# production stage
FROM httpd:2.4 as production-stage

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /usr/app/dist /usr/local/apache2/htdocs${VITE_BASE_URL}

EXPOSE 80
