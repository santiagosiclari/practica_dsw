import React, { useState, useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Box, Typography, Button, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const ItemBox = ({ precioPorNoche, alojamientoId, cantHuespedesTotal }) => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [huespedes, setHuespedes] = useState(1);
    const huespedesTotal = cantHuespedesTotal;

    const cantidadNoches = useMemo(() => {
        if (checkIn && checkOut && dayjs(checkOut).isValid() && dayjs(checkIn).isValid()) {
            const diff = dayjs(checkOut).diff(dayjs(checkIn), 'day');
            return diff > 0 ? diff : 0;
        }
        return 0;
    }, [checkIn, checkOut]);


    const total = precioPorNoche * cantidadNoches;

    const handleReserva = async () => {
        if (!checkIn || !checkOut || cantidadNoches <= 0) return alert("Selecciona fechas válidas");

        try {
            const response = await fetch("http://localhost:3000/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    huespedReservador: "68326110d26cbc7eced3985e",
                    cantHuespedes: huespedes,
                    alojamiento: alojamientoId,
                    fechaInicio: checkIn.format("YYYY-MM-DD"),
                    fechaFinal: checkOut.format("YYYY-MM-DD"),
                })
            });

            if (response.ok) {
                const reserva = await response.json();
                window.location.href = `/reservas/${reserva._id}`;
            } else {
                console.error("Error al crear la reserva");
                alert("Error al crear la reserva");
            }
        } catch (err) {
            console.error(err);
            alert("Error de red al crear la reserva");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: 2,
                width: '100%',
                maxWidth: 360,
                backgroundColor: '#fff',
                boxShadow: 2
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={600}>${precioPorNoche} <Typography component="span" variant="body2">/ noche</Typography></Typography>
                    <Typography variant="body2" color="text.secondary">⭐ 5.0 · 7 reviews</Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2} mb={2}>
                    <DatePicker
                        label="Check-in"
                        value={checkIn}
                        onChange={setCheckIn}
                        disablePast
                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                    <DatePicker
                        label="Check-out"
                        value={checkOut}
                        onChange={setCheckOut}
                        disablePast
                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                    <TextField
                        label="Huéspedes"
                        type="number"
                        value={huespedes}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                                if (val >= 1 && val <= huespedesTotal) {
                                    setHuespedes(val);
                                } else if (val < 1) {
                                    setHuespedes(1);
                                } else if (val > huespedesTotal) {
                                    setHuespedes(huespedesTotal);
                                }
                            }
                        }}
                        fullWidth
                        size="small"
                        inputProps={{ min: 1, max: huespedesTotal }}
                    />
                </Box>

                <Typography variant="body2" mb={1}>
                    {cantidadNoches > 0
                        ? `${cantidadNoches} noche${cantidadNoches > 1 ? 's' : ''} · Total: $${total}`
                        : "Seleccioná fechas para calcular el total"}
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#E0655E', ':hover': { backgroundColor: '#AD6F6C' } }}
                    onClick={handleReserva}
                >
                    Reservar ahora
                </Button>

                <Typography variant="caption" display="block" mt={1} color="text.secondary">
                    No se te cobrará todavía
                </Typography>
            </Box>
        </LocalizationProvider>
    );
};

export default ItemBox;

