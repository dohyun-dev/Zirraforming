package com.ssafy.server.connection;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.DriverManager;

import static org.assertj.core.api.Fail.fail;

@ActiveProfiles("development")
@SpringBootTest
public class ConnectionTest {
    // Redis
    @Autowired
    private RedisTemplate redisTemplate;

    // MySQL
    @Value("${spring.datasource.driver-class-name}")
    private String driver;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String user;

    @Value("${spring.datasource.password}")
    private String password;

    // MongoDB
    @Autowired
    private MongoTemplate mongoTemplate;


    @Test
    @Transactional
    void Redis_연결() {
        // given
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String key = "testKey";

        // when
        valueOperations.set(key, "hello");

        // then
        String findValue = valueOperations.get(key);
        Assertions.assertThat(findValue).isEqualTo("hello");
        valueOperations.getAndDelete(key);
    }

    @Test
    void MySQL_연결() throws Exception {
        Class.forName(driver);
        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            System.out.println(connection);
        } catch (Exception e) {
            e.printStackTrace();
            fail("연결 실패");
        }
    }

    @Test
    @Transactional
    void MongoDB_연결() {
        TestObject testObject = new TestObject("길동", "홍");
        mongoTemplate.save(testObject);

        //then
        System.out.println(mongoTemplate.findOne(Query.query(Criteria.where("lastName").is("홍")), TestObject.class));
    }

    @Document("testObject")
    class TestObject{
        @Id
        private String id;

        private String firstName;
        private String lastName;

        public TestObject(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
}
