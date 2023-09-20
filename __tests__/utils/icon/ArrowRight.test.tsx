import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { ArrowRight } from '../../../src/utils';

describe('Test in <ArrowRight />', () => {
  test('should render ArrowRight icon', () => {
    const { getByTestId } = render(<ArrowRight className="" />);
    const iconElement = getByTestId('arrowRightIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
