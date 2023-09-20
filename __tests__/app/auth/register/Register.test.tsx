import { render } from '@testing-library/react';

import Register from '../../../../src/app/auth/register/page';

jest.mock('next/navigation');
jest.mock('usehooks-ts');

describe('Test in <Register/>', () => {
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

  test('Renders register page', () => {
    const { getByTestId } = render(<Register />);

    const registerpageElement = getByTestId('register-page');
    expect(registerpageElement).toBeInTheDocument();
  });

  test('Renders RegisterForm inside Register component', () => {
    const { getByTestId } = render(<Register />);

    const registerFormElement = getByTestId('register-form');
    expect(registerFormElement).toBeInTheDocument();
  });
});
