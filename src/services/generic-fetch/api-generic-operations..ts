import { ApiOperations, ErrorResponse } from '../../interface';

export class ApiClient<T> implements ApiOperations<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }
    return response.json();
  }

  async post(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al enviar datos: ${response.statusText}`);
    }
    return response.json();
  }

  async put(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar datos: ${response.statusText}`);
    }
    return response.json();
  }

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar datos: ${response.statusText}`);
    }
  }

  // errorResponse(errorResponse: ErrorResponse) {
  //   let errorList = '';

  //   if (!errorResponse.message) errorList = 'Unexpected server error';

  //   if (typeof errorResponse.message === 'string') {
  //     errorList = `${errorResponse.message}`;
  //     return errorList;
  //   }

  //   errorResponse.message.forEach((errorMessage) => {
  //     errorList += errorMessage + '\n';
  //   });
  //   return errorList;
  // }
}
