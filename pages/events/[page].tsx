import {
    Container,
    Link,
    Pagination,
    PaginationItem,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import NextLink from "next/link";
import React from "react";
import EventsList from "../../components/EventsList";
import MainLayout from "../../layouts/MainLayout";
import IEvent from "../../types/IEvent";
import IResponse from "../../types/IResponse";

export interface IEventsProps {
    events: IEvent[];
    count: number;
    pageCount: number;
    page: number;
}

const Events = ({ events, count, pageCount, page }: IEventsProps) => {
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
                    <Typography component={"h1"} variant="h5">
                        Расписание
                    </Typography>
                    <Typography>Последние добавленные события</Typography>
                    <Typography
                        sx={{
                            mb: 3,
                            color: "GrayText",
                        }}
                    >
                        Найдено {count} записей
                    </Typography>
                    <EventsList spacing={2} data={events} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3,
                        }}
                    >
                        <Pagination
                            page={page + 1}
                            count={pageCount}
                            renderItem={(item) => (
                                <NextLink
                                    href={`/events/${item.page - 1}`}
                                    passHref
                                >
                                    <PaginationItem
                                        component={Link}
                                        {...item}
                                    />
                                </NextLink>
                            )}
                        />
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{ page: string }>,
) {
    const res = await fetch(
        `http://localhost:8000/api/lesson/page/${ctx.params.page}`
    );
    let json: IResponse<{ rows: IEvent[]; count: number }> = await res.json();
    const pageCount: number = Math.ceil(json.data.count / 10);

    const props: IEventsProps = {
        events: json.data.rows,
        count: json.data.count,
        page: +ctx.params.page,
        pageCount,
    };

    return { props };
}

export default Events;
