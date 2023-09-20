import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { FlipHorizontal } from '../../../src/utils';

describe('Test in <FlipHorizontal />', () => {
  test('should render FlipHorizontal icon', () => {
    const { getByTestId } = render(<FlipHorizontal className="" />);
    const iconElement = getByTestId('flipHorizontalIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
