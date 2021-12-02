import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { formatDate } from "../helpers";
import IEvent from "../types/IEvent";

export interface IEventsItemProps {
    event: IEvent;
}

const EventsItem = ({ event }: IEventsItemProps) => {
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
                    <NextLink href={`/event/${event.id}`} passHref>
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
