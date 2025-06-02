import HomePage from './features/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import AlojamientoDetailPage from './features/alojamientos/AlojamientoDetailPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout  />} >
            <Route index element={<HomePage />} />
            <Route path="/alojamientos/:title" element={<AlojamientoDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;