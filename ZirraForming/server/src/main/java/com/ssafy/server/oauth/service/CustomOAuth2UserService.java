package com.ssafy.server.oauth.service;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.oauth.entity.ProviderType;
import com.ssafy.server.oauth.entity.UserPrincipal;
import com.ssafy.server.oauth.info.OAuth2UserInfo;
import com.ssafy.server.oauth.info.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.debug("CustomOAuth2UserService loadUser()");
        OAuth2User user = super.loadUser(userRequest);
        log.debug("OAuth2User := [{}]", user.toString());

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        log.debug("userInfo.email := [{}]", userInfo.getEmail());

        Optional<Member> savedUser = memberRepo.findByEmail(userInfo.getEmail());
        if (savedUser.isEmpty()) {
            log.debug("Sign Up");
            savedUser = Optional.of(createUser(userInfo));
        }else{
            log.debug("Sign In");
        }

        return UserPrincipal.create(savedUser.get(), user.getAttributes());
    }

    private Member createUser(OAuth2UserInfo userInfo) {
        Long index = memberRepo.count();
        Member member = new Member(
                userInfo.getEmail(),
                "user"+index
        );

        return memberRepo.save(member);
    }
}
