import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    useTheme,
} from '@mui/material'

import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import { dashboardNavigation } from './contants'

export const DashboardSideMenu: React.FC = () => {
    const theme = useTheme()
    const matches = useMatchRoute()
    const navigate = useNavigate()

    return (
        <List disablePadding>
            {dashboardNavigation.map((item) => (
                <div key={`${item.path}${item.label}`}>
                    <ListItem disablePadding>
                        <Stack direction="row" padding="8px 16px">
                            {item.icon && (
                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                    <item.icon />
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primary={item.label || item.path}
                                primaryTypographyProps={{ fontSize: 14 }}
                            />
                        </Stack>
                    </ListItem>

                    {item.children && (
                        <List
                            disablePadding
                            sx={{ bgcolor: 'background.paper' }}
                        >
                            {item.children.map((subItem) => {
                                const selected = matches({ to: subItem.path })
                                return (
                                    <ListItem
                                        key={`${subItem.path}${subItem.label}`}
                                        disablePadding
                                        sx={{
                                            borderRight: selected
                                                ? `3px solid ${theme.palette.primary.main}`
                                                : undefined,
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{ pl: 4 }}
                                            onClick={() =>
                                                subItem.path &&
                                                navigate({ to: subItem.path })
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    subItem.label ||
                                                    subItem.path
                                                }
                                                primaryTypographyProps={{
                                                    fontSize: 14,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    )}
                </div>
            ))}
        </List>
    )
}
