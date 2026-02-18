import type { MatchDto } from "../../../../application/dtos/match.dto";

export interface StrategyInterface {
    loadData(): Promise<MatchDto[]>;
}