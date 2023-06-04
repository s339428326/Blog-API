export interface IAppError {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
}

class AppError extends Error {
  //readonly
  readonly status: string;
  readonly isOperational: boolean;

  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = AppError;
