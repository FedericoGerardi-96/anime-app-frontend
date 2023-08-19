import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Home from '../../src/app/page';

describe('Test in Home Page', () => { 
    test('should render home page', () => {
      const { getByTestId, debug } = render(<Home />);
      const linkElement = getByTestId('home-page'); 
      expect(linkElement).toBeInTheDocument();
    });
 })
