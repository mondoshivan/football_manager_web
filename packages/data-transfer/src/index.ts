
export type IncludesDTO = {
    includeAll?: boolean;
    includeNested?: boolean;
    includeByName?: string;
}

export type FilterDTO = {
    isDeleted?: boolean;
    includeDeleted?: boolean;
}

export type PlayerSkill = {
    value: number
}

export type SkillDTO = {
    name: string;
    type: string;
    description: string;
    PlayerSkill?: PlayerSkill
}

export type PlayerDTO = {
    id: number;
    firstName: string;
    secondName: string;
    birthday: Date;
    height: number;
    Skills?: SkillDTO[];
}

export type FormationDTO = {
    id: number;
    name: string;
    description: string;
    defender: number;
    midfielder: number;
    forward: number;
}

export type OccurrenceDTO = {
    id: number;
    type: string;
    date: Date;
}

export type CalendarDTO = {
    id: number;
    type: string;
    Occurrences: OccurrenceDTO[];
}

export type CreateFormationDTO = {
    name: string;
    description: string;
    defender: number;
    midfielder: number;
    forward: number;
}

export type TeamDTO = {
    id: number;
    Calendars?: CalendarDTO[];
    Formation?: FormationDTO;
    name: string;
    Players?: PlayerDTO[];
}

export type ChampionshipDTO = {
    id: number;
    name: string;
    Teams?: TeamDTO[];
}

export type AppDTO = {
    id: number;
    start: Date;
    day: Date;
}

export type CreateChampionShipDTO = {
    name: string;
}

export type FilterFormationDTO = FilterDTO & {
    
}

export type FilterAppDTO = FilterDTO & {
    id?: number;
}

export type FilterChampionShipDTO = FilterDTO & {
    id?: number;
}

export type GetByIdDTO = {
    id?: number;
}

export type UpdateTeamFormationDTO = {
    teamId: number;
    formation: string;
}

export type FilterTeamsDTO = FilterDTO & {}

export type FilterPlayerDTO = FilterDTO & {}

export type UserDTO = FilterDTO & {
    email?: string
}

export type LoginAuthDTO = {
    email: string
    password: string
}

export type RefreshAuthDTO = TokensDTO & {}

export type RegisterAuthDTO = {
    name: string
    email: string
    password: string
}

export type RefreshTokenDTO = {
    refreshToken: string
}

export type TokensDTO = RefreshTokenDTO & {
    accessToken: string
}

export type AuthResponseDTO = {
    message: string
}