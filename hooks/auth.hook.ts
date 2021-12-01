import { useActions } from "./action.hook";
import { EntityTypes } from "./../enum/EntityTypes";
import { CookieTypes } from "./../enum/CookieTypes";
import { useCallback } from "react";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

const useAuth = () => {
    const { authLogin, authLogout } = useActions();
    const login = useCallback(
        async (authData: { token: string; id: number; type: EntityTypes }) => {
            if (authData.id && authData.token && authData.type) {
                const cookies = new Cookies();
                cookies.set(CookieTypes.AT, authData.token, {
                    sameSite: true,
                });
                cookies.set(CookieTypes.USER_ID, authData.id, {
                    sameSite: true,
                });
                cookies.set(CookieTypes.USER_TYPE, authData.type, {
                    sameSite: true,
                });
            }
            authLogin({ ...authData });
        },
        [authLogin]
    );

    const logout = useCallback(async () => {
        const cookies = new Cookies();
        cookies.remove(CookieTypes.AT);
        cookies.remove(CookieTypes.USER_ID);
        cookies.remove(CookieTypes.USER_TYPE);
        authLogout();
    }, [authLogout]);

    return {
        login,
        logout,
    };
};

export default useAuth;
