# 1. fázis: react -> .html, .css, .js fájlok
FROM node:alpine as builder

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build


# 2. fázis: production react kiszolgálása
FROM nginx

# Elastic Beanstalk ezt a portot fogja használni
EXPOSE 80

# nginx automatikusan kiszolgálja ezt a mappát
COPY --from=builder /app/build /usr/share/nginx/html