package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.OrganizationRepository;
import me.adempsey.openshield.entity.Organization;
import me.adempsey.openshield.requestmodels.OrganizationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepos){this.organizationRepository = organizationRepos; }

    public Organization createOrganization(String organizationLeader, OrganizationRequest organizationRequest) throws Exception{
        Organization organization = new Organization();
        organization.setOrganizationLeader(organizationLeader);
        organization.setOrganizationName(organizationRequest.getOrganizationName());

        if(organizationRequest.getOrganizationDescription() != null && organizationRequest.getOrganizationDescription().isPresent()){
            organization.setOrganizationDescription(organizationRequest.getOrganizationDescription().map(
                    Object::toString
            ).orElse(null));
        }

        organizationRepository.save(organization);
        return organization;

    }
}