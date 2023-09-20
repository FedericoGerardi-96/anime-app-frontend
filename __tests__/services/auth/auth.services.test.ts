import { act } from 'react-dom/test-utils';
import { AuthServices } from '../../../src/services';
import { waitFor } from '@testing-library/react';

jest.mock('compressorjs');

const userLogin = {
  email: 'test@example.com',
  password: 'password123',
};
const userRegister = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
  icon: null,
};
const userRegisterWithIcon = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
  icon: new File(['test file content'], 'test.jpg', { type: 'image/jpeg' }),
};

describe('Test in AuthServices', () => {
  let authServices: AuthServices;

  beforeEach(() => {
    authServices = new AuthServices();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    test('should send a login request', async () => {
      const loginResponse = {
        token: 'yourAuthToken',
        user: { name: 'Test User' },
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => ({ token: 'yourAuthToken', user: { name: 'Test User' } }),
      });

      const result = await authServices.login(userLogin);

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userLogin.email,
          password: userLogin.password,
        }),
      });
      expect(result).toEqual(loginResponse);
    });
  });

  describe('register', () => {
    test('should send a registration request with an image', async () => {
      authServices.compressFile = jest.fn().mockResolvedValue(
        new File(['test file content'], 'test.jpg', {
          type: 'image/jpeg',
        })
      );
      const registerResponse = {
        token: 'yourAuthToken',
        user: { name: 'Test User' },
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => registerResponse,
      });

      const result = await authServices.register(userRegisterWithIcon);

      expect(result).toEqual(registerResponse);
    });

    test('should send a registration request without an image', async () => {
      const userWithoutImage = { ...userRegister, icon: null };
      const registerResponse = {
        token: 'yourAuthToken',
        user: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        },
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => ({
          token: 'yourAuthToken',
          user: {
            email: 'test@example.com',
            name: 'Test User',
            password: 'password123',
          },
        }),
      });

      const result = await authServices.register(userWithoutImage);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userWithoutImage.email,
            password: userWithoutImage.password,
            name: userWithoutImage.name,
          }),
        }
      );
      expect(result).toEqual(registerResponse);
    });
  });

  describe('oAUthToLogin', () => {
    test('should send an OAuth login request', async () => {
      const oAuthUser = {
        email: 'oauth@example.com',
        name: 'OAuth User',
        image: 'oauth_image_url',
      };
      const oAuthResponse = {
        token: 'yourAuthToken',
        user: { name: 'Test User' },
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => ({ token: 'yourAuthToken', user: { name: 'Test User' } }),
      });

      const result = await authServices.oAUthToLogin(oAuthUser);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/auth/OAuthlogin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: oAuthUser.email,
            name: oAuthUser.name,
            icon: oAuthUser.image,
          }),
        }
      );
      expect(result).toEqual(oAuthResponse);
    });
  });
});
