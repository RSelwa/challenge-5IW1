FROM node:18.18-alpine

WORKDIR /home

COPY tsconfig.json package.json yarn.lock* ./

RUN yarn install

EXPOSE 5173

CMD [ "yarn", "dev:docker" ]