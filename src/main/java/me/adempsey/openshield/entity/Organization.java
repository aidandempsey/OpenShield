package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="organization")
@Data
public class Organization {
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