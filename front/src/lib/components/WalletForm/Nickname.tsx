// src/lib/components/WalletForm/Nickname.tsx
import { ChangeEvent, FocusEvent, useState } from "react";
import { useWalletFormAPI, useWalletFormData } from "../../context/WalletFormApi.tsx";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const NICKNAME_REGEX = /^.{1,50}$/;

const Nickname = () => {

    const { nickname } = useWalletFormData();
    const { onNicknameChange } = useWalletFormAPI();

    const [ validNickname, setValidNickname ] = useState(false);
    const [ nicknameTouched, setNicknameTouched ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onNicknameChange(e.target.value);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidNickname(NICKNAME_REGEX.test(e.target.value));
        setNicknameTouched(true);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <TextField
                type="text"
                id="nickname"
                label="nickname"
                onChange={onValueChange}
                onBlur={onBlur}
                value={nickname}
            >
                Nickname:
            </TextField>
            <Typography mt={1} ml={1} variant="subtitle1">
                {nicknameTouched && !validNickname && <span>Less than 50 chars</span>}
            </Typography>
        </Grid>
    );
}

export default Nickname;