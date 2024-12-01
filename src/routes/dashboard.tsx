import { DashboardSideMenu } from '@components/organisms/DashboardSideMenu'
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    Toolbar,
    Typography,
} from '@mui/material'

import LOGO_URL from '@assets/images/goal-leaderboard-logo.png'

import { createFileRoute, Outlet } from '@tanstack/react-router'

const LOGO_ALT_TEXT = 'My Goal Leaderboard'
const DRAWER_WIDTH = 240

export const DashboardLayout: React.FC = () => {
    //const matches = useMatches() as UIMatch<unknown, RouteHandle>[]

    const { name = '' } = {} //matches[matches.length - 1]?.handle || {}

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: `${DRAWER_WIDTH}px`,
                    bgcolor: '#202020',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                open
                variant="permanent"
                anchor="left"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: '#202020',
                    },
                }}
            >
                <Toolbar>
                    <img src={LOGO_URL} alt={LOGO_ALT_TEXT} />
                </Toolbar>
                <Divider />
                <Box mt={3}>
                    <DashboardSideMenu />
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 4,
                    width: `calc(100vw - ${DRAWER_WIDTH}px)`,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}

export const Route = createFileRoute('/dashboard')({
    component: DashboardLayout,
})
