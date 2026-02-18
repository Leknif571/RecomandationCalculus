import type { Match } from "./match.entity";

export class Team {
  constructor(
    public readonly id : number,
    public readonly name: string,
    public readonly nbVictory : number,
    public readonly nbDefeat : number,
    public readonly nbDraw : number,
    public readonly matchs : Match[],
  ) {}


    victories():Array<Match> { 
      let listMatchWin = this.matchs.filter((match => {match.homeScore > match.awayScore}))
      return listMatchWin;
    }

    defeats():Array<Match> {
      let listMatchDefeat = this.matchs.filter((match => {match.homeScore < match.awayScore}))
      return listMatchDefeat;
    }

    draws():Array<Match> {
      let listMatchDefeat = this.matchs.filter((match => {match.homeScore == match.awayScore}))
      return listMatchDefeat;
    }

    // victoriesRate(): number  {

    // }

    // goalsScored():number {

    // } 
    // goalsConceded():number {

    // }
}

