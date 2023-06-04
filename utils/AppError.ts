export interface IAppError {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
}

class AppError extends Error implements IAppError {
  constructor(
    message: string,
    public statusCode: number,
    public status: string,
    public isOperational: boolean = true
  ) {
    super(message);
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

module.exports = AppError;
