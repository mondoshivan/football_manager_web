export type CreateTeamDTO = {
    name: string;
}

export type FilterTeamsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}