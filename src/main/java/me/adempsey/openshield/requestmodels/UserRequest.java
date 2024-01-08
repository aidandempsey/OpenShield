package me.adempsey.openshield.requestmodels;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import me.adempsey.openshield.entity.enums.UserRole;

import java.util.Optional;

@Data
public class UserRequest {
    private Optional<String> displayName;
    private Optional<String> emailAddress;
    private Optional<Long> teamId;
    private Optional<UserRole> userRole;
}
