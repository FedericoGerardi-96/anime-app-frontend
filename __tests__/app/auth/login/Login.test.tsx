import { render } from '@testing-library/react';

import Login from '../../../../src/app/auth/login/page';

jest.mock('next/navigation');
jest.mock('usehooks-ts');

describe('Test in <Login/>', () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

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

  test('Renders login page', () => {
    const { getByTestId } = render(<Login />);

    const loginpageElement = getByTestId('login-page');
    expect(loginpageElement).toBeInTheDocument();
  });

  test('Renders LoginForm inside Login component', () => {
    const { getByTestId } = render(<Login />);

    const loginFormElement = getByTestId('login-form');
    expect(loginFormElement).toBeInTheDocument();
  });
});
