import { select, input } from '@inquirer/prompts';
import type { MatchPort } from '../../../application/port/in/match.port';

export class ConsoleAdapter {
  constructor(private readonly service: MatchPort) {}

  async start() {
    console.clear();
    const answer = await select({
      message: 'TRD Analytics - Que souhaitez-vous consulter ?',
      choices: [
        { name: 'Liste des Matchs (Bruts)', value: 'matchs' },
        { name: 'Liste des Équipes', value: 'equipes' },
        { name: 'Matchs par équipe', value: 'matchs_team' },
        { name: 'Statistiques détaillées d\'une équipe', value: 'stats' },
        { name: 'Quitter', value: 'quitter' },
      ],
    });

    switch (answer) {
      case 'matchs':
        console.table(await this.service.getAllMatch());
        break;

      case 'equipes':
        console.table(await this.service.getEquipeByAlpha());
        break;

      case 'matchs_team':
        const countryName = await input({ message: 'Quel pays ?' });
        const res = await this.service.getMatchForOneTeam(countryName);
        res.list.length ? console.table(res.list) : console.log("Aucun match trouvé.");
        break;

      case 'stats':
        const teamName = await input({ message: 'Pour quelle équipe voulez-vous les statistiques ?' });
        const team = await this.service.getTeamStats(teamName);

        if (team.matches.length === 0) {
          console.log("Équipe non trouvée.");
        } else {
          this.displayTeamStats(team);
        }
        break;

      case 'quitter':
        process.exit(0);
    }

    // console.log("\n");
    // await this.start();
  }

  private displayTeamStats(team: any) {
    console.log(`\n=== ANALYSE POUR : ${team.name.toUpperCase()} ===`);
    
    const homeMatches = team.matches.filter((m: any) => m.homeTeam.toLowerCase() === team.name.toLowerCase());
    const awayMatches = team.matches.filter((m: any) => m.awayTeam.toLowerCase() === team.name.toLowerCase());

    console.log(`Total Matchs : ${team.matches.length} (Dom: ${homeMatches.length} / Ext: ${awayMatches.length})`);
    
    console.log(`   Buts Marqués : ${team.goalsScored()} (Dom: ${this.sumGoals(homeMatches, 'home')} / Ext: ${this.sumGoals(awayMatches, 'away')})`);
    console.log(`   Buts Encaissés : ${team.goalsConceded()} (Dom: ${this.sumGoals(homeMatches, 'away')} / Ext: ${this.sumGoals(awayMatches, 'home')})`);

    console.log(`Taux Victoire Global : ${team.victoriesRate().toFixed(2)}%`);
    console.log(`   Victoires à Domicile : ${team.victories().filter((m: any) => m.homeTeam.toLowerCase() === team.name.toLowerCase()).length}`);
    console.log(`   Victoires à l'Extérieur : ${team.victories().filter((m: any) => m.awayTeam.toLowerCase() === team.name.toLowerCase()).length}`);

    console.log(`Matchs Nuls : ${team.draws().length}`);
    console.log(`    Défaites à Domicile : ${team.defeats().filter((m: any) => m.homeTeam.toLowerCase() === team.name.toLowerCase()).length}`);
    
  }

  private sumGoals(matches: any[], type: 'home' | 'away'): number {
    return matches.reduce((sum, m) => sum + (type === 'home' ? m.homeScore : m.awayScore), 0);
  }
}