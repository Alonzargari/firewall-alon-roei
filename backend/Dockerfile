FROM node:24-alpine3.21

WORKDIR /backend
COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD sh -c "npx drizzle-kit generate && npx drizzle-kit migrate && npm run dev"
