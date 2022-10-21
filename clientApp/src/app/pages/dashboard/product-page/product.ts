import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
export interface ProductTable{
    id?:number,
    name:string,
    price?:number,
    img?:string,
    pet?:string,
    category:string,
    subcategory?:string,
    created?:string,
    datacategory?:CardDashboard
}