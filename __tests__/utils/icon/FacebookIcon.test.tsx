import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { FacebookIcon } from '../../../src/utils';

describe('Test in <FacebookIcon />', () => {
  test('should render FacebookIcon icon', () => {
    const { getByTestId } = render(<FacebookIcon/>);
    const iconElement = getByTestId('facebookIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
