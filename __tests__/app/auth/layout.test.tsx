import '@testing-library/jest-dom';
import {
  render,
  queryByAttribute,
  fireEvent,
  // screen,
  waitFor,
} from '@testing-library/react';

import RootLayout from '../../../src/app/auth/layout';
import Login from '../../../src/app/auth/page';

jest.mock('usehooks-ts', () => ({
  useMediaQuery: jest.fn().mockReturnValue(false), // Puedes ajustar el valor de retorno según tus necesidades
}));
jest.mock('next/navigation');

describe('Test in <RootLayout/>', () => {
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

  test('should render layout login page', () => {
    const { getByTestId } = render(
      <RootLayout>
        <Login />
      </RootLayout>
    );

    const linkElement = getByTestId('login-layout-page');
    expect(linkElement).toBeInTheDocument();
  });
});
