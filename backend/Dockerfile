FROM python:3.9.0-buster
WORKDIR /app/Backend
RUN pip --version
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN ["ls", "-a"]
RUN ["pip", "list"]