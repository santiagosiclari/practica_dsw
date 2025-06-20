import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Divider from '@mui/material/Divider';

export default function NotificacionesMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificaciones, setNotificaciones] = React.useState([
        'Reserva confirmada',
        'Nuevo mensaje de Juan',
        'Tu pago fue aprobado',
    ]);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const marcarTodasLeidas = () => {
        setNotificaciones([]); // vacía el arreglo, desaparece el badge
        handleClose();
    };

    return (
        <>
            <IconButton
                aria-label="notificaciones"
                onClick={handleClick}
                sx={{
                    color: 'inherit',
                    '&:hover': {
                        color: 'primary.main',
                    },
                }}
            >
                <Badge badgeContent={notificaciones.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 220,
                    },
                }}
            >
                {notificaciones.length > 0 ? (
                    <>
                        {notificaciones.map((n, index) => (
                            <MenuItem key={index} onClick={handleClose}>
                                {n}
                            </MenuItem>
                        ))}
                        <Divider />
                        <MenuItem onClick={marcarTodasLeidas} sx={{ fontWeight: 'bold' }}>
                            Marcar todas como leídas
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem disabled>No hay notificaciones</MenuItem>
                )}
            </Menu>
        </>
    );
}
