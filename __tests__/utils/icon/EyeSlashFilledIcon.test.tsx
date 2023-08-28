import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { EyeSlashFilledIcon } from '../../../src/utils';

describe('Test in <EyeSlashFilledIcon />', () => {
  test('should render EyeSlashFilledIcon icon', () => {
    const { getByTestId } = render(<EyeSlashFilledIcon className='' />);
    const iconElement = getByTestId('eyeSlashFilledIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
