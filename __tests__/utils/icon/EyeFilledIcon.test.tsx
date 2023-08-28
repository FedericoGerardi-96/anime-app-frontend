import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { EyeFilledIcon } from '../../../src/utils';

describe('Test in <EyeFilledIcon />', () => {
  test('should render EyeFilledIcon icon', () => {
    const { getByTestId } = render(<EyeFilledIcon className="" />);
    const iconElement = getByTestId('eyeFilledIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
