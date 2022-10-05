package com.ssafy.server.config.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.server.api.dto.star.StarsResultResponse;
import com.ssafy.server.domain.repository.StarRepository;
import com.ssafy.server.domain.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class StarHandler extends TextWebSocketHandler {

    private ObjectMapper objectMapper = new ObjectMapper();
    private List<WebSocketSession> sessions = new ArrayList<>();
    private final StarService starService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("세션연결", session);
        sessions.add(session);
        session.sendMessage(new TextMessage(makeResponse(makeStarsResultResponse())));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for (WebSocketSession sess : sessions) {
            sess.sendMessage(new TextMessage(makeResponse(makeStarsResultResponse())));
//            sess.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        log.info("세션종료", session);
    }

    private StarsResultResponse makeStarsResultResponse() {
        StarsResultResponse result = new StarsResultResponse();
        result.changeStars(starService.getStarsResult());
        result.changeTotalCount(starService.getStarsTotalCount());
        return result;
    }

    private String makeResponse(StarsResultResponse value) throws JsonProcessingException {
        return objectMapper.writeValueAsString(value);
    }
}
