import { EntityTypes } from "../enum/EntityTypes";
export interface IAuthState {
    isAuth: boolean;
    token: null | string;
    id: null | number;
    type: null | EntityTypes;
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

interface LoginAction {
    type: AuthActionTypes.LOGIN;
    payload: { token: string; id: number; type: EntityTypes };
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;
