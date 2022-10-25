export type PlayerSkill = {
    value: number
}

export type SkillDTO = {
    name: string;
    type: string;
    description: string;
    PlayerSkill: PlayerSkill
}

export type PlayerDTO = {
    firstName: string;
    secondName: string;
    birthday: Date;
    height: number;
    Skills: SkillDTO[];
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

export type FilterFormationDTO = {
    isDeleted?: boolean;
    includeDeleted?: boolean;
}

export type TeamDTO = {
    id: number;
    Formation: FormationDTO;
    name: string;
    Players: PlayerDTO[];
}

export type ChampionshipDTO = {
    id: number;
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

export type UpdateTeamFormationDTO = {
    teamId: number;
    formation: string;
}

export type FilterTeamsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}