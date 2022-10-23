import Utils from "@football-manager/utils";

export interface SecondNameAttributes {
    country: 'uk' | 'de';
}

export interface FirstNameAttributes extends SecondNameAttributes {
    gender: 'male' | 'female' | 'unisex';
}

export interface FirstName extends FirstNameAttributes {
    name: string;
}

export interface SecondName extends SecondNameAttributes {
    name: string;
}

class NameService {

    private firstNameList : FirstName[] = [];
    private secondNameList : SecondName[] = [];

    constructor(firstNameList: FirstName[], secondNameList: SecondName[]) {
        this.firstNameList = firstNameList;
        this.secondNameList = secondNameList;
    }

    public firstName(attributes?: FirstNameAttributes) : string {

        let selection : FirstName[] = this.firstNameList;

        if (attributes) {
            
            // filter the list
            selection = this.firstNameList.filter(name => {
                name.gender === attributes.gender && name.country === attributes.country
            });
        }

        if (selection.length === 0) throw new Error('nothing found');

        // pick a random
        const index = Utils.randomIntFromInterval(0, selection.length - 1);

        // return the name
        return selection[index].name;
    }

    public secondName(attributes?: SecondNameAttributes) : string {

        let selection : SecondName[] = this.secondNameList;

        if (attributes) {

            // filter the list
            selection = this.secondNameList.filter(name => {
                name.country === attributes.country
            });
        }

        if (selection.length === 0) throw new Error('nothing found');

        // pick a random
        const index = Utils.randomIntFromInterval(0, selection.length - 1);

        // return the name
        return selection[index].name;
    }
}

export default NameService;