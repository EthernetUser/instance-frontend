import { CircularProgress, Container, Grid } from "@mui/material"
import MainLayout from "../layouts/MainLayout"
import React from "react";

const Loader = () => {
    return (
        <MainLayout>
            <Container component={'main'} maxWidth="md">
                <Grid container>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 5
                    }}>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}

export default Loader;