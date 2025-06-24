import {Route, Routes} from "react-router-dom";
import Layout from "./features/layout/Layout";
import Alojamientos from "./features/alojamientos/Alojamientos";
import {BrowserRouter} from "react-router";
import {useContext} from "react";
import {AlojamientosContext} from "./context/AlojamientosProvider";
import AlojamientoDetailPage from "./components/alojamientos/AlojamientoDetailPage";
import ReservaDetailPage from "./components/reservas/ReservaDetailPage";
import HomePage from "./components/homePage/HomePage"
import CargandoCentrado from "./components/circularProgress/CircularProgress";


export const AppRoutes = () => {
    const {alojamientos, alojamientosLoading} = useContext(AlojamientosContext);

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                {<Route index element={<HomePage/>}/>}
                {<Route path="/alojamientos" element={alojamientosLoading ? <CargandoCentrado /> : <Alojamientos/>}/>}
                <Route path="/alojamientos/:id" element={<AlojamientoDetailPage />} />
                <Route path="/reservas/:id" element={<ReservaDetailPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
}