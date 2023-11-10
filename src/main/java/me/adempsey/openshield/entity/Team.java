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
    private long teamId;

    @Column(name="team_name")
    private String teamName;

    @Column(name="team_description")
    private String teamDescription;

    @Column(name="team_leader")
    private long teamLeader;

    @Column(name="organization_id")
    private String organizationId;
}