import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { RegisterForm } from '../../../src/components';
import { AuthServices } from '../../../src/services';

jest.mock('usehooks-ts');
jest.mock('sweetalert2');
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Test in RegisterPage', () => {
  const authServices = new AuthServices();
  let registerMock = jest.fn();
  beforeEach(async () => {
    authServices.register = registerMock;
  });

  test('should render register page', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const linkElement = getByTestId('register-form');
    expect(linkElement).toBeInTheDocument();
  });

  test('should show type password on input password', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const inputPasswordElement = getByTestId('password-input');

    expect(inputPasswordElement).toHaveAttribute('type', 'password');
  });

  test('should change password visivility when click on icon', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const inputPasswordElement = getByTestId('password-input');
    const buttonToggleType = getByTestId('button-eye');

    fireEvent.click(buttonToggleType);

    expect(inputPasswordElement).toHaveAttribute('type', 'text');
  });

  test('should show password required if tap on submit but dont complete input password', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: '' } });

    await act(async () => {
      fireEvent.submit(buttonSubmit);
    });

    await waitFor(() => {
      expect(getByTestId('error-password-span')).toBeInTheDocument();
      expect(getByTestId('error-password-span')).toHaveTextContent(
        'The password is Required'
      );
    });
  });

  test('should show email required if tap on submit but dont complete input email', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    await act(async () => {
      fireEvent.submit(buttonSubmit);
    });

    await waitFor(() => {
      expect(getByTestId('error-email-span')).toBeInTheDocument();
      expect(getByTestId('error-email-span')).toHaveTextContent(
        'The Email is Required'
      );
    });
  });

  test('should show password most be have 8 or more character if only 7 characters are entered', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    await act(async () => {
      fireEvent.submit(buttonSubmit);
    });

    await waitFor(() => {
      expect(getByTestId('error-password-span')).toBeInTheDocument();
      expect(getByTestId('error-password-span')).toHaveTextContent(
        'Password must be longer than or equal to 8 characters'
      );
    });
  });

  test('should show invalid email if entered a invalid email', async () => {
    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, { target: { value: 'test320google.com.ar' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    await act(async () => {
      fireEvent.submit(buttonSubmit);
    });

    await waitFor(() => {
      expect(getByTestId('error-email-span')).toBeInTheDocument();
      expect(getByTestId('error-email-span')).toHaveTextContent(
        'The email does not appear to be valid'
      );
    });
  });

  test('should show Unexpected error, please try again later. text when submit, and response return throw error', async () => {
    registerMock.mockImplementation(() => new Error('Unexpected error'));

    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const namedInput = getByTestId('name-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.change(namedInput, { target: { value: 'Pepito Gonzalez' } });

    try {
      fireEvent.submit(buttonSubmit);
    } catch (error: any) {
      await waitFor(() => {
        expect(getByTestId('error-chip')).toBeInTheDocument();
        expect(error.message).toHaveTextContent('Unexpected error');
        expect(getByTestId('error-chip')).toHaveTextContent('Unexpected error');
      });
    }
  });

  test('should redirect to login ,if login was succesfully', async () => {
    const response = {
      token: 'aegaeg65342b634kj6b3k46kbj',
      user: {
        email: 'test@google.com',
        name: 'test',
        image: 'http://localhost:3000/images/default-user-image.png',
        isActive: true,
        roles: ['test'],
      },
    };

    registerMock.mockImplementation(() => response);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        token: 'yourAuthToken',
        user: { name: 'Test User' },
      }),
    });

    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const namedInput = getByTestId('name-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.change(namedInput, { target: { value: 'Pepito Gonzalez' } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
    registerMock.mockRestore();
  });

  test('should show email error ,if email already exist', async () => {
    const response = {
      error: 'Bad Request',
      message: ['Email: test320@dani.com.ar already exists', ''],
      statusCode: 400,
    };

    registerMock.mockImplementation(() => response);

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: 'Bad Request',
        message: ['Email: test320@dani.com.ar already exists', ''],
        statusCode: 400,
      }),
    });

    const { getByTestId } = render(<RegisterForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const namedInput = getByTestId('name-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.change(namedInput, { target: { value: 'Pepito Gonzalez' } });

    try {
      fireEvent.submit(buttonSubmit);
    } catch (error: any) {
      await waitFor(() => {
        expect(getByTestId('error-chip')).toBeInTheDocument();
        expect(error.message).toHaveTextContent('Email: test320@dani.com.ar already exists');
        expect(getByTestId('error-chip')).toHaveTextContent('Email: test320@dani.com.ar already exists');
      });
    }
    registerMock.mockRestore();
  });
});
