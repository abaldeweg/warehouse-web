ARG VITE_BASE_URL

# build stage
FROM node:lts-alpine as build-stage

ARG VITE_APP_LOGO
ENV VITE_APP_LOGO=$VITE_APP_LOGO

WORKDIR /usr/app

RUN npm install -g pnpm

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install
COPY . .

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

ARG VITE_APP_ABOUT
ENV VITE_APP_ABOUT=$VITE_APP_ABOUT

ARG VITE_APP_THEME
ENV VITE_APP_THEME=$VITE_APP_THEME

ARG VITE_CATALOG
ENV VITE_CATALOG=$VITE_CATALOG

ARG VITE_SETTINGS
ENV VITE_SETTINGS=$VITE_SETTINGS

ARG VITE_SHOP
ENV VITE_SHOP=$VITE_SHOP

RUN pnpm build

# production stage
FROM httpd:2.4 as production-stage

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /usr/app/dist /usr/local/apache2/htdocs${VITE_BASE_URL}

EXPOSE 80
