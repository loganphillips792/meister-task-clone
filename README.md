# meister-task-clone

## Backend

To run database migrations

- go install github.com/rubenv/sql-migrate/...@latest
- This will install the package to $GOPATH/bin (make sure this path is in your $PATH so that sql-migrate is a valid command)
- sql-migrate up

After researching a little bit, I found that the binary file was not being generated anymore by the go get command and that functionality has been transferred over to the go install command. So to resolve this, the following needs to be run:

go install github.com/rubenv/sql-migrate/...@latest

https://github.com/rubenv/sql-migrate/issues/174

https://github.com/rubenv/sql-migrate/issues/82
