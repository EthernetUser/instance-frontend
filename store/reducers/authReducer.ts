import { AuthAction, AuthActionTypes, IAuthState } from "../../types/IAuthState"

const initialState: IAuthState = {
    isAuth: false,
    id: null,
    type: null,
    token: null
}

export const authReducer = (state = initialState, action: AuthAction): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            if (action.payload.id && action.payload.token && action.payload.type)
                return {...state, ...action.payload, isAuth: true}
            else 
                return {...state}
        case AuthActionTypes.LOGOUT:
            return { id: null, type: null, token: null, isAuth: false}
        default:
            return state
    
    }
}