import { setErrorResponse } from '../../utils/setErrorResponse';
import { ErrorResponse, IRegister, login, oAuthUser } from '../../interface';

const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL_BACK_END}/auth`;

const updateUserAvatarAdapter = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const response = await fetch(`${urlBase}/updateAvatar/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      throw new Error(setErrorResponse(errorResponse));
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

const loginAdapter = async (login: login) => {
  try {
    const rep = await fetch(`${urlBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });
    if (!rep.ok) {
      const errorResponse: ErrorResponse = await rep.json();
      throw new Error(setErrorResponse(errorResponse));
    }
    return rep.json();
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

const registerAdapter = async (user: IRegister) => {
  try {
    const { email, name, password, icon } = user;

    const resp = await fetch(`${urlBase}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });
    if (!resp.ok) {
      const errorResponse: ErrorResponse = await resp.json();
      throw new Error(setErrorResponse(errorResponse));
    }
    return resp.json();
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

const oAUthToLoginAdapter = async (user: oAuthUser) => {
  try {
    const { email, name, icon } = user;

    const resp = await fetch(`${urlBase}/OAuthlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, icon }),
    });
    if (!resp.ok) {
      const errorResponse: ErrorResponse = await resp.json();
      throw new Error(setErrorResponse(errorResponse));
    }
    return resp.json();
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

export { updateUserAvatarAdapter, loginAdapter, oAUthToLoginAdapter, registerAdapter };
