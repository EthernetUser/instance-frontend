import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { ru } from "date-fns/locale";
import NextLink from "next/link";
import React, { useState } from "react";
import EventsList from "../components/EventsList";
import { EntityTypes } from "../enum/EntityTypes";
import { useTypedSelector } from "../hooks/typeSelector.hook";
import MainLayout from "../layouts/MainLayout";
import IEvent from "../types/IEvent";
import IResponse from "../types/IResponse";

export interface IIndexProps {
    events: IEvent[];
}

function Index({ events }: IIndexProps) {
    const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());
    const { isAuth, type } = useTypedSelector((state) => state.auth);
    const createEventButton = () => {
        if (isAuth && type === EntityTypes.Organization) {
            return (
                <Grid
                    container
                    maxWidth={"md"}
                    sx={{
                        mb: 3,
                    }}
                >
                    <Grid item xs={12}>
                        <Button size="large" variant="outlined">
                            Создать мероприятие
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    };
    return (
        <MainLayout>
            <Container
                maxWidth="md"
                component="main"
                sx={{
                    py: [3, 6],
                }}
            >
                <Box>
                    <Grid container maxWidth={"md"} spacing={4}>
                        <Grid item xs={5}>
                            <Typography
                                component={"p"}
                                variant="h5"
                                gutterBottom
                            >
                                Календарь событий
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography
                                component={"p"}
                                variant="h5"
                                gutterBottom
                            >
                                События на{" "}
                                {`${
                                    calendarDate.getUTCDate() < 10
                                        ? "0" + calendarDate.getUTCDate()
                                        : calendarDate.getUTCDate()
                                }.${
                                    calendarDate.getUTCMonth() < 10
                                        ? "0" + calendarDate.getUTCMonth() + 1
                                        : calendarDate.getUTCMonth() + 1
                                }.${calendarDate.getUTCFullYear()}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container maxWidth="md" spacing={4} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={5}>
                            <Paper elevation={3}>
                                <LocalizationProvider
                                    dateAdapter={DateAdapter}
                                    locale={ru}
                                >
                                    <CalendarPicker
                                        date={calendarDate}
                                        onChange={(newDate) => setCalendarDate(newDate)}
                                        minDate={new Date()}
                                    />
                                </LocalizationProvider>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Stack
                                justifyContent={"space-between"}
                                sx={{
                                    minHeight: "100%",
                                }}
                            >
                                {events.map((event, i) => (
                                    <Card
                                        key={i}
                                        sx={{ display: "flex" }}
                                        elevation={3}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="h6"
                                                component={"p"}
                                            >
                                                {event.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {event.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <NextLink
                                                href={"/registration"}
                                                passHref
                                            >
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                >
                                                    Записаться
                                                </Button>
                                            </NextLink>
                                            <NextLink
                                                href={"/registration"}
                                                passHref
                                            >
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                >
                                                    Подробней
                                                </Button>
                                            </NextLink>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                    {createEventButton()}
                    <Typography component={"h1"} variant="h5">
                        Расписание
                    </Typography>
                    <Typography
                        sx={{
                            mb: 3,
                            color: "GrayText",
                        }}
                    >
                        Последние добавленные события
                    </Typography>
                    <EventsList spacing={3} data={events} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <NextLink href={"/events/0"} passHref>
                            <Button
                                variant="outlined"
                                sx={{
                                    mt: 3,
                                }}
                            >
                                Показать всё расписание
                            </Button>
                        </NextLink>
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    const result = await fetch("http://localhost:8000/api/event/limit/3");
    const json: IResponse<{ events: IEvent[] }> = await result.json();

    const props: IIndexProps = {
        events: json.data.events,
    };

    return { props };
}

export default Index;
