# Use Node.js 10 as the base image
FROM node:10
 
# Install necessary dependencies for Puppeteer
# Update the sources list to use archived Debian repositories
RUN sed -i 's/http:\/\/deb.debian.org/http:\/\/archive.debian.org/g' /etc/apt/sources.list \
    && sed -i 's/http:\/\/security.debian.org/http:\/\/archive.debian.org/g' /etc/apt/sources.list \
    && echo "Acquire::Check-Valid-Until false;" >> /etc/apt/apt.conf.d/10no-check-valid-until \
    && echo "deb http://archive.debian.org/debian/ stretch main" > /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        # Install any required packages here (e.g., curl, build-essential) \
    && rm -rf /var/lib/apt/lists/*
 
# Install Chromium for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
 
# Set the environment variable for Puppeteer to use the installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD true
ENV CHROME_PATH=/usr/bin/chromium
 
# Create and set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package.json ./
 
# Install application dependencies
RUN npm install
 
# Copy the application code
COPY index.js ./
COPY test.js ./
 
# Expose the port your app runs on
EXPOSE 3000
 
# Command to run the application
CMD ["npm", "start"]