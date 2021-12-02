import {AppProps} from "next/dist/shared/lib/router/router";
import {CookiesProvider} from "react-cookie";
import {parseCookies} from "../helpers";
import {AppContext} from "next/app";
import {wrapper} from "../store";
import useAuth from "../hooks/auth.hook";
import React, {useEffect} from "react";
import {SnackbarProvider} from "notistack";

function MyApp({ Component, pageProps, data }: AppProps) {
    const { login } = useAuth();
    useEffect(() => {
        console.log(data);
        login({
            id: data.USER_ID,
            token: data.AT,
            type: data.USER_TYPE,
        });
    }, []);

    return (
        <SnackbarProvider maxSnack={3}>
            <CookiesProvider>
                <Component {...pageProps} />;
            </CookiesProvider>
        </SnackbarProvider>
    );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
    const cookie = parseCookies(appCtx.ctx.req);
    return {
        data: cookie,
    };
};
export default wrapper.withRedux(MyApp);
