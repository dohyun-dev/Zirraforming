package com.ssafy.server.domain.event;

import com.ssafy.server.config.handler.StarHandler;
import com.ssafy.server.domain.entity.Stars;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;

@Slf4j
@RequiredArgsConstructor
@Component
public class StarSaveEventHandler {

    private final StarHandler starHandler;

    @Async
    @EventListener
    public void StarSave(StarSaveEvent event) throws Exception {
        log.info("별보러갈래 쓰레기 등록 완료 memberId={}", event.getMemberId());
        starHandler.handleMessage(null, new TextMessage(new CharSequence() {
            @Override
            public int length() {
                return 0;
            }

            @Override
            public char charAt(int index) {
                return 0;
            }

            @Override
            public CharSequence subSequence(int start, int end) {
                return null;
            }
        }));
    }
}
