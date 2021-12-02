import {Group, Person} from "@mui/icons-material";
import {Avatar, Button, Card, CardActions, CardContent, Container, Grid, Typography,} from "@mui/material";
import {Box} from "@mui/system";
import MainLayout from "../../layouts/MainLayout";
import NextLink from "next/link";
import {GetServerSidePropsContext} from "next";
import {parseCookies} from "../../helpers";
import {IAuthCookies} from "../../types/IAuthCookies";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/dist/client/router";
import Loader from "../../components/Loader";

const Registration = ({ redirect }) => {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if(redirect) {
            router.push("/");
        } else {
            setLoader(false);
        }
    }, [redirect, router]);

    if(loader) {
        return <Loader/> 
    }

    return (
        <MainLayout>
            <Container component={"main"} maxWidth={"md"}>
                <Grid container spacing={6} sx={{ pt: 6 }}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        sx={{ mb: 1, bgcolor: "info.main" }}
                                    >
                                        <Person />
                                    </Avatar>
                                    <Typography
                                        variant={"h6"}
                                        textAlign={"center"}
                                    >
                                        Я хочу посещать мероприятия
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NextLink
                                        href={"/registration/user"}
                                        passHref
                                    >
                                        <Button variant={"outlined"}>
                                            Зарегистрироваться как участник
                                        </Button>
                                    </NextLink>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        sx={{ mb: 1, bgcolor: "error.main" }}
                                    >
                                        <Group />
                                    </Avatar>
                                    <Typography
                                        variant={"h6"}
                                        textAlign={"center"}
                                    >
                                        Я хочу организовывать мероприятий
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NextLink
                                        href={"/registration/organization"}
                                        passHref
                                    >
                                        <Button variant={"outlined"}>
                                            Зарегистрироваться как организация
                                        </Button>
                                    </NextLink>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const cookie = parseCookies(ctx.req) as unknown as IAuthCookies;
    if (cookie.AT) {
        return {
            props: {
                redirect: true,
            },
        };
    }
}

export default Registration;
