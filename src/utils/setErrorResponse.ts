import { ErrorResponse } from '../interface';

export const setErrorResponse = (errorResponse: ErrorResponse): string => {
  let errorList = '';

  if (typeof errorResponse.message === 'string') {
    errorList = `${errorResponse.message}`;
    return errorList;
  }

  errorResponse.message.forEach((errorMessage) => {
    errorList += errorMessage + '-';
  });
  return errorList;
};
