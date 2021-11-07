import { Person } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MainLayout from "../../layouts/MainLayout";
import React, { useState } from "react";
import useHttp from "../../hooks/http.hook";
import IResponse from "../../types/IResponse";

const Login = () => {
    const { request } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const formHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (form.email && form.password) {
            const body = form;
            const data: IResponse<{ token: string }> = await request(
                "/api/s1",
                "auth/login",
                "POST",
                body
            );
            console.log(data);
        }
    };
    return (
        <MainLayout>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <Person />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    type={"email"}
                                    onChange={formHandler}
                                    value={form.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={formHandler}
                                    value={form.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );
};

export default Login;
