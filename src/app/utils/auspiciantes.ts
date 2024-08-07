export class Auspiciantes{
    static getAuspiciantes():Auspiciante[]{
        return [
            {
                name:"assets/auspiciantes/lj.jpg"
            },
            {
                name:"assets/auspiciantes/cg.png"
            }
        ]
    }
}

export interface Auspiciante{
    name:string;
}