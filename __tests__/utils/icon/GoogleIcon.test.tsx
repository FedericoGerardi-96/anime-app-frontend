import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { GoogleIcon } from '../../../src/utils';

describe('Test in <GoogleIcon />', () => {
  test('should render GoogleIcon icon', () => {
    const { getByTestId } = render(<GoogleIcon/>);
    const iconElement = getByTestId('googleIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
