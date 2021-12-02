import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MainLayout from "../../layouts/MainLayout";
import React from "react";

const FAQ = () => {
    return (
        <MainLayout>
            <Container component={'main'} maxWidth={'md'}>
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5">
                        Вопросы
                    </Typography>
                    <Grid container spacing={4} sx={{mt: 2}}>
                        {['- Вопрос 1?', '- Вопрос 2?', '- Вопрос 3?', '- Вопрос 4?'].map((text, i) => (
                            <Grid item key={i} xs={12}>
                                <Typography variant="h6" textAlign={`${i % 2 === 0 ? "left" : "right"}`}>
                                    {text}
                                </Typography>
                                <Typography>
                                    Ответ: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci nemo vel itaque tempore quasi eos ratione odio cupiditate esse accusantium voluptatum ab eius nam, sint aperiam voluptas ducimus maxime reprehenderit.
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </MainLayout>
    )
}

export default FAQ;