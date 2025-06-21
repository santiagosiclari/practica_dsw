import "./CardItem.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


/*export const CardItem = ({ nombre, imagen, precio, seleccionado, alSeleccionarItem }) => {
    return <div
        className={`card ${seleccionado && "selected"}`}
        onClick={alSeleccionarItem}
    >
        <h3>{nombre}</h3>
        <img src={imagen} alt={"Imagen" + nombre + " item"} />
        <p className="price">${precio}</p>
    </div>
}*/

export default function ActionAreaCard({nombre, imagen, precio, seleccionado, alSeleccionarItem}) {
    return (
        <Card sx={{ width: 280, height: 340, display: "flex", flexDirection: "column" }} onClick={alSeleccionarItem}>
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
            </CardContent>

        </CardActionArea>
        </Card>
    );
}