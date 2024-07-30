// src/lib/components/WalletForm.tsx

import Address from "@lib/components/WalletForm/Address.tsx";
import Twitter from "@lib/components/WalletForm/Twitter.tsx";
import WalletLabel from "@lib/components/WalletForm/WalletLabel.tsx";
import WalletNotes from "@lib/components/WalletForm/WalletNotes.tsx";
import Nickname from "@lib/components/WalletForm/Nickname.tsx";
import Actions from "@lib/components/WalletForm/Actions.tsx";
import { WalletFormDataProvider } from "@lib/context/WalletFormApi.tsx";

import Grid from "@mui/material/Grid";

const WalletForm = () => {

    return (
        <Grid container spacing={2}>
            <Address />
            <Twitter />
            <WalletLabel />
            <Nickname />
            <WalletNotes />
            <Actions />
        </Grid>
    );
};

export default function WalletFormComponent() {
    return (
        <WalletFormDataProvider>
            <WalletForm />
        </WalletFormDataProvider>
    )
}
