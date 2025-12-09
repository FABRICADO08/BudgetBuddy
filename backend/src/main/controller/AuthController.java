package main.controller;

import main.dto.AuthRequest;
import main.dto.AuthResponse;
import main.dto.RegisterRequest;
import main.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(service.register(request, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(service.login(request, response));
    }
    
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(
            @CookieValue(name = "refreshToken") String refreshToken
    ) {
         // Logic to verify refresh token and issue new access token
         return ResponseEntity.ok(service.refreshToken(refreshToken));
    }
}