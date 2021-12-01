import { EntityTypes } from './../../enum/EntityTypes';
import { AuthAction, AuthActionTypes } from './../../types/IAuthState';

export const authLogin = (payload: { token: string, id: number, type: EntityTypes}): AuthAction => {
    return { type: AuthActionTypes.LOGIN, payload}
}

export const authLogout = (): AuthAction => {
    return { type: AuthActionTypes.LOGOUT }
}