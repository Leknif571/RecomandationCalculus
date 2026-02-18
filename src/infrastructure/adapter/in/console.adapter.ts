import { select, Separator, input } from '@inquirer/prompts';
import MatchService from '../../../application/services/match.service';
import type { MatchPort } from '../../../application/port/in/match.port';

export class ConsoleAdapter {
  constructor(private readonly service: MatchPort) {}

  async start() {
 
    console.clear();

    const answer = await select({
    message: 'TRD Analytics - Que souhaitez-vous consulter ?',
    choices: [
        {
            name: 'Matchs',
            value: 'matchs',
        },
        {
            name: 'Equipes',
            value: 'equipes',
        },
        {
            name : 'Liste des matchs par équipe',
            value : 'matchs2'
        },
        {
            name: 'Quitter',
            value: 'quitter',
        },
        
    ],
    });


    switch (answer) {
      case 'matchs':
        const matchs = await this.service.getAllMatch();
        console.table(matchs);
        break;
      case 'equipes':
        const teams = await this.service.getEquipeByAlpha();
        console.table(teams);
        break;
      case 'matchs2':
        const country = await input({
          message: 'Quel pays souhaitez-vous consulter ?',
        });
        const matches = await this.service.getMatchForOneTeam(country);
        if(matches.list.length == 0)
          console.log("Not found");
        else 
            console.table(matches.list);
        break;
      case 'quitter':
        process.exit(0);
    }
    

  }
}