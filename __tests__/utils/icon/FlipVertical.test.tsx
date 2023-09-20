import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { FlipVertical } from '../../../src/utils';

describe('Test in <FlipVertical />', () => {
  test('should render FlipVertical icon', () => {
    const { getByTestId } = render(<FlipVertical className="" />);
    const iconElement = getByTestId('flipVerticalIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
