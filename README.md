# meister-task-clone

## Backend

To run database migrations

- go install github.com/rubenv/sql-migrate/...@latest
- This will install the package to $GOPATH/bin (make sure this path is in your $PATH so that sql-migrate is a valid command)
- sql-migrate up