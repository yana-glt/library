class CustomError extends Error {
  public statusCode: number;
  public message: string;
  public isOperational: boolean; 

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.isOperational = true;
  }
}

export default CustomError;
