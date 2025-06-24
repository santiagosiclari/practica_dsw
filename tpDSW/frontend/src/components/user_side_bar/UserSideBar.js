import './UserSideBar.css';
import { Link } from 'react-router-dom';

const UserSidebar = ({ visible, onClose }) => {
    return (
        <div className={`sidebar-overlay ${visible ? 'show' : ''}`} onClick={onClose}>
            <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                <ul>
                    <li><Link to="/mis-reservas">Ver mis reservas</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default UserSidebar;