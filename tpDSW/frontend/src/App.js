import 'bootstrap/dist/css/bootstrap.min.css';
import {AppRoutes} from "./routes";
import { AlojamientosProvider } from './context/AlojamientosProvider';

function App() {
    return (
        <AlojamientosProvider>
            <AppRoutes/>
        </AlojamientosProvider>
    );
}
export default App;