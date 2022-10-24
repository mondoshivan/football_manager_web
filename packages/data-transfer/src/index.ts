export type PlayerDTO = {
    firstName: string;
    secondName: string;
    birthday: Date;
    height: number;
}

export type TeamDTO = {
    name: string;
    Players: PlayerDTO[];
}

export type ChampionshipDTO = {
    name: string;
    Teams: TeamDTO[];
}

export type CreateChampionShipDTO = {
    name: string;
}

export type FilterChampionShipDTO = {
    isDeleted?: boolean;
    includeDeleted?: boolean;
}