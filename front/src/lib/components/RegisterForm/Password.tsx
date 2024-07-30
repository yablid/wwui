// src/lib/components/RegisterForm/Password.tsx
import React, { useState, ChangeEvent, FocusEvent } from "react";

import { useRegisterFormAPI, useRegisterFormData } from "../../context/RegisterFormApi.tsx";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

//export const PASSWORD_REGEX = /^(?:[a-z ]{21,})$/;
export const PASSWORD_REGEX = /^[a-z ]{2,}$/;

export const Password = () => {

    const { password } = useRegisterFormData();
    const { onPasswordChange } = useRegisterFormAPI();

    const [ showPassword, setShowPassword ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };

    const [ validPassword, setValidPassword ] = useState(false);
    const [ passwordTouched, setPasswordTouched ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(e.target.value);
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidPassword(PASSWORD_REGEX.test(e.target.value));
        setPasswordTouched(true);
    }

    return (
        <Grid>
            <TextField
                sx={{ width: '28ch' }}
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                size="medium"
                id="register_password"
                required
                onChange={onValueChange}
                onBlur = {onBlur}
                value={password}
                label="Password"
                InputProps = {{
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
            <Typography mt={1} ml={1} variant="subtitle1">
                {
                    passwordTouched &&
                    !validPassword &&
                    <span>
                        20+ lowercase, a-z, including spaces
                    </span>
                }
            </Typography>

        </Grid>
    )
}