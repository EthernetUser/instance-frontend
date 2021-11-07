import {
    Brightness4Outlined,
    Brightness7Outlined,
    Event,
} from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Button,
    IconButton,
    Link as MUILink,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import ColorModeContext from "../context/ColorModeContext";
import EventDrawer from "./EventDrawer";

export default function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <React.Fragment>
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        INSTANCE
                    </Typography>
                    <nav>
                        <IconButton
                            onClick={() => {
                                colorMode.toggleColorMode();
                                console.log("hello");
                            }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <Brightness7Outlined />
                            ) : (
                                <Brightness4Outlined />
                            )}
                        </IconButton>
                        <NextLink href={"/"} passHref>
                            <MUILink
                                variant="button"
                                color="text.primary"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Главная
                            </MUILink>
                        </NextLink>
                        <NextLink href={"/events/0"} passHref>
                            <MUILink
                                variant="button"
                                color="text.primary"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Расписание
                            </MUILink>
                        </NextLink>
                        <NextLink href={"/faq"} passHref>
                            <MUILink
                                variant="button"
                                color="text.primary"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Вопросы
                            </MUILink>
                        </NextLink>
                        <NextLink href={"/registration"} passHref>
                            <MUILink
                                variant="button"
                                color="text.primary"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Регистрация
                            </MUILink>
                        </NextLink>
                    </nav>
                    <NextLink href={"/login"} passHref>
                        <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            Вход
                        </Button>
                    </NextLink>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <Badge badgeContent={4} color="error">
                            <Event />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <EventDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
        </React.Fragment>
    );
}
