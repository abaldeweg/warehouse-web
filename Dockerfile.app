# build stage
FROM node:lts-alpine as build-stage

ARG VITE_LOGO
ENV VITE_LOGO=$VITE_LOGO

ARG VITE_API
ENV VITE_API=$VITE_API

ARG VITE_ABOUT
ENV VITE_ABOUT=$VITE_ABOUT

ARG VITE_THEME
ENV VITE_THEME=$VITE_THEME

ARG VITE_CATALOG
ENV VITE_CATALOG=$VITE_CATALOG

ARG VITE_SETTINGS
ENV VITE_SETTINGS=$VITE_SETTINGS

ARG VITE_SHOP
ENV VITE_SHOP=$VITE_SHOP

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /usr/app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm -F app build

# production stage
FROM httpd:2.4 as production-stage

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY ./packages/app/docker/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /usr/app/packages/app/dist /usr/local/apache2/htdocs${VITE_BASE_URL}

EXPOSE 80
