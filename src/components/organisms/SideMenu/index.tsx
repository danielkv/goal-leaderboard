import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    useTheme,
} from '@mui/material'
import { RouteObject, useLocation, useNavigate } from 'react-router-dom'

interface SideMenuProps {
    routeItems: RouteObject[]
}

export const SideMenu: React.FC<SideMenuProps> = ({ routeItems }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <List disablePadding>
            {routeItems.map((item) => (
                <div key={item.path}>
                    <ListItem disablePadding>
                        <Stack direction="row" padding="8px 16px">
                            {item.handle.icon && (
                                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                    <item.handle.icon />
                                </ListItemIcon>
                            )}
                            <ListItemText
                                primary={
                                    item.handle.name || item.id || item.path
                                }
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
                                const selected = pathname === subItem.path
                                return (
                                    <ListItem
                                        key={subItem.path}
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
                                                navigate(subItem.path)
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    subItem.handle.name ||
                                                    subItem.id ||
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
