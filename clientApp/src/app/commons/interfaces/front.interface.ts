export interface IBrand{
    id?:string,
    name:string,
    url:string,
    created:string
}


export interface IProductClass{
    id?:string,
    name?:string,
    created?:string,
    category?:string,
    nameCategory?:string,
    subcategories?:string[],
    default?:boolean
}