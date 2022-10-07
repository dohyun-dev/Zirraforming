#!/bin/bash
echo "> 현재 구동중인 profile 확인"
CURRENT_PROFILE=$(curl -s https://j7d107.p.ssafy.io/utils/profile)
echo "> $CURRENT_PROFILE"

if [ $CURRENT_PROFILE == production-set1 ]
then
  IDLE_PROFILE=production-set2
  IDLE_PORT=9002
  SPRING_COMPOSE=./app2/docker-compose-spring-2.yml
  REACT_COMPOSE=./app2/docker-compose-react-2.yml
  REACT_PORT=3001
  PAST_SPRING_COMPOSE=./app1/docker-compose-spring-1.yml
  PAST_REACT_COMPOSE=./app1/docker-compose-react-1.yml
elif [ $CURRENT_PROFILE == production-set2 ]
then
  IDLE_PROFILE=production-set1
  IDLE_PORT=9001
  SPRING_COMPOSE=./app1/docker-compose-spring-1.yml
  REACT_COMPOSE=./app1/docker-compose-react-1.yml
  REACT_PORT=3000
  PAST_SPRING_COMPOSE=./app2/docker-compose-spring-2.yml
  PAST_REACT_COMPOSE=./app2/docker-compose-react-2.yml
else
  echo "> 일치하는 Profile이 없습니다. Profile: $CURRENT_PROFILE"
  echo "> set1을 할당합니다. IDLE_PROFILE: set1"
  IDLE_PROFILE=production-set1
  IDLE_PORT=9001
  SPRING_COMPOSE=./app1/docker-compose-spring-1.yml
  REACT_COMPOSE=./app1/docker-compose-react-1.yml
  REACT_PORT=3000
  PAST_SPRING_COMPOSE=./app2/docker-compose-spring-2.yml
  PAST_REACT_COMPOSE=./app2/docker-compose-react-2.yml

fi
echo "> 도커 compose 실행 : docker-compose -f {COMPOSE} up --build"
docker-compose -f ${SPRING_COMPOSE} up --build -d
docker-compose -f ${REACT_COMPOSE} up --build -d

echo "> $IDLE_PROFILE 10초 후 Health check 시작"
echo "> curl -s https://j7d107.p.ssafy.io/actuator/health "
sleep 10

for retry_count in {1..10}
do
  response=$(curl -s 172.26.8.122:${IDLE_PORT}/actuator/health)
  up_count=$(echo $response | grep 'UP' | wc -l)

  if [ $up_count -ge 1 ]
  then
    echo "> Health check 성공"
    break
  else
    echo "> Health check의 응답을 알 수 없거나 혹은 status가 UP이 아닙니다."
    echo "> Health check: ${response}"
  fi

  if [ $retry_count -eq 10 ]
  then
    echo "> Health check 실패. "
    echo "> Nginx에 연결하지 않고 배포를 종료합니다."
    exit 1
  fi

  echo "> Health check 연결 실패. 재시도..."
  sleep 10
done

echo "> 스위칭을 시도합니다..."
sleep 5


echo "> 현재 구동중인 Port: ${IDLE_PORT}"
echo "> 현재 구동중인 Port: ${REACT_PORT}"
echo "> Port 전환"
echo "set \$spring_url 172.26.8.122:${IDLE_PORT};" | sudo tee /home/ubuntu/nginx/conf.d/service-url.inc
echo "set \$react_url 172.26.8.122:${REACT_PORT};" | sudo tee -a /home/ubuntu/nginx/conf.d/service-url.inc


echo "> ${CURRENT_PROFILE} 컨테이너 삭제"
docker-compose -f ${PAST_SPRING_COMPOSE} down
docker-compose -f ${PAST_REACT_COMPOSE} down

echo "> Nginx Reload"

docker stop nginx
docker-compose -f docker-compose-nginx.yml up --build -d

echo "> Success!!"
