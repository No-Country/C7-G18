export interface IBrand{
    id?:string,
    name:string,
    url:string,
    created:string
}


export interface IProductClass{
    id?:string,
    class:string,
    name:string,
    created:string,
    subcategories?:string[],
    default?:boolean,
    category?:any
}