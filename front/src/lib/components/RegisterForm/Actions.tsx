// src/lib/components/RegisterForm/Actions.tsx
import { useNavigate } from "react-router-dom";

import { useRegisterFormAPI, useRegisterFormData } from "@lib/context/RegisterFormApi";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const Actions = () => {

    const { onSubmit } = useRegisterFormAPI();
    const { errorMessage } = useRegisterFormData();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log("Handling register form actions handleSubmit...")
        const success = await onSubmit();
        console.log("Navigating back to home...success:", success)
        if (success) {
            navigate('/home', { replace: true });
        }
    }

    return (
        <Grid container direction="column">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                pb="24px"
                pt="12px"
            >
                <Typography color="error">
                    { errorMessage }
                </Typography>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Register
            </Button>
        </Grid>
    );
}

