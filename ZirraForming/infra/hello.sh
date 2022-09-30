#!/bin/bash
echo "> 안녕하세요hello"

sudo docker-compose -f docker-compose-react-1.yml up --build -d
sudo docker-compose -f docker-compose-spring-1.yml up --build -d
