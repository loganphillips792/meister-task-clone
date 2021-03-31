FROM node:15.12.0-alpine3.10
WORKDIR /app/frontend
COPY ./meistertaskclone/package.json /app/frontend/package.json
RUN npm install
CMD ["npm", "start"]