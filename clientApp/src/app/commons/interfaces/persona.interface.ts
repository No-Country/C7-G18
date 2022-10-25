
export interface PersonaI
{ 
    success: boolean, 
    data: 
    { 
        numero: number, 
        nombre_completo: string, 
        nombres: string, 
        apellido_paterno: string, 
        apellido_materno: string,
        ubigeo_sunat: string | null, 
        ubigeo?: []
    }, 
    source: string
}