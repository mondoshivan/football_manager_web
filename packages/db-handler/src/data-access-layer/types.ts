export interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllClubsFilters extends ListFilters {}
export interface GetAllFormationFilters extends ListFilters {}
export interface GetAllCalendarFilters extends ListFilters {}
export interface GetAllAppFilters extends ListFilters {}
export interface GetAllSkillsFilters extends ListFilters {}
export interface GetAllTeamsFilters extends ListFilters {}
export interface GetAllPlayersFilters extends ListFilters {}
export interface GetAllChampionshipsFilters extends ListFilters {}
export interface GetAllOccurrenceFilters extends ListFilters {}
export interface GetAllTokensFilters extends ListFilters {}
export interface GetAllTokenFamiliesFilters extends ListFilters {}

export interface GetAllUsersFilters extends ListFilters {
    email?: string
    password?: string
}

export interface NestedByName {
    name: string
    includes?: NestedByName[]
}

export interface IncludesFilters {
    includeAll?: boolean
    includeNested?: boolean
    includeByName?: string
    includeNestedByName?: NestedByName[]
}