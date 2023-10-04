export interface PlayersResponse{
    players:Player[]
}

export interface Player {
    id?:number;
    number:number;
    name:string;
    titular:boolean;
    idTeam:number
}

