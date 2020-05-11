# https://hub.docker.com/_/golang
FROM golang:1.14-alpine3.11

# Create and change to the app directory.
WORKDIR /app

# Copy local code to the container image.
ADD .  /app

# Build the binary.
RUN go build -v -o gsp722 .

# Run the web service on container startup.
CMD ["/app/gsp722"]
