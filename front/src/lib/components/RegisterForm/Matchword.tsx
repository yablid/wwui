// src/lib/components/RegisterForm/Matchword.tsx
import React, { useState, ChangeEvent, FocusEvent } from "react";

import { useRegisterFormAPI, useRegisterFormData } from "../../context/RegisterFormApi.tsx";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const Matchword = () => {

    const { matchword } = useRegisterFormData();
    const { onMatchwordChange } = useRegisterFormAPI();

    const [ showPassword, setShowPassword ] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };

    const [ matchwordTouched, setMatchwordTouched ] = useState(false);

    const { password } = useRegisterFormData();
    const [ isMatch, setIsMatch ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onMatchwordChange(e.target.value);
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsMatch(e.target.value === password)
        setMatchwordTouched(true);
    }

    return (
        <Grid>
            <TextField
                sx={{ width: '28ch' }}
                variant="outlined"
                margin="normal"
                size="medium"
                required
                type={showPassword ? 'text' : 'password'}
                id="register_matchword"
                onChange={onValueChange}
                onBlur = {onBlur}
                value={matchword}
                label="Confirm Password"
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
              {matchwordTouched && !isMatch && (
                <span>Does not match the password</span>
              )}
            </Typography>

        </Grid>
    )
}