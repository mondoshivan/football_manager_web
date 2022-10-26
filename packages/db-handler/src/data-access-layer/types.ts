interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllClubsFilters extends ListFilters {}
export interface GetAllFormationFilters extends ListFilters {}
export interface GetAllSkillsFilters extends ListFilters {}
export interface GetAllTeamsFilters extends ListFilters {}
export interface GetAllPlayersFilters extends ListFilters {}
export interface GetAllChampionshipsFilters extends ListFilters {}

export interface IncludesFilters {
    includeAll?: boolean
    includeNested?: boolean
    includeByName?: string
}