export interface CardProduct {
    id?:number,

    nombre:string,
    img:string,
    precio:number,
    oferta?:number,
    nuevo?:boolean,
    descripcion?:string,
    meGusta:boolean,

    stock?:number,
    vendidos:number,

    mascota?:string,
    categoria?:string,
    subcategoria?:string,
    marca?:string,
    tamaño?:string
}
