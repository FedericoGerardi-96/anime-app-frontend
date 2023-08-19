import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useMediaQuery } from "usehooks-ts";

import Login from '../../../../src/app/auth/login/page';

jest.mock('usehooks-ts');

describe('Test in Login Page', () => {    
    
  const mockUseMediaQuery = useMediaQuery("(max-width: 768px)");

  test('should render login page', async() => {

    const { getByTestId } = render(<Login />);

    const linkElement = getByTestId('login-page');
    expect(linkElement).toBeInTheDocument();
  });
});
