package com.ssafy.server.config;

import com.ssafy.server.config.properties.CorsProperties;
import com.ssafy.server.config.properties.TokenProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@EnableConfigurationProperties({
        CorsProperties.class,
        TokenProperties.class
})
@Configuration
public class JpaConfig {
}
