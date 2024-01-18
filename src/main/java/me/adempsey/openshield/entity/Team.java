package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name="team")
@Data
@NoArgsConstructor
public class Team {
    public Team(String teamName, String teamDescription, String teamLeader, Long organizationId){
        this.teamName = teamName;
        this.teamDescription = teamDescription;
        this.teamLeader = teamLeader;
        this.organizationId = organizationId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="team_id")
    private Long teamId;

    @Column(name="team_name")
    private String teamName;

    @Column(name="team_description")
    private String teamDescription;

    @Column(name="team_leader")
    private String teamLeader;

    @Column(name="organization_id")
    private Long organizationId;
}