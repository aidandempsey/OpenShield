package me.adempsey.openshield.requestmodels;

import lombok.Data;
import me.adempsey.openshield.entity.enums.UserRole;

import java.time.LocalDate;
import java.util.Optional;

@Data
public class UserRequest {
    private String displayName;
    private String emailAddress;
    private LocalDate accountCreatedDate;
    private Optional<Long> teamId;
    private Optional<UserRole> userRole;
    private Optional<String> userManager;
}