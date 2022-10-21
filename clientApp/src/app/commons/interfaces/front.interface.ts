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
    nameCategory?:string,
    subcategories?:string[],
    default?:boolean,
    category?:any
}