import { Group, Person } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MainLayout from "../../layouts/MainLayout";
import NextLink from "next/link"

const Registration = () => {
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
                                    <Typography variant={"h6"} textAlign={'center'}>
                                        Я хочу посещать мероприятия
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NextLink href={"/registration/user"} passHref>
                                        <Button variant={'outlined'}>
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
                                    <Typography variant={"h6"} textAlign={'center'}>
                                        Я хочу организовывать мероприятий
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NextLink href={"/registration/organization"} passHref>
                                        <Button variant={'outlined'}>
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

export default Registration;
