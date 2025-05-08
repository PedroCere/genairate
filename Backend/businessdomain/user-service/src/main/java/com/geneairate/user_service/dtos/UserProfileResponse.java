package com.geneairate.user_service.dtos;

import java.time.LocalDateTime;

public class UserProfileResponse {
    public String username;
    public String email;
    public String role;
    public LocalDateTime createdAt;
}