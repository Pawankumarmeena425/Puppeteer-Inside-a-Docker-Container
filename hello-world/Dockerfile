FROM mhart/alpine-node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV CHROME_BIN=/usr/bin/chromium-browser    
# RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main


COPY . .

EXPOSE 3000

CMD ["npm", "start"]
