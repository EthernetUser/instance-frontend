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
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import ColorModeContext from "../context/ColorModeContext";
import { EntityTypes } from "../enum/EntityTypes";
import useAuth from "../hooks/auth.hook";
import { useTypedSelector } from "../hooks/typeSelector.hook";
import EventDrawer from "./EventDrawer";

export default function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { isAuth, type } = useTypedSelector((state) => state.auth);
    const { logout } = useAuth();

    const authButton = () => {
        if (!isAuth) {
            return (
                <NextLink href={"/login"} passHref>
                    <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Войти
                    </Button>
                </NextLink>
            );
        } else {
            return (
                <Button
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5 }}
                    color="error"
                    onClick={() => {
                        logout();
                        router.push("/");
                    }}
                >
                    Выход
                </Button>
            );
        }
    };
    const registrationButton = () => {
        if (!isAuth) {
            return (
                <NextLink href={"/registration"} passHref>
                    <MUILink
                        variant="button"
                        color="text.primary"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Регистрация
                    </MUILink>
                </NextLink>
            );
        }
    };
    const profileButton = () => {
        if (isAuth) {
            return (
                <NextLink href={"/profile"} passHref>
                    <MUILink
                        variant="button"
                        color="text.primary"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Профиль
                    </MUILink>
                </NextLink>
            );
        }
    };
    const drawerButton = () => {
        if (isAuth && type == EntityTypes.User) {
            return (
                <IconButton onClick={() => setDrawerOpen(true)}>
                    <Badge badgeContent={4} color="error">
                        <Event />
                    </Badge>
                </IconButton>
            );
        }
    };
    const drawerSurface = () => {
        if (isAuth && type == EntityTypes.User) {
            return (
                <EventDrawer
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                />
            );
        }
    };
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
                        {registrationButton()}
                        {profileButton()}
                    </nav>
                    {authButton()}
                    {drawerButton()}
                </Toolbar>
            </AppBar>
            {drawerSurface()}
        </React.Fragment>
    );
}
