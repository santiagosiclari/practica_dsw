export class AlojamientoSobrepasadoError extends Error {

    constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    }
}