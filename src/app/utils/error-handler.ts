import { HttpErrorResponse } from '@angular/common/http';

export function handleError(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'A network error occurred. Please check your connection.';
  } else if (error.status === 404) {
    return 'The requested resource was not found.';
  } else if (error.status === 500) {
    return 'An internal server error occurred. Please try again later.';
  }
  return 'An unexpected error occurred.';
}