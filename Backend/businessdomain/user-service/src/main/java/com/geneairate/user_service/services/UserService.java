package com.geneairate.user_service.services;

import com.geneairate.user_service.dtos.*;
import com.geneairate.user_service.model.User;
import com.geneairate.user_service.respository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserProfileResponse getProfile() {
        User u = getCurrentUser();
        UserProfileResponse p = new UserProfileResponse();
        p.username = u.getUsername();
        p.email = u.getEmail();
        p.role = u.getRole();
        p.createdAt = u.getCreatedAt();
        p.description = u.getDescription();
        p.location = u.getLocation();
        return p;
    }

    public UserProfileResponse updateProfile(UpdateUserProfileRequest req) {
        User u = getCurrentUser();
        u.setDescription(req.description);
        u.setLocation(req.location);
        repo.save(u);
        return getProfile();
    }

    public UserPreferencesResponse getPreferences() {
        User u = getCurrentUser();
        UserPreferencesResponse r = new UserPreferencesResponse();
        r.defaultFormat = u.getDefaultFormat();
        r.defaultTone = u.getDefaultTone();
        r.defaultLanguage = u.getDefaultLanguage();
        return r;
    }

    public UserPreferencesResponse updatePreferences(UpdateUserPreferencesRequest prefs) {
        User u = getCurrentUser();
        u.setDefaultTone(prefs.defaultTone);
        u.setDefaultFormat(prefs.defaultFormat);
        u.setDefaultLanguage(prefs.defaultLanguage);
        repo.save(u);
        return getPreferences(); // reutiliza
    }

    public UserStatsResponse getStats() {
        User u = getCurrentUser();
        UserStatsResponse stats = new UserStatsResponse();
        stats.totalArticles = u.getTotalArticles();
        stats.totalWords = u.getTotalWords();
        stats.tonesUsed = u.getTonesUsed();
        return stats;
    }
}
