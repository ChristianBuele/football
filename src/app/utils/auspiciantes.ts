export class Auspiciantes{
    static getAuspiciantes():Auspiciante[]{
        return [
            {name:'assets/logos/logo.png'}
        ]
    }
}

export interface Auspiciante{
    name:string;
}
