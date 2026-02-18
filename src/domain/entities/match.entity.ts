export class Match {
  constructor(
    public readonly date: Date,
    public readonly homeTeam: string,
    public readonly awayTeam: string,
    public readonly homeScore: number,
    public readonly awayScore: number,
    public readonly tournament: string,
    public readonly city: string,
    public readonly country: string,
    public readonly neutral: boolean
  ) {}


    totalGoals():number {
      return 0;
    }

    isDraw():boolean {
      return false;
    }

    winner():string {
      return "";
    }

    loser():string {
      return "";
    }

    isWonBy(teamName:string):boolean {
      return false;
    }

    involves(teamName: string): boolean{
      return false;
    }

}

