FROM node:24-alpine3.21

WORKDIR /backend
COPY . .

RUN npm install


EXPOSE 5000

CMD sh -c "npx drizzle-kit generate && npx drizzle-kit migrate && npm run build && npm run dev"
