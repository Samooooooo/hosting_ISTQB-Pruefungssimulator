# Stage 1: Build the Angular application
FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --project hosting_ISTQB-Pruefungssimulator --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/hosting_ISTQB-Pruefungssimulator /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
