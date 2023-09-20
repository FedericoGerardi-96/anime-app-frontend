import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { MinusIcon } from '../../../src/utils';

describe('Test in <MinusIcon />', () => {
  test('should render MinusIcon icon', () => {
    const { getByTestId } = render(<MinusIcon className="" />);
    const iconElement = getByTestId('minusIconIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
