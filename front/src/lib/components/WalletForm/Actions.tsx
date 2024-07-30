// src/lib/components/WalletForm/Actions.tsx
import { useWalletFormAPI } from "../../context/WalletFormApi.tsx";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Actions = () => {
    const { onSave } = useWalletFormAPI();

    return (
        <Grid item xs={12} sm={8} md={4} lg={2} mt={1}>
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
            >
                Watch

            </Button>
        </Grid>
    );
}
export default Actions;