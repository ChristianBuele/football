export class Auspiciantes{
    static getAuspiciantes():Auspiciante[]{
        return [
            {name:'assets/teams/logo.png'}
        ]
    }
}

export interface Auspiciante{
    name:string;
}