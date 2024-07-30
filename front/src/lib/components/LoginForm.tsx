// src/lib/components/LoginForm.tsx

// TODO: Error messages next to form fields on larger screens

import { Username } from "./LoginForm/Username.tsx";
import { Password } from "./LoginForm/Password.tsx";
import { Actions } from "./LoginForm/Actions.tsx";
import { LoginFormDataProvider} from "../context/LoginFormApi.tsx";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const LoginForm = () => {
    return (

        <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-end"
        >
            <Username />
            <Password />
            <Actions />
            <Grid container justifyContent="center">
                <Link
                    href="/register"
                    color="secondary"
                >
                    <Typography>
                        Join us.
                    </Typography>
                </Link>
            </Grid>
        </Stack>
    );
};

export default function LoginFormComponent() {
    return (
        <LoginFormDataProvider>
            <LoginForm />
        </LoginFormDataProvider>
    )
}

