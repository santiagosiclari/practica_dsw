import {Route, Routes} from "react-router-dom";
import Layout from "./features/layout/Layout";
import Alojamientos from "./features/alojamientos/Alojamientos";
import {BrowserRouter} from "react-router";
import {useContext} from "react";
import {AlojamientosContext} from "./context/AlojamientosProvider";
import AlojamientoDetailPage from "./components/alojamientos/AlojamientoDetailPage";

export const AppRoutes = () => {
    const {alojamientos, alojamientosLoading} = useContext(AlojamientosContext);
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                {<Route path="/alojamientos" element={alojamientosLoading ? "Cargando..." : <Alojamientos/>}/>}
                <Route path="/alojamiento/:id" element={<AlojamientoDetailPage />} />
                {/*<Route path="/notificaciones" element={notificaciones.length === 0 ? "Cargando..." : <Notificacion/>}/>*/}
                {/*<Route path="/reservas" element={<ReservaDetailPage/>}/>*/}
            </Route>
        </Routes>
    </BrowserRouter>
}