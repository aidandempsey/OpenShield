package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Page<Team> findByTeamLeader(@RequestParam("team_leader")Long teamLeader, Pageable pageable);
    Page<Team> findByOrganizationId(@RequestParam("organization_id")Long organizationId, Pageable pageable);
}
