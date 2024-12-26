FROM node:23-alpine

WORKDIR /usr/app
COPY . .

WORKDIR /usr/app/front
RUN npm ci 
RUN npm run build
RUN cp -R ./dist /usr/app/back/public

WORKDIR /usr/app/back
RUN npm install --quiet
CMD npm run dev
