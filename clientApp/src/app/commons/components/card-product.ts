export interface CardProduct {
    id?:number,

    nombre:string,
    img:string,
    precio:number,
    oferta?:number,
    fecha?:string,
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

export interface Product{
    id?:string,
    name:string,
    price:number,
    img:string,
    date_create?:string,
    discount?:number,
    stock?:number,
    category?: string,
    subcategory?:string,
    brand?:string,
    pet?:string,

    description?:string,
    sold:number,

    meGusta?:boolean,
    nuevo?:boolean
}

export interface newPoducts{
    
}
