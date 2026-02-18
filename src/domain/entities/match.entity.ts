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


  totalGoals(): number {
    return this.homeScore + this.awayScore;
  }

  isDraw(): boolean {
    return this.homeScore === this.awayScore;
  }

  winner(): string {
    if (this.isDraw()) return "None";
    return this.homeScore > this.awayScore ? this.homeTeam : this.awayTeam;
  }

  loser(): string {
    if (this.isDraw()) return "None";
    return this.homeScore < this.awayScore ? this.homeTeam : this.awayTeam;
  }

  isWonBy(teamName: string): boolean {
    return this.winner().toLowerCase() === teamName.toLowerCase();
  }

  involves(teamName: string): boolean {
    const nameLower = teamName.toLowerCase();
    return (
      this.homeTeam.toLowerCase() === nameLower ||
      this.awayTeam.toLowerCase() === nameLower
    );
  }

}

