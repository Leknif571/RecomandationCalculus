import type { Team } from "../../../domain/entities/team.entity";
import { ListMatchDto } from "../../dtos/list_match.dto";
import { MatchDto } from "../../dtos/match.dto";
import { TeamAlphaDto } from "../../dtos/team_alpha.dto";

export interface MatchPort {
    getAllMatch():Promise<MatchDto[]>;
    getEquipeByAlpha(): Promise<TeamAlphaDto[]>;
    getMatchForOneTeam(name : string): Promise<ListMatchDto>;
    getTeamStats(name: string): Promise<Team>;
}