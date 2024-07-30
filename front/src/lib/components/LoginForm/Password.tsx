// src/lib/components/LoginForm/Password.tsx
import React, { ChangeEvent, useState } from "react";

import { useLoginFormAPI, useLoginFormData } from "../../context/LoginFormApi.tsx";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

export const Password = () => {

    const { password } = useLoginFormData();
    const { onPasswordChange } = useLoginFormAPI();

    const [ showPassword, setShowPassword ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(e.target.value);
    }

    return (
        <Grid>
            <TextField
                sx={{ width: '28ch' }}

                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                id="login_password"
                variant="outlined"
                margin="normal"
                size="medium"
                required
                onChange={onValueChange}
                value={password}
                label="Password"
                InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>,
                }}
            />
        </Grid>
    )
}