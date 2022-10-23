export type TeamsDTO = {
    name: string
}

export type ChampionshipDTO = {
    name: string;
    Teams: TeamsDTO[]
}

export type CreateChampionShipDTO = {
    name: string;
}

export type FilterChampionShipDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}