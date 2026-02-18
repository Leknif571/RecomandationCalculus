import type { MatchPort } from "../port/in/match.port";
import type { MatchDto } from "../dtos/match.dto";
import { ListMatchDto } from "../dtos/list_match.dto";
import { TeamAlphaDto } from "../dtos/team_alpha.dto";
import type { DataPort } from "../port/out/data.port";
import { Team } from "../../domain/entities/team.entity";

export default class MatchService implements MatchPort {
    
    constructor(private readonly repository: DataPort) {}

    async getTeamStats(name: string): Promise<Team> {
        const allMatches = await this.repository.getMatch();
        const teamMatches = allMatches.filter(m => m.involves(name));
        
        return new Team(Date.now(), name, teamMatches);
    }

    async getAllMatch(): Promise<MatchDto[]> {
        return await this.repository.getMatch();
    }
        
    async getEquipeByAlpha(): Promise<TeamAlphaDto[]> {
        const matches = await this.repository.getMatch();
        const teams = new Set<string>();
            
        for (const match of matches) {
            teams.add(match.homeTeam);
            teams.add(match.awayTeam);
        }

        return Array.from(teams)
            .sort((team1, team2) => team1.localeCompare(team2))
            .map(name => new TeamAlphaDto(name));
    }

    async getMatchForOneTeam(name: string): Promise<ListMatchDto> {
        const allMatches = await this.repository.getMatch();

        const filteredMatches = allMatches.filter(match => 
            match.homeTeam.toLowerCase() === name.toLowerCase() || 
            match.awayTeam.toLowerCase() === name.toLowerCase()
        );

        const matchDtos : MatchDto[] = filteredMatches.map(match => { 
            return match as MatchDto;
        });

        return new ListMatchDto(name, matchDtos);
    }
}