// src/lib/components/RegisterForm/Username.tsx
import React, { useState, ChangeEvent, FocusEvent } from "react";

import { useRegisterFormAPI, useRegisterFormData } from "../../context/RegisterFormApi.tsx";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

export const Username = () => {

    const { username } = useRegisterFormData();
    const { onUsernameChange } = useRegisterFormAPI();

    const [ validUsername, setValidUsername ] = useState(false);
    const [ usernameTouched, setUsernameTouched ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUsernameChange(e.target.value);
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidUsername(USERNAME_REGEX.test(e.target.value));
        setUsernameTouched(true);
    }

    return (
        <Grid>
            <TextField
                sx={{ width: '28ch' }}
                type="text"
                variant="outlined"
                margin="normal"
                size="medium"
                id="register_username"
                required
                onChange={onValueChange}
                onBlur = {onBlur}
                value={username}
                label="Username"
            />
            <Typography mt={1} ml={1} variant="subtitle1">
                {
                    usernameTouched &&
                    !validUsername &&
                    <span>
                        4-24 chars: letter + [ a-z, A-Z, 0-9, _ , -]
                    </span>
                }
            </Typography>

        </Grid>
    )
}