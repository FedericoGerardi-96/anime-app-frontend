import { user } from "../user/user.interface";

export interface loginResponse {
    user: user;
    token: string;
}
  