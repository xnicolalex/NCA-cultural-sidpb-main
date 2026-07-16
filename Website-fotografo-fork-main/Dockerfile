FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia todo o resto do código para dentro do contêiner
COPY . .

# placeholder para o build não quebrar se o prisma ou o .js precisarem da variável
ARG DATABASE_URL="postgresql://user:password@localhost:5432/db_cultura?schema=public"
ARG NEXT_PUBLIC_BASE_PATH

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

ENV NODE_ENV=production
RUN npx prisma generate

RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]