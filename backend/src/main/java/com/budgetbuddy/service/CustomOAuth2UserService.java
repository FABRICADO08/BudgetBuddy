package com.budgetbuddy.service;

import com.budgetbuddy.entity.Role;
import com.budgetbuddy.entity.User;
import com.budgetbuddy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final DefaultOAuth2UserService defaultOAuth2UserService = new DefaultOAuth2UserService();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = defaultOAuth2UserService.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String oauthId = oAuth2User.getName();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Check if user already exists
        Optional<User> existingUser = userRepository.findByOauthIdAndOauthProvider(oauthId, provider);

        User user;
        if (existingUser.isPresent()) {
            // User already exists, return existing user
            user = existingUser.get();
        } else {
            // Create new user if they don't exist
            String[] nameParts = name != null ? name.split(" ", 2) : new String[] { "", "" };
            user = User.builder()
                    .firstname(nameParts[0])
                    .lastname(nameParts.length > 1 ? nameParts[1] : "")
                    .email(email)
                    .oauthProvider(provider)
                    .oauthId(oauthId)
                    .role(Role.USER)
                    .build();
            user = userRepository.save(user);
        }

        // Generate JWT token for the user and add it to OAuth2User attributes
        String jwtToken = jwtService.generateToken(user);
        return new OAuth2UserWithToken(oAuth2User, jwtToken, user);
    }
}
