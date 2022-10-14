interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllClubsFilters extends ListFilters {}
export interface GetAllTeamsFilters extends ListFilters {}
export interface GetAllPlayersFilters extends ListFilters {}
export interface GetAllChampionshipsFilters extends ListFilters {}
