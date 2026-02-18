import { ConsoleAdapter } from "./src/infrastructure/adapter/in/console.adapter";
import DataAdapter from "./src/infrastructure/adapter/out/data.adapter";
import CsvRepository from "./src/infrastructure/repositories/csv/csv.repository";
import MatchService from "./src/application/services/match.service";

const matchRepository = new CsvRepository();
const matchRepositoryAdapter = new DataAdapter(matchRepository);


const matchService = new MatchService(matchRepositoryAdapter);
const cli = new ConsoleAdapter(matchService);

cli.start();