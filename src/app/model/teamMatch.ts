import { Categorie } from "./categorie";
import { Match } from "./match";

export interface TeamMatchResponse {
    teamMatch: TeamMatch;
    local:    Team,
    visit: Team,
    category?:Categorie
}

export interface Team {
    id:        number;
    name:      string;
    color:     string;
}

export interface TeamMatch{
    id:          number;
    idTeamLocal: number;
    idTeamVisit: number;
    idMatch:     number;
}

export interface MatchDataResponse {
    teams:Team[];
    match:Match;
}
