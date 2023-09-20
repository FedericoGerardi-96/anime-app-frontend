import { IRegister, login, IAuthResponse, oAuthUser } from '../../interface';
import {
  updateUserAvatarAdapter,
  loginAdapter,
  oAUthToLoginAdapter,
  registerAdapter,
} from '../../adapter';
import { compressFile } from '../../utils/compressFile';

const login = async (login: login) => {
  return await loginAdapter(login);
};

const updateUserAvatar = async (
  id: string,
  token: string,
  file: File
): Promise<IAuthResponse> => {
  const ImagecompressFile = await compressFile(file);
  const formData = new FormData();
  formData.append('file', ImagecompressFile);

  const newUserWithIcon: IAuthResponse = await updateUserAvatarAdapter(
    id,
    formData,
    token
  );

  return newUserWithIcon;
};

const oAUthToLogin = async (user: oAuthUser) => {
  const { email, name, icon } = user;

  const bodyData = {
    email,
    name,
    icon,
  };

  return await oAUthToLoginAdapter(bodyData);
};

const register = async (user: IRegister): Promise<IAuthResponse> => {
  const { email, name, password, icon } = user;

  let bodyData = {
    email,
    password,
    name,
  };

  const newUser = await registerAdapter(bodyData);

  if (newUser && icon) {
    return updateUserAvatar(newUser.user._id!, newUser.token, icon);
  }

  return newUser;
};

export { login, updateUserAvatar, oAUthToLogin, register };
