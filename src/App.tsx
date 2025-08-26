import { themeOptions } from './theme'

import { CssBaseline, ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ptBrLocale from 'dayjs/locale/pt-br'
import duration from 'dayjs/plugin/duration'
import { router } from '@router'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'

dayjs.locale(ptBrLocale)
dayjs.extend(duration)

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeOptions}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="pt-br"
                >
                    <CssBaseline />
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </LocalizationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
