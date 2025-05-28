package com.geneairate.userservice.dtos;

import java.time.LocalDateTime;

public class UserProfileResponse {
    public String username;
    public String email;
    public String role;
    public LocalDateTime createdAt;
    public String description;
    public String location;
}
