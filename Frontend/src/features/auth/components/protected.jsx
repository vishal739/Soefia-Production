import { useSelector } from 'react-redux';
import {Navigate } from 'react-router-dom';
import { selectCheckUser } from '../authSlice';

const Protected = ({children}) => {
    console.log("protecting")
    const user= useSelector(selectCheckUser);
    
    if(!user){
        return (<Navigate to='/login' replace={true}/>);
    }
    return children;  
}

export default Protected