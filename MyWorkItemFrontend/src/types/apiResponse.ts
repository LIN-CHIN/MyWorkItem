export enum ResponseCode {
  Success          = 0,
  SystemError      = 1,
  NotFoundId       = 2,
  ValidationError  = 3,
  Unauthorized     = 4,
  Forbidden        = 5,
  DuplicateEntry   = 6,
  InvalidOperation = 7,
}

export interface ApiResponseBase {
  code: ResponseCode;
  message: string;
}

export interface ApiResponse<T> extends ApiResponseBase {
  content: T | null;
}
