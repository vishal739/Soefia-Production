import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LoginFailure = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role');
    const error = searchParams.get('error');

    useEffect(() => {
        console.log(`Login failure reason: ${error}`);
    }, [error]);

    const getMessageForRole = () => {
        switch (role) {
            case 'admin':
                return "Admin login failed. Please try again or contact support.";
            case 'teacher':
                return "Teacher login failed. Please try again.";
            case 'student':
                return "Student login failed. Make sure you have the correct credentials.";
            default:
                return "Login failed. Please try again.";
        }
    };

    return (
        <div>
            <h2>Login Failed</h2>
            <p>{getMessageForRole()}</p>
            <p>{error ? `Error: ${error}` : ''}</p>
            <button onClick={() => window.location.href = `/${role}/login`}>
                Retry Login
            </button>
        </div>
    );
};

export default LoginFailure;
