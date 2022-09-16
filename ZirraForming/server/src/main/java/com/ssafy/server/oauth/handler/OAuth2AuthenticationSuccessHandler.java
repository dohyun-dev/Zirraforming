package com.ssafy.server.oauth.handler;


import com.ssafy.server.config.properties.TokenProperties;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.oauth.entity.RoleType;
import com.ssafy.server.oauth.token.AuthToken;
import com.ssafy.server.oauth.token.AuthTokenProvider;
import com.ssafy.server.oauth.utils.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final AuthTokenProvider tokenProvider;
    private final TokenProperties tokenProperties;
    private final MemberRepository memberRepository;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.debug("onAuthenticationSuccess");
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String redirectUri = "http://localhost:3000/oauth/redirect";
        log.debug("determineTargetUrl : " + redirectUri);

        // 엑세스 토큰
        String accessToken = createAccessToken(authentication);

        // 리프레시 토큰
        createRefreshToken(request, response, authentication);

        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("accessToken", accessToken)
                .build().toUriString();
    }

    protected String createAccessToken(Authentication authentication) {
        log.debug("createAccessToken : " + authentication.getName());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        Long memberId = memberRepository.findByEmail(authToken.getPrincipal().getName()).getId();
        AuthToken accessToken = tokenProvider.createAuthToken(
                String.valueOf(memberId),
                RoleType.USER.getCode(),
                new Date(new Date().getTime() + tokenProperties.getAuth().getTokenExpiry())
        );
        log.debug((authToken.getPrincipal().toString()));

        return accessToken.getToken();
    }

    protected void createRefreshToken(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        log.debug("createRefreshToken : " + authentication.getName());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        Long memberId = memberRepository.findByEmail(authToken.getPrincipal().getName()).getId();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                String.valueOf(memberId),
                RoleType.USER.getCode(),
                new Date(new Date().getTime() + tokenProperties.getAuth().getRefreshTokenExpiry())
        );

        saveRefreshToken(refreshToken, String.valueOf(memberId));
        cookieRefreshToken(request, response, refreshToken);
    }

    protected void saveRefreshToken(AuthToken refreshToken, String key) {
        // 리프레시 토큰 redis 저장
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        if(setOperations.size(key)!=0) setOperations.pop(key);
        setOperations.add(key, refreshToken.getToken());
    }

    protected void cookieRefreshToken(HttpServletRequest request, HttpServletResponse response, AuthToken refreshToken) {
        // 리프레시 토큰 쿠키 저장
        int cookieMaxAge = (int) tokenProperties.getAuth().getRefreshTokenExpiry() / 60;
        CookieUtil.deleteCookie(request, response, "refreshToken");
        CookieUtil.addCookie(response, "refreshToken", refreshToken.getToken(), cookieMaxAge);
    }
}
