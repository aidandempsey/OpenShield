package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name="team")
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="team_id")
    private long id;
    @Column(name="team_name")
    private String teamName;
    @Column(name="team_leader")
    private long teamLeader;
    @Column(name="team_description")
    private String teamDescription;
}