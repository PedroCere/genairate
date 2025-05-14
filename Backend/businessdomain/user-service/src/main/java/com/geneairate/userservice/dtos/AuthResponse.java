package com.geneairate.userservice.dtos;

import com.geneairate.userservice.model.User;

public class AuthResponse {
    public String token;
    public User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
