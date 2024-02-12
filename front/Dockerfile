FROM oven/bun

WORKDIR /home

COPY package.json ./
RUN bun install

RUN  bun install -g vite
EXPOSE 3000

CMD [ "bun", "run", "dev:docker" ]