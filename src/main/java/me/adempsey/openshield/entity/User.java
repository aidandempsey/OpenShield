package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import me.adempsey.openshield.entity.enums.UserRole;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long userId;

    @Column(name="display_name")
    private String displayName;

    @Column(name="email_address")
    private String emailAddress;

    @Column(name="account_created_date")
    private Date accountCreatedDate;

    @Column(name="team_id")
    private Long teamId;

    @Enumerated(EnumType.STRING)
    @Column(name="user_role")
    private UserRole userRole;
}