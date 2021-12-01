import { Container, Paper, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import MainLayout from "../../layouts/MainLayout";
import IEvent from "../../types/IEvent";
import IResponse from "../../types/IResponse";

interface IEventProps {
    event: IEvent;
}

const Event = ({ event }: IEventProps) => {
    return (
        <MainLayout>
            <Container component={"main"} maxWidth="md">
                <Paper
                    sx={{
                        backgroundImage: `url(https://img5.goodfon.ru/wallpaper/nbig/e/c8/dizain-material-fon-abstraktsiia-material-design.jpg)`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        p: 2
                    }}
                >
                    <Typography variant="h2" bgcolor={'gray'} flex={0}>
                        {event.title}
                    </Typography>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{ id: string }>
) {
    const res = await fetch(`http://localhost:8000/api/event/${ctx.params.id}`);
    let json: IResponse<{ event: IEvent }>= await res.json();

    const props: IEventProps = {
        event: json.data.event,
    };

    return { props };
}

export default Event;
