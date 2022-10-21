import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
import { IProductClass } from '../../../commons/interfaces/front.interface';
export interface Dialog {
    id?:string
    modo:string,
    nombre?:string,
    url?:string,
    categories?:CardDashboard[],
    brands?:CardDashboard[],
    pets?:CardDashboard[],
    product?:IProductClass
}
