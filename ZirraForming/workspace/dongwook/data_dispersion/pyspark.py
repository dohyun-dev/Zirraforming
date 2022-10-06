import pyspark.sql.functions as f
from pyspark.sql.types import StructType
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession
import time
import pandas as pd
import pyspark 

sc = SparkContext.getOrCreate()
spark = SparkSession(sc)


start_time = time.time()
df = spark.read.option("header", True).option("inferSchema", False).csv("/kikang/data/real_news/combined_csv.csv")
df = df.dropna().withColumnRenamed('Title', 'title').withColumnRenamed('Time', 'date').withColumnRenamed('Content', 'content').withColumnRenamed('Image', 'image_link').withColumnRenamed('URL', 'link')

# df.head()

df_base = df[~df['Title'].contains('\t') & df['image_link'].contains('https') & df['link'].contains('https') ]

df_1 = df_base[df_base['content'].contains('지구온난화') & df_base['content'].contains('대기오염')].sort("date", ascending=False).toPandas()[:11]
df_2 = df_base[df_base['content'].contains('해양오염') & df_base['content'].contains('수질오염')].sort("date", ascending=False).toPandas()[:11]
df_3 = df_base[df_base['content'].contains('토양오염') & df_base['content'].contains('폐기물')].sort("date", ascending=False).toPandas()[:11]
df_4 = df_base[df_base['content'].contains('가뭄') & df_base['content'].contains('홍수') & df_base['content'].contains('폭우')].sort("date", ascending=False).toPandas()[:11]

df_1['kind'] = 1
df_2['kind'] = 2
df_3['kind'] = 3
df_4['kind'] = 4

df_1 = pd.concat([df_1, df_2, df_3, df_4])

df = df_1.reset_index(drop=True)
send_data = spark.createDataFrame(df)

send_data.write.mode('overwrite').options(header=True).csv("hdfs://spark-master-01:9000/news/data")

import pyspark
from pyspark.sql import SparkSession
from pyspark.sql import Row
spark = SparkSession.builder.config("spark.jars", "/kikang/spark3/mysql-connector-java-8.0.29.jar") \
    .master("local").appName("PySpark_MySQL_test2").getOrCreate()

send_data.write.format("jdbc").option("url", "jdbc:mysql://j7d107.p.ssafy.io:3307") \
	.option("driver", "com.mysql.jdbc.Driver").option("dbtable", "zirraforming.news") \
	.option("user", "ssafy").option("password", "ssafywlfkvhald").save()