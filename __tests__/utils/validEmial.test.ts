import { isEmail, isValidEmail  } from '../../src/utils/validEmail';

describe('Test in validEmail', () => {
  test('should pass valid email on params and return undefined', () => {
    expect(isEmail('test@gmail.com')).toBe(undefined);
  });
  test('should pass invalid email on params and return undefined', () => {
    expect(isEmail('testgmail.com')).toBe(
      'The email does not appear to be valid'
    );
  });

  test('should pass invalid email on params to function isValidEmail and return false', () => {
    expect(isValidEmail('testgmail.com')).toBe(
     false
    );
  });
  test('should pass valid email on params to function isValidEmail and return true', () => {
    expect(isValidEmail('test@gmail.com')).toBe(
     true
    );
  });
});
