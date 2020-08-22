FROM node:12 as react-build
WORKDIR /app
COPY . .

RUN \
   npm install --silent && \
   npm install react-scripts@1.1.1 -g --silent && \
   npm install bootstrap --save && npm install --save reactstrap react react-dom
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]