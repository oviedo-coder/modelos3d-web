export type Licencia = "PERSONAL" | "COMERCIAL" | "ILIMITADA";

// Espejo de ModeloResponse
export interface Modelo {
    id: string;
    titulo: string;
    precio: number;
    moneda: string;
    licencia: Licencia;
    permiteUsoComercial: boolean;
}

//Espejo de PageResponse
export interface Pagina<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;

}
