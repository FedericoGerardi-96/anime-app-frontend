import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { ArrowLeft } from '../../../src/utils';

describe('Test in <ArrowLeft />', () => {
  test('should render ArrowLeft icon', () => {
    const { getByTestId } = render(<ArrowLeft className="" />);
    const iconElement = getByTestId('arrowLeftIcon');
    expect(iconElement).toBeInTheDocument();
  });
});
