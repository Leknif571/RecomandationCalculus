export class MatchDto {
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
}