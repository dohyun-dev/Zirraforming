package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Quiz;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, Long> {
    @Aggregation(pipeline = {
            "{'$sample':{size:10}}"
    })
    List<Quiz> findAllRandomLimit10();
}
