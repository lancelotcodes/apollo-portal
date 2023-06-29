export interface GenericResponseType<T> {
  errors: [];
  message: string;
  originalException: {
    data: Record<string, string>;
    hResult: number;
    helpLink: string;
    innerException: string;
    message: string;
    source: string;
    stackTrace: string;
  };
  success: true;
  data: T;
}

export interface GenericCreateEntityResponse<T> {
  entityId: T;
}

export type ExtendedErrorResponse =
  | {
      status: number;
      data: GenericResponseType<Record<string, any>>;
    }
  | {
      status: 'FETCH_ERROR';
      data?: GenericResponseType<Record<string, any>>;
      error: string;
    }
  | {
      status: 'PARSING_ERROR';
      originalStatus: number;
      data: GenericResponseType<Record<string, any>>;
      error: string;
    }
  | {
      status: 'CUSTOM_ERROR';
      data?: GenericResponseType<Record<string, any>>;
      error: string;
    };
