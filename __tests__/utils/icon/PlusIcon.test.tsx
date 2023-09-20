import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { PlusIcon } from '../../../src/utils';

describe('Test in <PlusIcon />', () => {
  test('should render PlusIcon icon', () => {
    const { getByTestId } = render(<PlusIcon className="" />);
    const iconElement = getByTestId('plusIconIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
