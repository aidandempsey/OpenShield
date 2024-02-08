package me.adempsey.openshield.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import me.adempsey.openshield.entity.enums.UserRole;

import java.time.LocalDateTime;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name="user_id")
    private String userId;

    @Column(name="display_name")
    private String displayName;

    @Column(name="email_address")
    private String emailAddress;

    @Column(name="account_created_date")
    private LocalDateTime accountCreatedDate;

    @Enumerated(EnumType.STRING)
    @Column(name="user_role")
    private UserRole userRole;

    @Column(name="user_manager")
    private String userManager;

    @Column(name="organization_id")
    private Long organizationId;
}