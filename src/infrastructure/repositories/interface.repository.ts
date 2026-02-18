import type { MatchDto } from "../../application/dtos/match.dto";

export interface RepositoryInterface {
    loadData(): Promise<MatchDto[]>;
}