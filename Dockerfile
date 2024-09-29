FROM node:18-alpine

WORKDIR /usr/app
COPY . .

WORKDIR /usr/app/front
RUN npm install --quiet
RUN npm run build
COPY ./front/dist /usr/app/back/public

WORKDIR /usr/app/back
RUN npm install --quiet
CMD npm run dev
