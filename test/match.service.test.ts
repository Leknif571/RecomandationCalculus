import { expect, test, describe, beforeEach } from "bun:test";
import MatchService from "../src/application/services/match.service";
import { MatchDto } from "../src/application/dtos/match.dto";
import { ListMatchDto } from "../src/application/dtos/list_match.dto";
import { TeamAlphaDto } from "../src/application/dtos/team_alpha.dto";
import type { DataPort } from "../src/application/port/out/data.port";
import type { Match } from "../src/domain/entities/match.entity";

describe("MatchService", () => {
  let matchService: MatchService;
  let mockRepository: DataPort;

  const sampleMatches: MatchDto[] = [
    new MatchDto(
      new Date("2023-01-01"),
      "Team A",
      "Team B",
      2,
      1,
      "Tournament 1",
      "City A",
      "Country A",
      false
    ),
    new MatchDto(
      new Date("2023-01-02"),
      "Team C",
      "Team A",
      1,
      1,
      "Tournament 1",
      "City B",
      "Country B",
      true
    ),
    new MatchDto(
      new Date("2023-01-03"),
      "Team B",
      "Team C",
      3,
      0,
      "Tournament 2",
      "City C",
      "Country C",
      false
    ),
  ];

  beforeEach(() => {
    mockRepository = {
      getMatch: async () => sampleMatches as Match[],
    };
    matchService = new MatchService(mockRepository);
  });

  describe("getAllMatch", () => {
    test("should return all matches from repository", async () => {
      const result = await matchService.getAllMatch();

      expect(result).toEqual(sampleMatches);
      expect(result.length).toBe(3);
    });

    test("should return empty array when repository has no matches", async () => {
      mockRepository.getMatch = async () => [];
      matchService = new MatchService(mockRepository);

      const result = await matchService.getAllMatch();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe("getEquipeByAlpha", () => {
    test("should return all teams sorted alphabetically", async () => {
      const result = await matchService.getEquipeByAlpha();

      expect(result.length).toBe(3);
      expect(result[0]?.team).toBe("Team A");
      expect(result[1]?.team).toBe("Team B");
      expect(result[2]?.team).toBe("Team C");
    });

    test("should return unique teams only", async () => {
      const duplicateMatches: MatchDto[] = [
        new MatchDto(
          new Date("2023-01-01"),
          "Team A",
          "Team B",
          2,
          1,
          "Tournament 1",
          "City A",
          "Country A",
          false
        ),
        new MatchDto(
          new Date("2023-01-02"),
          "Team A",
          "Team B",
          1,
          1,
          "Tournament 1",
          "City B",
          "Country B",
          true
        ),
      ];

      mockRepository.getMatch = async () => duplicateMatches as Match[];
      matchService = new MatchService(mockRepository);

      const result = await matchService.getEquipeByAlpha();

      expect(result.length).toBe(2);
      expect(result[0]?.team).toBe("Team A");
      expect(result[1]?.team).toBe("Team B");
    });

    test("should return empty array when no matches", async () => {
      mockRepository.getMatch = async () => [];
      matchService = new MatchService(mockRepository);

      const result = await matchService.getEquipeByAlpha();

      expect(result.length).toBe(0);
    });

    test("should return TeamAlphaDto instances", async () => {
      const result = await matchService.getEquipeByAlpha();

      result.forEach((team) => {
        expect(team).toBeInstanceOf(TeamAlphaDto);
      });
    });
  });

  describe("getMatchForOneTeam", () => {
    test("should return matches for a specific team as home team", async () => {
      const result = await matchService.getMatchForOneTeam("Team A");

      expect(result).toBeInstanceOf(ListMatchDto);
      expect(result.team).toBe("Team A");
      expect(result.list.length).toBe(2);
    });

    test("should return matches for a specific team as away team", async () => {
      const result = await matchService.getMatchForOneTeam("Team B");

      expect(result.team).toBe("Team B");
      expect(result.list.length).toBe(2);
    });

    test("should be case-insensitive when filtering teams", async () => {
      const result = await matchService.getMatchForOneTeam("team a");

      expect(result.list.length).toBe(2);
    });

    test("should return empty list when team has no matches", async () => {
      const result = await matchService.getMatchForOneTeam("Team Z");

      expect(result.team).toBe("Team Z");
      expect(result.list.length).toBe(0);
    });

    test("should return both home and away matches for a team", async () => {
      const result = await matchService.getMatchForOneTeam("Team A");

      const homeMatches = result.list.filter(
        (match) => match.homeTeam === "Team A"
      );
      const awayMatches = result.list.filter(
        (match) => match.awayTeam === "Team A"
      );

      expect(homeMatches.length).toBe(1);
      expect(awayMatches.length).toBe(1);
    });

    test("should preserve match data in returned ListMatchDto", async () => {
      const result = await matchService.getMatchForOneTeam("Team A");

      expect(result.list[0]?.homeTeam).toBe("Team A");
      expect(result.list[0]?.awayTeam).toBe("Team B");
      expect(result.list[0]?.homeScore).toBe(2);
      expect(result.list[0]?.awayScore).toBe(1);
    });
  });
});

