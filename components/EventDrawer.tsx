import { AccessibilityNew, ChevronRight } from "@mui/icons-material";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import React from "react";

const EventDrawer = ({ drawerOpen, setDrawerOpen }) => {
    const router = useRouter();
    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            sx={{
                flexShrink: 0,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1,
                }}
            >
                <IconButton onClick={() => setDrawerOpen(false)}>
                    <ChevronRight />
                </IconButton>
            </Box>
            <Divider />
            <Box
                sx={{
                    padding: 1,
                }}
            >
                <Typography>Ваши события</Typography>
            </Box>
                <List>
                    {[
                        "Бой на мечах",
                        "Урок фехтования",
                        "Сходка Крестоносцев",
                        "Ковка мечей ambassadorial",
                    ].map((text: string, i) => (
                        <ListItem button key={text} onClick={() => router.push('/events/id/0')}>
                            <ListItemIcon>
                                <AccessibilityNew />
                            </ListItemIcon>
                            <ListItemText primary={text.substring(0, 15) + '...'} secondary={'25-10-2021'}/>
                        </ListItem>
                    ))}
                </List>
        </Drawer>
    );
};

export default EventDrawer;
