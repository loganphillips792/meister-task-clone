FROM golang:1.18-alpine

WORKDIR /app

# Download necessary Go modules
COPY ../go.mod .
COPY ../go.sum .

RUN go mod download

COPY . .

RUN go build -o /meistertask.bin ./cmd/meistertaskclone/main.go

EXPOSE 8000

# Tell Docker what command to execute when our image is used to start a container
CMD ["/meistertask.bin"]