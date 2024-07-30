import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a83200',
            contrastText: '#b0aeae'
        },
        secondary: {
            main: '#4d8fb3',
        },
        background: {
            default: '#363636',
        },
        info: {
            main: '#b0aeae',
        },
        error: {
            main: red.A400,
        }
    },
    typography: {
        subtitle1: {
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#b0aeae',
        },
        button: {
            fontWeight: 500,
        }
    }
});

// #363636 - mid grey
// #a83200 - burnt orange
// # 00825d - shady sage
