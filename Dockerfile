ARG NODE_VERSION=19.3.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \

   --mount=type=bind,source=yarn.lock,target=yarn.lock \

   --mount=type=cache,target=/root/.yarn \

   yarn install --production --frozen-lockfile

FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \

   --mount=type=bind,source=yarn.lock,target=yarn.lock \

   --mount=type=cache,target=/root/.yarn \

   yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM base as final

ENV NODE_ENV production

USER node

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/next.config.js ./

COPY --from=build /usr/src/app/public ./public

COPY --from=build /usr/src/app/.next ./.next

EXPOSE 3000

CMD yarn start