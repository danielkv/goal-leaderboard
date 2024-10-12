import { createTheme } from '@mui/material'

export const themeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#EE2042',
            light: '#F87A8F',
            dark: '#4C0511',
        },
        secondary: {
            main: '#64c79e',
        },
        background: {
            default: '#262626',
            paper: '#101010',
        },
        success: {
            main: '#5AE21A',
        },
        warning: {
            main: '#EAD200',
        },
        divider: '#303030',
    },
    shape: {
        borderRadius: 8,
    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: { backgroundImage: 'none' },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    '.MuiToolbar-root': { padding: '0 32px' },
                },
            },
            defaultProps: {
                color: 'default',
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        backgroundColor: '#202020',
                    },
                },
            },
            defaultProps: {
                fullWidth: true,
            },
        },
    },
})
