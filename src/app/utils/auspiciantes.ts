export class Auspiciantes{
    static getAuspiciantes():Auspiciante[]{
        return [
            {name:'assets/logos/lic.jpg'}
        ]
    }
}

export interface Auspiciante{
    name:string;
}