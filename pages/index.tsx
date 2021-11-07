import { CalendarPicker, DatePicker, LocalizationProvider } from "@mui/lab";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import NextLink from "next/link";
import React, { useState } from "react";
import EventsList from "../components/EventsList";
import MainLayout from "../layouts/MainLayout";
import IEvent from "../types/IEvent";
import IResponse from "../types/IResponse";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ru } from "date-fns/locale";

export interface IIndexProps {
    events: IEvent[];
}

const Index = ({ events }: IIndexProps) => {
    const [date, setDate] = useState<Date | null>(new Date());
    const formatDate = (date: string) => {
        const correctDate = new Date(date);
        const strDate = `${
            correctDate.getUTCDate() < 10
                ? "0" + correctDate.getUTCDate()
                : correctDate.getUTCDate()
        }.${
            correctDate.getUTCMonth() < 10
                ? "0" + correctDate.getUTCMonth()
                : correctDate.getUTCMonth()
        }.${correctDate.getUTCFullYear()}`;
        const strTime = `${
            correctDate.getUTCHours() < 10
                ? "0" + correctDate.getUTCHours()
                : correctDate.getUTCHours()
        }:${
            correctDate.getUTCMinutes() < 10
                ? "0" + correctDate.getUTCMinutes()
                : correctDate.getUTCMinutes()
        }`;
        return `Дата: ${strDate} | Время: ${strTime}`;
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
                                    date.getUTCDate() < 10
                                        ? "0" + date.getUTCDate()
                                        : date.getUTCDate()
                                }.${
                                    date.getUTCMonth() < 10
                                        ? "0" + date.getUTCMonth() + 1
                                        : date.getUTCMonth() + 1
                                }.${date.getUTCFullYear()}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container maxWidth="md" spacing={4} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={5}>
                            <Paper elevation={3}>
                                <LocalizationProvider
                                    dateAdapter={DateAdapter}
                                    locale={ru}
                                >
                                    <CalendarPicker
                                        date={date}
                                        onChange={(newDate) => setDate(newDate)}
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
};

export async function getServerSideProps() {
    const res = await fetch("http://localhost:8000/api/lesson/limit/3");
    const json: IResponse<{ lessons: IEvent[] }> = await res.json();

    const props: IIndexProps = {
        events: json.data.lessons,
    };

    return { props };
}

export default Index;
