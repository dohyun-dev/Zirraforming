package com.ssafy.server.domain.event;

import com.ssafy.server.domain.entity.MemberBadge;
import com.ssafy.server.domain.repository.MemberBadgeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class BadgeEventHandler {
    private final MemberBadgeRepository memberBadgeRepository;

    @EventListener
    public void updateBadge(MemberBadge event) {
        Optional<MemberBadge> memberBadge = memberBadgeRepository.findByMemberAndBadge(event.getMember(), event.getBadge());
        if(memberBadge.isEmpty()){
            memberBadgeRepository.save(new MemberBadge(event.getMember(), event.getBadge()));
            log.info(event.getMember().getNickname()+"님이 "+event.getBadge().getName()+"뱃찌를 얻었습니다.");
        }
    }
}
