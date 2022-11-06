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

export type CreateFormationDTO = {
    name: string;
    description: string;
    defender: number;
    midfielder: number;
    forward: number;
}

export type TeamDTO = {
    id: number;
    Formation?: FormationDTO;
    name: string;
    Players?: PlayerDTO[];
}

export type ChampionshipDTO = {
    id: number;
    name: string;
    Teams?: TeamDTO[];
}

export type CreateChampionShipDTO = {
    name: string;
}

export type FilterFormationDTO = FilterDTO & {
    
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

export type RefreshAuthDTO = TokenDTO & {}

export type RegisterAuthDTO = {
    name: string
    email: string
    password: string
}

export type TokenDTO = {
    accessToken: string
    refreshToken: string
  }