export class AlojamientoOcupadoError extends Error {

    constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    }
}