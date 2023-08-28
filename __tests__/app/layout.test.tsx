import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../../src/app/page';
import RootLayout from '../../src/app/layout';

jest.mock('next-auth/react');

describe('Test in <layout/>', () => {
  beforeEach(async () => {
    const useSession = jest.spyOn(require('next-auth/react'), 'useSession');
    useSession.mockImplementation(() => ({
      token: '',
      data: {
        user: {
          name: 'Test User',
          email: '',
        },
      },
    }));
  });

  test('should render home page', () => {
    const { getByTestId } = render(
      <RootLayout>
        <Home />
      </RootLayout>
    );
    const linkElement = getByTestId('login-layout-page');
    expect(linkElement).toBeInTheDocument();
  });
});
