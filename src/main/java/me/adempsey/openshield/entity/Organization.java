package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="organization")
@Data
@NoArgsConstructor
public class Organization {
    public Organization(String organizationName, String organizationDescription, Long organizationLeader){
        this.organizationName = organizationName;
        this.organizationDescription = organizationDescription;
        this.organizationLeader = organizationLeader;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="organization_id")
    private Long organizationId;

    @Column(name="organization_name")
    private String organizationName;

    @Column(name="organization_description")
    private String organizationDescription;

    @Column(name="organization_leader")
    private Long organizationLeader;
}