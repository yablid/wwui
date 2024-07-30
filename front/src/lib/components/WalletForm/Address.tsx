// src/lib/components/WalletForm/Address.tsx
import { ChangeEvent, FocusEvent, useState } from "react";
import { useWalletFormAPI, useWalletFormData } from "../../context/WalletFormApi.tsx";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

//export const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
export const ADDRESS_REGEX = /.*/;


const Address = () => {

    const { address } = useWalletFormData();
    const { onAddressChange } = useWalletFormAPI();

    const [ validAddress, setValidAddress ] = useState(false);
    const [ addressTouched, setAddressTouched ] = useState(false);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onAddressChange(e.target.value);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setValidAddress(ADDRESS_REGEX.test(e.target.value));
        setAddressTouched(true);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <TextField
                type="text"
                id="address"
                label="address"
                onChange={onValueChange}
                onBlur={onBlur}
                value={address}
                required
            >
                Address:
            </TextField>
            <Typography mt={1} ml={1} variant="subtitle1">
                {addressTouched && !validAddress && <span>0x... [42 chars]</span>}
            </Typography>
        </Grid>
    )
}
export default Address;