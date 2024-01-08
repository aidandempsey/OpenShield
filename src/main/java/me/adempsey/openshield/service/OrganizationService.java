package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.OrganizationRepository;
import me.adempsey.openshield.entity.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepos){this.organizationRepository = organizationRepos; }

    public Organization createOrganization(String organizationName, String organizationDescription, Long organizationLeader) throws Exception{
        Organization organization = new Organization(organizationName, organizationDescription, organizationLeader);
        organizationRepository.save(organization);
        return organization;

    }
}