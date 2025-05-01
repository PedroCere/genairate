package com.geneairate.user_service.controllers;

import com.geneairate.user_service.dtos.UpdateUserPreferencesRequest;
import com.geneairate.user_service.dtos.UserPreferencesResponse;
import com.geneairate.user_service.dtos.UserProfileResponse;
import com.geneairate.user_service.dtos.UserStatsResponse;
import com.geneairate.user_service.services.UserService;
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
