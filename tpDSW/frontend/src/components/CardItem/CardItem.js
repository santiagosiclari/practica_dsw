import "./CardItem.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({nombre, imagen, precio, huespedMax, seleccionado, alSeleccionarItem}) {
    return (
        <Card sx={{ width: 280,
            height: 350,
            display: "flex",
            flexDirection: "column",
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#e7e7e7',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}} onClick={alSeleccionarItem}>
        <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{
                        height: 180,
                        objectFit: "cover",
                        width: "100%"
                    }}
                    image={imagen}
                    alt={"Imagen " + nombre}
                />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                    {nombre}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Precio: ${precio}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Max. huespedes: {huespedMax}
                </Typography>

            </CardContent>

        </CardActionArea>
        </Card>
    );
}