package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    @Query("select m from Member m where m.id in :memberIds")
    List<Member> findMembersById(@Param("memberIds") List<Long> memberIds);
}
