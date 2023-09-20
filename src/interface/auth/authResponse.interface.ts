import { user } from "../user/user.interface";

export interface IAuthResponse {
    user: user;
    token: string;
}
  