interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllClubsFilters extends ListFilters {}
export interface GetAllChampionshipsFilters extends ListFilters {}
