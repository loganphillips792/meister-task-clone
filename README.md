# Meister Task Clone

## To build and run application

1. Create a file called *.env* at *backend/config/nginx/*. Copy the contents of env-example, and put it into .env. You can change the values as necessary.
2. *docker-compose build* - Build docker images
3. *docker-compose up* - Create and run the containers
4. *docker exec -it django_container bash* - Enter Django container
5. *python manage.py makemigrations* - Make Django database migration files
6. *python manage.py migrate* - Run the migrations
7. *python manage.py shell < scripts/fill_database.py* - Run script which fills database with random data

**Note**: If you want hot reloading enabled for React, then you need to run *npm install* as the first step. You also want to make sure you have the following lines uncommented in the docker-compose.yml file: stdin_open, environments, and volumes.