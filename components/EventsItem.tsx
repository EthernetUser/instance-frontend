import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import IEvent from "../types/IEvent";

export interface IEventsItemProps {
    event: IEvent;
}

const EventsItem = ({ event }: IEventsItemProps) => {
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
        <Grid item xs={12}>
            <Card variant="elevation" elevation={3}>
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color={"text.secondary"}
                        gutterBottom
                    >
                        {formatDate(event.date.toString())}
                    </Typography>
                    <Typography variant="h4" component={"p"}>
                        {event.title}
                    </Typography>
                    <Typography variant="body2">{event.description}</Typography>
                </CardContent>
                <CardActions>
                    <NextLink href={"/registration"} passHref>
                        <Button size="small" variant="contained">
                            Записаться
                        </Button>
                    </NextLink>
                    <NextLink href={"/registration"} passHref>
                        <Button size="small" variant="outlined">
                            Подробней
                        </Button>
                    </NextLink>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default EventsItem;
