import { Response } from 'express'
class ApiError extends Error {
  constructor (message: string, public status: number) {
    super(message)
  }

  toJson () {
    return { message: this.message, status: this.status }
  }
}

interface IApiError {
  message: string;
  status: number;
}

interface IApirError {
  [key: string]: IApiError;
}

const apiError: IApirError = {
  NOT_FOUND: { message: 'Not found', status: 404 },
  BAD_REQUEST: { message: 'Bad request', status: 400 },
  UNAUTHORIZED: { message: 'Unauthorized', status: 401 },
  FORBIDDEN: { message: 'Forbidden', status: 403 },
  INTERNAL_SERVER_ERROR: { message: 'Internal server error', status: 500 },
  VALIDATION_ERROR: { message: 'Validation error', status: 422 }
}

function ApiErrorHandler (
  err: unknown,
  res: Response<any, Record<string, any>>
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: err.message
    })
  } else {
    return res.status(500).json({
      error: 'Unhandled error'
    })
  }
}

export { ApiError, apiError, ApiErrorHandler }
