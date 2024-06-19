FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# RUN npm run builds
RUN npm install -g serve

CMD ["sh", "-c", "npm run build && serve -s build -l 3000"]

EXPOSE 3000
