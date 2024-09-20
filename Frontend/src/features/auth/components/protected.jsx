import { useSelector } from 'react-redux';
import { Navigate,useLocation } from 'react-router-dom';
import { selectCheckUser } from '../authSlice';

const Protected = ({ children }) => {
    console.log("protecting")
    const user = useSelector(selectCheckUser);
    const location = useLocation();
    const role = location.pathname.split('/')[1];
    if (!user) {
        return (<Navigate to={`/${role}/login`} replace={true} />);
    }
    return children;
}

export default Protected