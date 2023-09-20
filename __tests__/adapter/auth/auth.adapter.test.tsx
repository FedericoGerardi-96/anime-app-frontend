import { ErrorResponse } from './../../../src/interface';
import { AuthAdapter } from '../../../src/adapter';

describe('AuthAdapter', () => {
  const baseUrl = 'http://example.com';
  let authAdapter: AuthAdapter;

  beforeEach(() => {
    authAdapter = new AuthAdapter(baseUrl);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should send a request to update user avatar', async () => {
    const endpoint = '/updateAvatar/123';
    const formData = new FormData();
    formData.append('file', new Blob(['image data'], { type: 'image/jpeg' }));

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ user: {}, token: '123' }),
    });

    const header = {
      Authorization: `Bearer ${'aegaeg'}`,
    };

    const result = await authAdapter.updateUserAvatar(
      endpoint,
      formData,
      header
    );

    expect(result).toEqual({ user: {}, token: '123' });
  });

  test('should send a request to update user avatar and response ok false', async () => {
    const endpoint = '/updateAvatar/123';
    const formData = new FormData();
    formData.append('file', new Blob(['image data'], { type: 'image/jpeg' }));

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ message: 'File type not supported' }),
    });

    const header = {
      Authorization: `Bearer ${'aegaeg'}`,
    };
    let result;
    try {
      result = await authAdapter.updateUserAvatar(endpoint, formData, header);
    } catch (error: any) {
      expect(error.message).toBe('File type not supported');
    }
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

    const result = authAdapter.errorResponse(errorResponse);

    expect(result).toBe(
      'email must be an email-password must be longer than or equal to 8 characters-'
    );
  });

  test('should handle an error response', async () => {
    const endpoint = '/updateAvatar/123';
    const formData = new FormData();
    formData.append('file', new Blob(['image data'], { type: 'image/jpeg' }));

    const responseMock = {
      ok: false,
      message: ['File type not supported', 'File size exceeds limit'],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => responseMock,
    });

    let fetchMock;
    try {
      fetchMock = await authAdapter.updateUserAvatar(endpoint, formData);
    } catch (error: any) {
      expect(error.message).toBe(
        'File type not supported-File size exceeds limit-'
      );
    }
  });

  test('should handle a network error', async () => {
    const endpoint = '/updateAvatar/123';
    const formData = new FormData();
    formData.append('file', new Blob(['image data'], { type: 'image/jpeg' }));

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => new Error('Network error'),
    });
    let fetchMock;
    try {
      fetchMock = await authAdapter.updateUserAvatar(endpoint, formData);
    } catch (error: any) {
      expect(error.message).toBe('Network error');
    }
  });
});
