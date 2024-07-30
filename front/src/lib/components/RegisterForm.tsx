// src/lib/components/RegisterForm.tsx
import { Username } from "./RegisterForm/Username.tsx";
import { Password } from "./RegisterForm/Password.tsx";
import { Matchword } from "./RegisterForm/Matchword.tsx";
import { Actions } from "./RegisterForm/Actions.tsx";
import { RegisterFormDataProvider} from "../context/RegisterFormApi.tsx";

import Stack from "@mui/material/Stack";

const RegisterForm = () => {
    return (
        <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-end"
        >
            <Username />
            <Password />
            <Matchword />
            <Actions />
        </Stack>
    );
};

export default function RegisterFormComponent() {
    return (
        <RegisterFormDataProvider>
            <RegisterForm />
        </RegisterFormDataProvider>
    )
}

