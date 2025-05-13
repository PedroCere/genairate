package com.geneairate.user_service.dtos;

import com.geneairate.user_service.model.User;

public class AuthResponse {
    public String token;
    public User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
