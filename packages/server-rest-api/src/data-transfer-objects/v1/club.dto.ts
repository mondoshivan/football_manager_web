export type CreateClubDTO = {
    name: string;
}

export type FilterClubsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}