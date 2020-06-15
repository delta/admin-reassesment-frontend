FROM node:8.10.0 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build