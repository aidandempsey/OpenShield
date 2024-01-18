package me.adempsey.openshield.controller;
import me.adempsey.openshield.entity.Team;
import me.adempsey.openshield.requestmodels.TeamRequest;
import me.adempsey.openshield.service.TeamService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService){this.teamService = teamService;}

    @PostMapping("/createTeam")
    public Team createTeam(@RequestHeader(value = "Authorization")String token, @RequestBody TeamRequest teamRequest) throws Exception{
        return teamService.createTeam(GetUidFromJWT.validateToken(token), teamRequest);
    }

    @GetMapping("/getTeamNameFromTeamId")
    public String getTeamNameFromTeamId(@RequestParam Long teamId){
        return teamService.getTeamNameFromTeamId(teamId);
    }
}
