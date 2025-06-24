// src/components/UsuarioMenu.jsx

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function UsuarioMenu() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        // Evita abrir/cerrar con tab o shift
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setOpenDrawer(open);
    };

    const opciones = [
        '📌 Reservas',
        '💬 Mensajes',
        '🛠 Configuración',
        '🚪 Cerrar sesión',
    ];

    const handleOptionClick = (option) => {
        console.log(`Seleccionaste: ${option}`);
        // Acá podés agregar lógica según la opción
        setOpenDrawer(false); // cierra el drawer al seleccionar una opción
    };

    return (
        <>
            <IconButton
                aria-label="usuario"
                onClick={toggleDrawer(true)}
                sx={{
                    color: 'inherit',
                    '&:hover': {
                        color: 'primary.main',
                    },
                }}
            >
                <AccountCircleIcon />
            </IconButton>

            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                <List sx={{ width: 250 }}>
                    {opciones.map((text, index) => (
                        <React.Fragment key={text}>
                            <ListItem
                                button
                                onClick={() => handleOptionClick(text)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                            {(index === 2) && <Divider />} {/* Divider después de Configuración */}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
