package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private long id;
    @Column(name="username")
    private String username;
    @Column(name="team_id")
    private long teamId;
}
