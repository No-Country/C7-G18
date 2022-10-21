export interface CardDashboard {
    id?:string,
    class?:string,
    tipo?:string,
    name?:string,
    created?:string,
    subcategory?:Subcategory[],
    default?:boolean,
    url?:string
    
}

interface Subcategory{
    id:string,
    name:string
}