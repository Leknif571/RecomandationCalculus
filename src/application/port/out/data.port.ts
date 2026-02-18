import type { Match } from "../../../domain/entities/match.entity";

export interface DataPort {
    getMatch(): Promise<Match[]>;
}