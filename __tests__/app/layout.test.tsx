import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../../src/app/page';
import { Providers } from '../../src/app/providers';
import RootLayout, { metadata } from '../../src/app/layout';

jest.mock('next-auth/react');

describe('Test in <layout/>', () => {
  beforeEach(async () => {
    const useSession = jest.spyOn(require('next-auth/react'), 'useSession');
    useSession.mockImplementation(() => ({
      token: '',
      data: {
        user: {
          name: 'Test User',
          email: '',
        },
      },
    }));
  });

  test('should render home page', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div data-testid='child-element'>Child Content</div>
      </RootLayout>
    );
    const linkElement = getByTestId('layout-page');
    expect(linkElement).toBeInTheDocument();
  });

  test('metadata should have the property "title"', () => {
    expect(metadata).toHaveProperty('title');
  });

  test('metadata should have the property "description"', () => {
    expect(metadata).toHaveProperty('description');
  });

  test('the property "title" of metadata should haven´t a null value', () => {
    expect(metadata.title).toBeDefined();
  });

  test('the property "description" of metadata should haven´t a null value', () => {
    expect(metadata.description).toBeDefined();
  });
});
