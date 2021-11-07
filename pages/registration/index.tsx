import { Person } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import NextLink from "next/link";
import useHttp from "../../hooks/http.hook";
import IResponse from "../../types/IResponse";

const Registration = () => {
    const { request } = useHttp();
    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: "",
        weaponProficiencyLevel: "Новичек",
    });
    const weaponLevels = ["Новичек", "Уже занимался", "Продолжающий"];
    const formHandler = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value as string });
    };
    const selectHandler = (e) => {
        setForm({ ...form, weaponProficiencyLevel: e.target.value as string });
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <Person />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Имя"
                                    autoFocus
                                    onChange={formHandler}
                                    value={form.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Фамилия"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={formHandler}
                                    value={form.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="middleName"
                                    label="Отчество"
                                    name="middleName"
                                    onChange={formHandler}
                                    value={form.middleName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nickName"
                                    label="Никнейм"
                                    name="nickName"
                                    onChange={formHandler}
                                    value={form.nickName}
                                    autoComplete="nickname"
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
                            <Grid item xs={12}>
                                <TextField
                                    id="weaponProficiencyLevel"
                                    fullWidth
                                    required
                                    select
                                    name="weaponProficiencyLevel"
                                    label={"Уровень владения оружием"}
                                    onChange={selectHandler}
                                    value={form.weaponProficiencyLevel}
                                >
                                    {weaponLevels.map((val, i) => (
                                        <MenuItem key={i} value={val}>
                                            {val}
                                        </MenuItem>
                                    ))}
                                </TextField>
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

export default Registration;
