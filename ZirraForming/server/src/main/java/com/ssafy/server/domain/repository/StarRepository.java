package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface StarRepository extends JpaRepository<Star, Long> {
    @Query("select date_format(s.createdAt, '%Y-%m-%d') as date " +
            "from Star s " +
            "where s.member= :member " +
            "group by date_format(s.createdAt, '%Y-%m-%d') " +
            "order by date")
    List<String> findAllZirraformingYearById(@Param("member") Member member);

    @Query("select count(*) " +
            "from Star s " +
            "where s.member= :member " +
            "group by date_format(s.createdAt, '%Y-%m-%d') " +
            "order by date_format(s.createdAt, '%Y-%m-%d')")
    List<Integer> findAllZirraformingCountById(@Param("member") Member member);

    List<Star> findAllByMemberAndCreatedAt(Member member, LocalDateTime createAt);

    List<Star> findByMemberAndCreatedAtBetweenOrderByCreatedAt(Member member, LocalDateTime start, LocalDateTime end);

    List<Star> findAllByMember(Member findMember);
}
