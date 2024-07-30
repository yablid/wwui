// src/lib/components/LoginForm/Username.tsx
import { ChangeEvent } from "react";

import { useLoginFormAPI, useLoginFormData } from "../../context/LoginFormApi.tsx";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export const Username = () => {

    const { username } = useLoginFormData();
    const { onUsernameChange } = useLoginFormAPI();

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUsernameChange(e.target.value);
    }

    return (
        <Grid>
            <TextField
                sx={{ width: '28ch' }}
                variant="outlined"
                margin="normal"
                size="medium"
                type="text"
                id="login_username"
                required
                onChange={onValueChange}
                value={username}
                label="Username"
            />
        </Grid>
    )
}