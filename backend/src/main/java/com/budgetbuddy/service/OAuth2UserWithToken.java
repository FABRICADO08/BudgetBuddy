package com.budgetbuddy.service;

import com.budgetbuddy.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class OAuth2UserWithToken implements OAuth2User {

    private final OAuth2User delegate;
    private final String jwtToken;
    private final User user;
    private final Map<String, Object> attributes;

    public OAuth2UserWithToken(OAuth2User oAuth2User, String jwtToken, User user) {
        this.delegate = oAuth2User;
        this.jwtToken = jwtToken;
        this.user = user;
        this.attributes = new HashMap<>(oAuth2User.getAttributes());
        this.attributes.put("jwtToken", jwtToken);
        this.attributes.put("userId", user.getId());
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public User getUser() {
        return user;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return delegate.getAuthorities();
    }

    @Override
    public String getName() {
        return delegate.getName();
    }
}
