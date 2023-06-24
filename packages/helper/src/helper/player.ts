import { PlayerDTO } from "@football-manager/data-transfer";
import { Utils } from "@football-manager/utils";

export const getAge = (player: PlayerDTO, now: number) => {
    return Utils.ageBetweenDates(new Date(player.birthday), new Date(now));
}

export const getSkillAvg = (player: PlayerDTO, type: string) => {
    // get the relevant skills
    const skills = player?.Skills?.filter(skill => skill.type === type);

    // guard
    if (!skills || skills.length === 0) throw new Error('could not find skills');

    // sum the values
    const total = skills.map(skill => skill.PlayerSkill!.value).reduce((a, b) => a + b, 0);

    return total / skills.length;
}