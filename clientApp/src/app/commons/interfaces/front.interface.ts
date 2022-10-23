


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
    price?:number,
    discount?:number,
    description?:string,
    category?:string,
    nameCategory?:string,
    subcategory?:string,
    nameSubcategory?:string,
    brand?:string
    nameBrand?:string,
    pet?:string,
    namePet?:string,
    default?:boolean,
    img?:string,
    stock?:number,
    like?:boolean,
    quantity?:number,
    subtotal?:number,
    meGusta?:boolean,
    nuevo?:boolean
}