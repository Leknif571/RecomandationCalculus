import { ConsoleAdapter } from "./src/infrastructure/adapter/in/console.adapter";
import DataAdapter from "./src/infrastructure/adapter/out/data.adapter";
import CsvStrategy from "./src/infrastructure/adapter/out/data/strategy/csv/csv.strategy";
import MatchService from "./src/application/services/match.service";

const matchStrategy = new CsvStrategy();
const matchRepositoryAdapter = new DataAdapter(matchStrategy);


const matchService = new MatchService(matchRepositoryAdapter);
const cli = new ConsoleAdapter(matchService);

cli.start();