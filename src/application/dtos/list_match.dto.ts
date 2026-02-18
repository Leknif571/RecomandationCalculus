import type { MatchDto } from "./match.dto";

export class ListMatchDto {
    team: string;
    list : MatchDto[];


    constructor(team:string, list:MatchDto[]){
        this.team = team;
        this.list = list;
    }

}