package com.budgetbuddy.config;

import com.budgetbuddy.service.OAuth2UserWithToken;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2UserWithToken oauth2User = (OAuth2UserWithToken) authentication.getPrincipal();

        String token = oauth2User.getJwtToken();
        String userId = oauth2User.getUser().getId().toString();
        String email = URLEncoder.encode(oauth2User.getUser().getEmail(), StandardCharsets.UTF_8);
        String firstname = URLEncoder.encode(oauth2User.getUser().getFirstname(), StandardCharsets.UTF_8);
        String lastname = URLEncoder.encode(oauth2User.getUser().getLastname(), StandardCharsets.UTF_8);

        // Redirect to frontend with token in URL query parameter
        String redirectUrl = String.format(
                "http://localhost:3000/?accessToken=%s&userId=%s&email=%s&firstname=%s&lastname=%s",
                token, userId, email, firstname, lastname);

        response.sendRedirect(redirectUrl);
    }
}
