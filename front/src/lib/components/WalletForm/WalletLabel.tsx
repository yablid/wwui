// src/lib/components/WalletForm/WalletLabel.tsx
import { ChangeEvent } from "react";
import { useWalletFormAPI, useWalletFormData } from "../../context/WalletFormApi.tsx";
import { Labels } from "@lib/constants/labels.enum.js";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

const WalletLabel = () => {

    const { label } = useWalletFormData();
    const { onLabelChange } = useWalletFormAPI();

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onLabelChange(e.target.value);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <TextField
                type="text"
                id="label"
                label="label"
                onChange={onValueChange}
                value={label}
                required
                select
                defaultValue="insider"
                fullWidth
            >
                <Typography>
                    Label:
                </Typography>
                {Object.entries(Labels).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
            </TextField>
        </Grid>
    );
};

export default WalletLabel;

/*
            <select onChange={onValueChange} value={label}>
              {Object.entries(Labels).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
 */
