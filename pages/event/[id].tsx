import { Container, Paper, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { formatDate } from "../../helpers";
import MainLayout from "../../layouts/MainLayout";
import IEvent from "../../types/IEvent";
import IResponse from "../../types/IResponse";
import React from "react";

interface IEventProps {
    events: IEvent;
}

const Event = ({ events }: IEventProps) => {
    return (
        <MainLayout>
            <Container component={"main"} maxWidth="md">
                <Paper
                    sx={{
                        backgroundImage: `url(https://img5.goodfon.ru/wallpaper/nbig/e/c8/dizain-material-fon-abstraktsiia-material-design.jpg)`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        p: 2,
                        mt: 4
                    }}
                >
                    <Typography variant="h3" bgcolor={'rgba(0,0,0,0.2)'} flex={0} p={3} borderRadius={1}>
                        {events.title}
                    </Typography>
                </Paper>
                    <Typography sx={{
                        mt: 4
                    }} variant="h6" component={'p'}>
                        {events.description}
                    </Typography>
                    <Typography>
                        {formatDate(events.date)}
                    </Typography>
                    <Typography>
                        Место проведения: {events.location}
                    </Typography>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{ id: string }>
) {
    const res = await fetch(`http://localhost:8000/api/event/${ctx.params.id}`);
    let json: IResponse<{ events: IEvent }>= await res.json();

    const props: IEventProps = {
        events: json.data.events,
    };

    return { props };
}

export default Event;
