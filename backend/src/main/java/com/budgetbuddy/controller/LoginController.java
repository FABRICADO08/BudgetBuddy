package com.budgetbuddy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @GetMapping("/login-options")
    public ResponseEntity<Map<String, String>> getLoginOptions() {
        Map<String, String> options = new HashMap<>();
        options.put("message", "Choose your login method:");
        options.put("google_login_url", "/oauth2/authorization/google");
        options.put("email_login_url", "/api/v1/auth/login");
        options.put("email_register_url", "/api/v1/auth/register");
        return ResponseEntity.ok(options);
    }
}
