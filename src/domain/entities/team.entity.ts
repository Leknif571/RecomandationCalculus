import type { Match } from "./match.entity";

export class Team {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly matches: Match[],
  ) {}


  victories(): Match[] {
    return this.matches.filter(match => match.isWonBy(this.name));
  }

  defeats(): Match[] {
    return this.matches.filter(match => !match.isDraw() && !match.isWonBy(this.name));
  }

  draws(): Match[] {
    return this.matches.filter(match => match.isDraw());
  }

  victoriesRate(): number {
    if (this.matches.length === 0) return 0;
    return (this.victories().length / this.matches.length) * 100;
  }

  goalsScored(): number {
    return this.matches.reduce((total, match) => {
      const isHome = match.homeTeam.toLowerCase() === this.name.toLowerCase();
      return total + (isHome ? match.homeScore : match.awayScore);
    }, 0);
  }

  goalsConceded(): number {
    return this.matches.reduce((total, match) => {
      const isHome = match.homeTeam.toLowerCase() === this.name.toLowerCase();
      return total + (isHome ? match.awayScore : match.homeScore);
    }, 0);
  }


  goalDifference(): number {
    return this.goalsScored() - this.goalsConceded();
  }
}