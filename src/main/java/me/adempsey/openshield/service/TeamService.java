package me.adempsey.openshield.service;
import me.adempsey.openshield.dao.TeamRepository;
import me.adempsey.openshield.entity.Team;
import me.adempsey.openshield.requestmodels.TeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository){this.teamRepository = teamRepository;}

    public Team createTeam(String teamLeader, TeamRequest teamRequest){
        Team team = new Team();
        team.setTeamLeader(teamLeader);
        team.setTeamName(teamRequest.getTeamName());
        team.setOrganizationId(teamRequest.getOrganizationId());

        if(teamRequest.getTeamDescription() != null && teamRequest.getTeamDescription().isPresent()){
            team.setTeamDescription(teamRequest.getTeamDescription().map(
                    Object::toString
            ).orElse(null));
        }

        teamRepository.save(team);
        return team;
    }

    public String getTeamNameFromTeamId(Long teamId){
        return teamRepository.findTeamByTeamId(teamId).getTeamName();
    }
}
