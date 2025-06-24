import { useSearchParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import './PageSearch.css';

export default function PageSearch({ totalPages }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const handleChange = (_, value) => {
        searchParams.set("page", value);
        setSearchParams(searchParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pagination-container">
            <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </div>
    );
}
