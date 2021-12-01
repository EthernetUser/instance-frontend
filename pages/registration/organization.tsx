import { Group } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import NextLink from "next/link";
import { useState } from "react";
import useHttp from "../../hooks/http.hook";
import MainLayout from "../../layouts/MainLayout";
import IResponse from "../../types/IResponse";

const RegistrationOrganization = () => {
    const { request } = useHttp();
    const [form, setForm] = useState({
        name: "",
        email: "",
        desctiption: "",
        category: "",
        password: "",
    });
    const formHandler = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value as string });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const body = form;
        const data: IResponse<{ token: string }> = await request(
            "/api/s1",
            "auth/registration",
            "POST",
            body
        );
        console.log(data);
    };
    return (
        <MainLayout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
                        <Group/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Название организации"
                                    autoFocus
                                    onChange={formHandler}
                                    value={form.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Описани ораганизации"
                                    name="description"
                                    autoComplete="description"
                                    onChange={formHandler}
                                    value={form.desctiption}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    name="email"
                                    autoComplete="email"
                                    onChange={formHandler}
                                    value={form.email}
                                    type={"email"}
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
                            Зарегистрироваться
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NextLink href="/login" passHref>
                                    <Link variant="body2">
                                        Уже есть аккаунт? Войти
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );
};

export default RegistrationOrganization;
