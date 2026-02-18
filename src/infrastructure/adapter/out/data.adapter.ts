import type { Match } from "../../../domain/entities/match.entity";
import type { DataPort } from "../../../application/port/out/data.port";
import type { RepositoryInterface } from "../../repositories/interface.repository";

export default class DataAdapter implements DataPort {
    constructor(private readonly repository: RepositoryInterface) {}

    async getMatch(): Promise<Match[]> {
        let matches = await this.repository.loadData();
        return matches as Match[];
    }    
}

