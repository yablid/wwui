// src/lib/components/LoginForm/Actions.tsx

import { useNavigate } from "react-router-dom";
import { useLoginFormAPI, useLoginFormData } from "@lib/context/LoginFormApi.tsx";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Actions = () => {

    const { onSubmit } = useLoginFormAPI();
    const { errorMessage } = useLoginFormData();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const success = await onSubmit();
        console.log("handleSubmit success", success);
        if (success) {
            console.log("Login successful, navigating to /home...")
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
                pb="12px"
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
                Login
            </Button>
        </Grid>
    );
}

