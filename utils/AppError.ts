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
    //屏蔽此錯誤stack的訊息
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
