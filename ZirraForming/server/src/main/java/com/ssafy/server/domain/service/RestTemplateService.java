package com.ssafy.server.domain.service;

import com.ssafy.server.domain.dto.PredictResultResponse;
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
    @Value("${ssafy.server.url}")
    private String serverUrl;

    public String getAiDetectionResult(String serverFilePath) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverUrl)
                .path("/fastapi/trashresult")
                .encode()
                .build()
                .toUri();

        System.out.println("uri = " + uri);

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

    public PredictResultResponse getPredictResult(int case_number, double co2_number) {
        URI uri = UriComponentsBuilder
                .fromUriString(serverUrl)
                .path("/fastapi/predict")
                .encode()
                .build()
                .toUri();

        makeRequestBody(case_number, co2_number);
        ResponseEntity<PredictResultResponse> response = new RestTemplate().exchange(makeRequest(case_number, co2_number, uri), PredictResultResponse.class);
        return response.getBody();
    }

    private RequestEntity<Map<String, Object>> makeRequest(int case_number, double co2_number, URI uri) {
        return RequestEntity
                .post(uri)
                .body(makeRequestBody(case_number, co2_number));
    }

    private Map<String, Object> makeRequestBody(int case_number, double co2_number) {
        Map<String, Object> requestBody = new Hashtable<>();
        requestBody.put("case_number", case_number);
        requestBody.put("co2_number", co2_number);
        return requestBody;
    }
}
