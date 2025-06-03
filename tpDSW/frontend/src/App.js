import HomePage from './features/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import SearchPage from './features/search/SearchPage';
import AlojamientoDetailPage from './features/alojamientos/AlojamientoDetailPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas que usan el layout general (Navbar, Footer, etc) */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="alojamientos/:title" element={<AlojamientoDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;