import { AppProps } from "next/dist/shared/lib/router/router";
import { CookiesProvider } from "react-cookie";
import { parseCookies } from "../helpers";
import App, { AppContext, AppInitialProps } from "next/app";
import { wrapper } from "../store";
import useAuth from "../hooks/auth.hook";
import { useEffect } from "react";

function MyApp({ Component, pageProps, data }: AppProps) {
    const { login } = useAuth();
    useEffect(() => {
        console.log(data)
        login({
            id: data.USER_ID,
            token: data.AT,
            type: data.USER_TYPE,
        });
    }, [data, login]);
    return (
        <CookiesProvider>
            <Component {...pageProps} />;
        </CookiesProvider>
    );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
    const cookie = parseCookies(appCtx.ctx.req)
    return {
        data: cookie,
    };
};
export default wrapper.withRedux(MyApp);
