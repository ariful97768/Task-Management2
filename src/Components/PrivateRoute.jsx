import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    if (loader) {
        return <div className='h-screen w-screen flex justify-center items-center'><span className="loading loading-bars loading-xl"></span></div>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'}></Navigate>

};

export default PrivateRoute;