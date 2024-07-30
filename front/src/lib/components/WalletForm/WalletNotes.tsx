// src/lib/components/WalletForm/WalletNotes.tsx
import { ChangeEvent, FocusEvent, useState } from "react";

import { useWalletFormAPI, useWalletFormData } from "@lib/context/WalletFormApi.jsx";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const NOTES_REGEX = /^.{1,256}$/;

const WalletNotes = () => {
    const { notes } = useWalletFormData();
    const { onNotesChange } = useWalletFormAPI();

    const [ validNotes, setValidNotes ] = useState(false);
    const [ notesTouched, setNotesTouched ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onNotesChange(e.target.value);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidNotes(NOTES_REGEX.test(e.target.value));
        setNotesTouched(true);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <TextField
                type="text"
                id="notes"
                label="notes"
                onChange={onValueChange}
                onBlur={onBlur}
                value={notes}
            >
                Notes:
            </TextField>
            <Typography mt={1} ml={1} variant="subtitle1">
                {notesTouched && !validNotes && <span>Less than 256 chars</span>}
            </Typography>
        </Grid>
    );
};

export default WalletNotes;