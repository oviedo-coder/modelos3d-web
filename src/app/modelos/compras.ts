// Espejo de RealizarCompraRequest
export interface RealizarCompraRequest {
    modeloId: string;
    compradorId: string;
}

//Espejo de CompraDetalleResponse
export interface CompraDetalle {
    id: string;
    modeloId: string;
    compradorId: string;
    montoPrecio: number;
    estado : string;
    fechaCompra: Date;

}