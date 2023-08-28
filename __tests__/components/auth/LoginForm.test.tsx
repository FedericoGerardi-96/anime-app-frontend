import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as nextAuthReact from 'next-auth/react';
import { signIn } from 'next-auth/react';

import { LoginForm } from '../../../src/components/auth/LoginForm';

jest.mock('usehooks-ts');
jest.mock('next/navigation');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;
const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
const signInMock = jest.spyOn(require('next-auth/react'), 'signIn');

describe('Test in Login Page', () => {
  beforeEach(async () => {
    useRouter.mockImplementation(() => ({
      back: jest.fn(),
      fastRefresh: jest.fn(),
      forward: jest.fn(() => window.history.forward()),
      prefetch: jest.fn((href, options) => {}),
      push: jest.fn((href, options) => {}),
      refresh: jest.fn(),
      replace: jest.fn((href, options) => {}),
    }));
  });

  test('should render login page', async () => {
    const { getByTestId } = render(<LoginForm />);

    const linkElement = getByTestId('login-form');
    expect(linkElement).toBeInTheDocument();
  });

  test('should show type password on input password', async () => {
    const { getByTestId } = render(<LoginForm />);

    const inputPasswordElement = getByTestId('password-input');

    expect(inputPasswordElement).toHaveAttribute('type', 'password');
  });

  test('should change password visivility when click on icon', async () => {
    const { getByTestId } = render(<LoginForm />);

    const inputPasswordElement = getByTestId('password-input');
    const buttonToggleType = getByTestId('button-eye');

    fireEvent.click(buttonToggleType);

    expect(inputPasswordElement).toHaveAttribute('type', 'text');
  });

  test('should show password required if tap on submit but dont complete input password', async () => {
    const { getByTestId } = render(<LoginForm />);

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
    const { getByTestId } = render(<LoginForm />);

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
    const { getByTestId } = render(<LoginForm />);

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
    const { getByTestId } = render(<LoginForm />);

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

  test('should show Not valid credentials text when submit and credentials is invalid', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({
        error: 'Not valid credentials',
        ok: true,
        status: 200,
        url: 'http://localhost:3000',
      })
    );

    const { getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(getByTestId('error-chip')).toBeInTheDocument();
      expect(getByTestId('error-chip')).toHaveTextContent(
        'Not valid credentials'
      );
    });
  });

  test('should show fetch failed text when submit and backend server is stoped', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({
        error: 'fetch failed',
        ok: true,
        status: 200,
        url: null,
      })
    );

    const { getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(getByTestId('error-chip')).toBeInTheDocument();
      expect(getByTestId('error-chip')).toHaveTextContent('fetch failed');
    });
  });

  test('should redirect to <Home/> when submit and credentials is valid', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({
        error: null,
        ok: true,
        status: 200,
        url: 'http://localhost:3000',
      })
    );

    const { getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('should Unexpected error, please try again later if response is undefined', async () => {
    nextAuthReactMocked.signIn.mockImplementation(undefined);    

    const { getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonSubmit = getByTestId('button-submit');

    fireEvent.change(emailInput, {
      target: { value: 'test320@google.com.ar' },
    });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(getByTestId('error-chip')).toBeInTheDocument();
      expect(getByTestId('error-chip')).toHaveTextContent(
        'Unexpected error, please try again later.'
      );
    });
  });

  test('should call google signIn with google param', () => { 
    const { getByTestId } = render(<LoginForm />);

    const googleButton = getByTestId('google-button');

    fireEvent.click(googleButton);

    expect(signInMock).toHaveBeenCalledWith('google');
   })

  test('should call facebook signIn with facebook param', () => { 
    const { getByTestId } = render(<LoginForm />);

    const facebookButton = getByTestId('facebook-button');

    fireEvent.click(facebookButton);

    expect(signInMock).toHaveBeenCalledWith('facebook');
   })
});
