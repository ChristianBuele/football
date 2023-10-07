export interface Categorie{
    id?:number;
    name:string;
}

export interface CategoriesResponse{
    categories:Categorie[];
}