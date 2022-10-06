### SPARK CLUSTER YARN을 이용해서 실행 시키는 문구

YARN_CONF_DIR=/kikang/spark3/conf2  /kikang/spark3/bin/pyspark --driver-class-path /kikang/spark3/mysql-connector-java-8.0.29.jar --master yarn --executor-memory 2g --executor-cores 2 --num-executors 3 

conf2라는 default값을 이용해서 pyspark 실행하기 driver-class-path는 mysql-connector로 사용 이때 마스터는 yarn을 이용해서 사용, 그 뒤에는 각 워커의 어떻게 할당할지 결정

mysql-connector-java는 spark의 jar에 없으니 이때 spark jar에 넣기



### SQOOP 실행하는 문구

/kikang/sqoop-1.4.7.bin__hadoop-2.6.0/bin/sqoop export --connect jdbc:mysql://j7d107.p.ssafy.io:3307/zirraforming --table news --export-dir /user/spark/final.csv/part-00000-35b6e378-9fec-4018-b0b2-c97c9cbc9e70-c000.csv --username ssafy --password ssafywlfkvhald

sqoop export를 실행하되 우리 sever sql에 접근 hdfs에 접근해서 필요한 데이터만 전송하기 