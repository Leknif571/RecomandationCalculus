import  { MatchDto } from "../../../application/dtos/match.dto";
import type { RepositoryInterface } from "../interface.repository";


export default class CsvRepository implements RepositoryInterface{

    async loadData(): Promise<MatchDto[]> {

        let matches : MatchDto[] = []
        const file = Bun.file("C:/Users/delit/Documents/CalculusRecommandation/data.csv");
        const text = await file.text();
            
        const lines = text.split('\n');

        matches = lines.slice(1)
            .filter(line => line.trim() !== '')
            .map(line => {
                const cols = line.split(',');
                return new MatchDto(
                    new Date(cols[0] ?? ''),       
                    cols[1] ?? '',
                    cols[2] ?? '',
                    parseInt(cols[3] ?? ''),
                    parseInt(cols[4] ?? ''),
                    cols[5] ?? '',
                    cols[6] ?? '',
                    cols[7] ?? '',
                    cols[8]?.trim() === 'TRUE' 
                );
            });
        return matches;  
    }
}