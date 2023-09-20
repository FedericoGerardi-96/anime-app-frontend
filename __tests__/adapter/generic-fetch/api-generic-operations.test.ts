import { ErrorResponse } from '../../../src/interface';
import { ApiClient } from '../../../src/adapter/generic-fetch/api-generic-operations.adapter';

describe('Test in api-generic-operations services', () => {
  test('should make a successful GET request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ id: 1, name: 'Example' }),
    });

    const apiClient = new ApiClient('https://example.com');
    const data = await apiClient.get('/endpoint');

    expect(data).toEqual({ id: 1, name: 'Example' });
  });

  test('should handle an error in GET request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'Not Found' }),
    });

    const apiClient = new ApiClient('https://example.com');

    await expect(apiClient.get('/endpoint')).rejects.toThrow('Not Found');
  });
  // Prueba de éxito para POST
  test('should make a successful POST request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ id: 2, name: 'New Data' }), // Datos simulados
    });

    const apiClient = new ApiClient('https://example.com');
    const data = await apiClient.post('/endpoint', { name: 'New Data' });

    expect(data).toEqual({ id: 2, name: 'New Data' });
  });

  // Prueba de error para POST
  test('should handle an error in POST request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'Internal Server Error' }),
    });

    const apiClient = new ApiClient('https://example.com');

    await expect(
      apiClient.post('/endpoint', { name: 'New Data' })
    ).rejects.toThrow('Internal Server Error');
  });

  // Prueba de éxito para PATCH
  test('should make a successful PATCH request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ id: 2, name: 'New Data' }), // Datos simulados
    });

    const apiClient = new ApiClient('https://example.com');
    const data = await apiClient.patch('/endpoint', { name: 'New Data' });

    expect(data).toEqual({ id: 2, name: 'New Data' });
  });

  // Prueba de error para PATCH
  test('should handle an error in PATCH request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'Internal Server Error' }),
    });

    const apiClient = new ApiClient('https://example.com');

    await expect(
      apiClient.patch('/endpoint', { name: 'New Data' })
    ).rejects.toThrow('Internal Server Error');
  });

  // Prueba de éxito para PUT
  test('should make a successful PUT request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ id: 2, name: 'Updated Data' }), // Datos simulados
    });

    const apiClient = new ApiClient('https://example.com');
    const data = await apiClient.put('/endpoint/2', { name: 'Updated Data' });

    expect(data).toEqual({ id: 2, name: 'Updated Data' });
  });

  // Prueba de error para PUT
  test('should handle an error in PUT request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'Not Found' }),
    });

    const apiClient = new ApiClient('https://example.com');

    await expect(
      apiClient.put('/endpoint/2', { name: 'Updated Data' })
    ).rejects.toThrow('Not Found');
  });

  // Prueba de éxito para DELETE
  test('should make a successful DELETE request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const apiClient = new ApiClient('https://example.com');
    await apiClient.delete('/endpoint/2');

    // Si la solicitud se completa con éxito, no se espera ningún valor de retorno
  });

  // Prueba de error para DELETE
  test('should handle an error in DELETE request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'Unauthorized' }),
    });

    const apiClient = new ApiClient('https://example.com');

    await expect(apiClient.delete('/endpoint/2')).rejects.toThrow(
      'Unauthorized'
    );
  });

  test('should return "I am an error" if errorResponse.message is string', () => {
    const errorResponse: ErrorResponse = {
      message: 'I am an error',
      error: 'Error',
      statusCode: 400,
    };
    const apiClient = new ApiClient('https://example.com');

    const result = apiClient.errorResponse(errorResponse);

    expect(result).toBe('I am an error');
  });

  test('should return join messages if errorResponse.message is array', () => {
    const errorMessages = [
      'email must be an email',
      'password must be longer than or equal to 8 characters',      
    ];
    const errorResponse: ErrorResponse = {
      message: errorMessages,
      error: 'Error',
      statusCode: 400,
    };
    const apiClient = new ApiClient('https://example.com');

    const result = apiClient.errorResponse(errorResponse);

    expect(result).toBe("email must be an email-password must be longer than or equal to 8 characters-");
  });
});
