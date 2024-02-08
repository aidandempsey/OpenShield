package me.adempsey.openshield.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("./src/main/resources/firebase_config.json");
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        return FirebaseApp.initializeApp(options);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/secure/**")).authenticated()
                        .anyRequest().permitAll())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return token -> {
            try {
                FirebaseAuth.getInstance().verifyIdToken(token);
            } catch (FirebaseAuthException e) {
                throw new RuntimeException("Firebase authentication failed: " + e.getMessage());
            }

            String[] chunks = token.split("\\.");
            Map<String, Object> headers = decodeJWT(chunks[0]);
            Map<String, Object> claims = decodeJWT(chunks[1]);

            Instant iat = Instant.ofEpochSecond((int) claims.get("iat"));
            Instant exp = Instant.ofEpochSecond((int) claims.get("exp"));

            return new Jwt(token, iat, exp, headers, claims);
        };
    }

    public static Map<String, Object> decodeJWT(String chunk) {
        ObjectMapper objectMapper = new ObjectMapper();
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String data = new String(decoder.decode(chunk));

        Map<String, Object> test = new HashMap<String, Object>();
        try {
            test = objectMapper.readValue(data, HashMap.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Unable to authenticate request");
        }

        return test;
    }
}