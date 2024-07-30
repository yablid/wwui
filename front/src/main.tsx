/* entry point */

// TODO: ui for discord bot notification to send txs from wallet to channel...
// https://docs.alchemy.com/docs/how-to-create-a-whale-alert-discord-bot

// TODO: generalize component for password field, other to avoid reusing
// Basic input field component
// then props stuff

// TODO: https://mui.com/material-ui/guides/minimizing-bundle-size/

// TODO: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
// TODO: https://codesandbox.io/s/react-router-v6-auth-demo-updated-t28l48?file=/src/hooks/useLocalStorage.js
// TODO: https://www.youtube.com/watch?v=nI8PYZNFtac

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from '@lib/context/AuthContext';
import App from "./App";

import { darkTheme } from './styles/theme';
import CssBaseline from "@mui/material/CssBaseline";

const rootElement = document.getElementById("root")!;
const root = createRoot( rootElement );

root.render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <App />
            </ThemeProvider>
        </AuthProvider>

   </StrictMode>
);

