//Espejo de RealizarCompraRequest
export interface RealizarCompraRequest {
    modeloId: string;
    compradorId: string;
}

//Espejo de CompraDetalle
export interface CompraDetalle {
    id: string;
    modeloId: string;
    compradorId: string;
    fechaCompra: string;
    montoPrecio: number;
    moneda: string;
    estado: string;
}
