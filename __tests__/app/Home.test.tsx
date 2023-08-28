import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../../src/app/page';

jest.mock('next-auth/react');

describe('Test in <Home />', () => {
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
    const { getByTestId } = render(<Home />);
    const linkElement = getByTestId('home-page');
    expect(linkElement).toBeInTheDocument();
  });
});
