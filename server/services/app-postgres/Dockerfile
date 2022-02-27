FROM node
WORKDIR /usr/local/app/
ENV SECRET_KEY = "this_is_very_confidential"
COPY package.json package-lock.json /usr/local/app/
RUN npm install && npm cache clean --force

COPY ./ ./
CMD ["npm", "run", "start"]
