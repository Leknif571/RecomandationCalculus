import { Match } from "../../../domain/entities/match.entity";
import type { DataPort } from "../../../application/port/out/data.port";
import type { StrategyInterface } from "./data/strategy/interface.strategy";

export default class DataAdapter implements DataPort {
    constructor(private readonly repository: StrategyInterface) {}

    async getMatch(): Promise<Match[]> {
        const dtos = await this.repository.loadData();
        const matches = dtos.map(d => new Match(
            new Date(d.date),
            d.homeTeam,
            d.awayTeam,
            Number(d.homeScore),
            Number(d.awayScore),
            d.tournament,
            d.city,
            d.country,
            Boolean(d.neutral)
        ));
        return matches;
    }    
}

