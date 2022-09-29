package com.ssafy.server.domain.service;

import com.ssafy.server.domain.dto.TrashResultResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Hashtable;
import java.util.Map;

@Service
public class RestTemplateService {
    @Value("${ssafy.server.fastapi.url}")
    private String serverUrl;

    public String getAiDetectionResult(String serverFilePath) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverUrl)
                .path("/fastapi/treshresult")
                .encode()
                .build()
                .toUri();

        makeRequestBody(serverFilePath);
        ResponseEntity<TrashResultResponse> response = new RestTemplate().exchange(makeRequest(serverFilePath, uri), TrashResultResponse.class);

        return response.getBody().getResult();
    }

    private RequestEntity<Map<String, String>> makeRequest(String serverFilePath, URI uri) {
        return RequestEntity
                .post(uri)
                .body(makeRequestBody(serverFilePath));
    }


    private Map<String, String> makeRequestBody(String serverFilePath) {
        Map<String, String> requestBody = new Hashtable<>();
        requestBody.put("imageUrl", serverFilePath);
        return requestBody;
    }
}
