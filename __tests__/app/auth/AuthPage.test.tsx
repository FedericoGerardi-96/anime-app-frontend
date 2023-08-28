import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Login from '../../../src/app/auth/page';

jest.mock('usehooks-ts', () => ({
  useMediaQuery: jest.fn().mockReturnValue(false), // Puedes ajustar el valor de retorno según tus necesidades
}));
jest.mock('next/navigation');

describe('Test in <Login />', () => {
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

  test('should render login page', async () => {
    const { getByTestId } = render(<Login />);

    const linkElement = getByTestId('login-page');
    expect(linkElement).toBeInTheDocument();
  });

  test('should render login form', async () => {
    const { getByTestId } = render(<Login />);

    expect(getByTestId('login-form')).toBeInTheDocument();
  });
});
