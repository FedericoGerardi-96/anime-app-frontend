import {
  ErrorResponse,
  login,
  loginResponse,
  oAuthUser,
} from '../../interface';

const login = async (login: login) => {
  const { email, password } = login;

  const url = 'http://localhost:3001/auth/login';

  const bodyData = {
    email,
    password,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    let errorList = '';
    const errorResponse: ErrorResponse = await response.json();

    if (!errorResponse.message) throw new Error('Unexpected server error');

    if (typeof errorResponse.message === 'string')
      throw new Error(`${errorResponse.message}`);

    errorResponse.message.forEach((errorMessage) => {
      errorList += errorMessage + '\n';
    });

    throw new Error(`${errorList}`);
  }

  const data: loginResponse = await response.json();

  return data;
};

const oAUthToLogin = async (user: oAuthUser) => {
  const { email, name, image: icon } = user;

  const url = 'http://localhost:3001/auth/OAuthlogin';

  const bodyData = {
    email,
    name,
    icon,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) throw new Error('Unexpected server error');

  const data: loginResponse = await response.json();

  return data;
};

export { login, oAUthToLogin };
