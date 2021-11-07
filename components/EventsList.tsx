import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import IEvent from "../types/IEvent";
import EventsItem from "./EventsItem";

export interface IEventsListProps {
    spacing: number;
    data: IEvent[];
}

const EventsList = ({ spacing = 0, data }: IEventsListProps) => {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        if (data) {
            setEvents(data);
        }
    }, [data]);

    return (
        <Box>
            <Grid container spacing={spacing}>
                {events.map((val, i) => (
                    <EventsItem key={i} event={val} />
                ))}
            </Grid>
        </Box>
    );
};

export default EventsList;
