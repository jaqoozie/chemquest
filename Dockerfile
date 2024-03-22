# Set image from base on offical node lts alpine
ARG VERSION=lts-alpine
FROM node:$VERSION

# Set label maintainer, version & description

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run yarb start script when container starts
CMD yarn start
