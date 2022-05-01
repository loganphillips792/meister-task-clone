FROM golang:1.18-alpine

WORKDIR /app

# Download necessary Go modules
COPY . .
RUN go mod download


RUN go build -o /meistertask.bin */*.go 

EXPOSE 8080

# Tell Docker what command to execute when our image is used to start a container
CMD ["/meistertask.bin"]