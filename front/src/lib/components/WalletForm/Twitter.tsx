// src/lib/components/WalletForm/Twitter.tsx
import { ChangeEvent, FocusEvent, useState } from "react";
import { useWalletFormAPI, useWalletFormData } from "../../context/WalletFormApi.tsx";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const TWITTER_REGEX = /^[A-Za-z0-9_]{4,15}$/

const Twitter = () => {

    const { twitter } = useWalletFormData();
    const { onTwitterChange } = useWalletFormAPI();

    const [ validTwitter, setValidTwitter ] = useState(false);
    const [ twitterTouched, setTwitterTouched ] = useState(false);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.charAt(0) === '@') {
            value = value.slice(1);
        }
        onTwitterChange(value);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidTwitter(TWITTER_REGEX.test(e.target.value));
        setTwitterTouched(true);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <TextField
                type="text"
                id="twitter"
                label="@"
                onChange={onValueChange}
                onBlur={onBlur}
                value={twitter}
            >
                @
            </TextField>
            <Typography mt={1} ml={1} variant="subtitle1">
                {
                    twitterTouched && !validTwitter &&
                    <span>
                        Twitter handle: 4-15 chars (including '_')
                    </span>}
            </Typography>
        </Grid>
    );
};

export default Twitter;