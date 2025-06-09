package com.geneairate.userservice.controllers;

import com.geneairate.userservice.dtos.*;
import com.geneairate.userservice.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserProfileResponse profile() {
        return userService.getProfile();
    }

    @PutMapping("/profile")
    public UserProfileResponse updateProfile(@RequestBody UpdateUserProfileRequest req) {
        return userService.updateProfile(req);
    }

    @GetMapping("/preferences")
    public UserPreferencesResponse preferences() {
        return userService.getPreferences();
    }

    @PutMapping("/preferences")
    public UserPreferencesResponse updatePreferences(@RequestBody UpdateUserPreferencesRequest req) {
        return userService.updatePreferences(req);
    }

    @GetMapping("/stats")
    public UserStatsResponse stats() {
        return userService.getStats();
    }
}
