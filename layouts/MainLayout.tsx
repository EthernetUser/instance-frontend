import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/styled-engine";
import { useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ColorModeContext from "../context/ColorModeContext";

const MainLayout: React.FC = ({ children }) => {
    // const theme = createTheme({
    //     palette: {
    //         mode: 'dark'
    //     }
    // }, ruRU);
    const [mode, setMode] = useState<"light" | "dark">("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles styles={{ "*": { margin: 0, padding: 0 } }} />
                    <CssBaseline />
                    <NavBar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
};

export default MainLayout;
