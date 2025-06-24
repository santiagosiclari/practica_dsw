import CircularProgress from '@mui/material/CircularProgress';

const CargandoCentrado = ({ color = '#E1655F', size = 60 }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            width: '100%',
        }}>
            <CircularProgress sx={{ color: color }} size={size} />
        </div>
    );
};

export default CargandoCentrado;