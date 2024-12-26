FROM node:18-alpine

WORKDIR /usr/app
COPY . .

WORKDIR /usr/app/front
RUN npm install 
RUN npm run build
RUN cp -R ./dist /usr/app/back/public

WORKDIR /usr/app/back
RUN npm install --quiet
CMD npm run dev
