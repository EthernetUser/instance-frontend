import { useCallback, useState } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const request = useCallback(
        async (url: string, apiPath: string, method: string = "GET", body: any = null, headers: any = {}) => {
            setLoading(true);
            try {
                const jsonBody = JSON.stringify({
                    data: body,
                    path: apiPath,
                });

                if (body) {
                    headers["Content-Type"] = "application/json";
                }

                const response = await fetch(url, {
                    method,
                    headers,
                    body: jsonBody,
                });
                const data = await response.json();

                if (!response.ok) {
                    // console.log(response);
                    // const err = new Error(
                    //     data.message || "Что то пошло не так"
                    // );
                    // throw err;
                    return data;
                }

                setLoading(false);
                return data;
            } catch (error) {
                setLoading(false);
            }
        },
        []
    );

    return {
        request,
        loading,
    };
};

export default useHttp;
