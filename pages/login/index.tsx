import {Person} from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import {useRouter} from "next/dist/client/router";
import React, {useState} from "react";
import {EntityTypes} from "../../enum/EntityTypes";
import useAuth from "../../hooks/auth.hook";
import useHttp from "../../hooks/http.hook";
import {useSnackBarHook} from "../../hooks/snackbar.hook";
import MainLayout from "../../layouts/MainLayout";
import IResponse from "../../types/IResponse";

const Login = () => {
    const { request } = useHttp();
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const {showSnack} = useSnackBarHook()
    const [userType, setUserType] = useState<EntityTypes | string>(
        EntityTypes.User
    );
    const formHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(form, userType);
        if (form.email && form.password) {
            const body = form;
            if (userType == EntityTypes.User) {
                const res: IResponse<{
                    token: string;
                    id: number;
                    type: EntityTypes;
                }> = await request("/api/s1", "auth/login", "POST", body);
                login(res.data);
                if (!res.error) {
                    showSnack('Вы вошли в акаунт!', 'success');
                    await router.push("/");
                }
            } else {
                const res: IResponse<{
                    token: string;
                    id: number;
                    type: EntityTypes;
                }> = await request("/api/s1", "auth/org_login", "POST", body);
                login(res.data);
                if (!res.error) {
                    showSnack('Вы вошли в акаунт!', 'success');
                    await router.push("/");
                }
            }
        }
    };
    return (
        <MainLayout>
            <Container component="main" maxWidth="sm">
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
                            <Grid item xs={12}>
                                <RadioGroup
                                    value={userType}
                                    onChange={(e) =>
                                        setUserType(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        value={EntityTypes.User}
                                        label={"Участник"}
                                    />
                                    <FormControlLabel
                                        control={<Radio />}
                                        value={EntityTypes.Organization}
                                        label={"Организация"}
                                    />
                                </RadioGroup>
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
