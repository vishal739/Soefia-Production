import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectError, selectCheckUser, loginVerifyAsync } from '../../authSlice';
import './login.scss';
import GoogleButton from 'react-google-button'
import googleicon from '../../../../assets/google.png'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectCheckUser);
  const checkError = useSelector(selectError);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('checkError:', checkError);
    if (isLoggedIn) {
      console.log('Redirecting...');
      const role = isLoggedIn.role;
      const id = isLoggedIn.id;
      navigate(`/teacher`);
    } else if (checkError) {
      // alert(checkError.message);
    }
  }, [isLoggedIn, checkError, navigate]);

  const onSubmit = (data) => {
    dispatch(
      loginVerifyAsync({ email: data.email, password: data.password })
    );
    console.log(data);
  };

  const handleGoogleAuth = () => {
    console.log("google authentication")
    window.open("http://localhost:8080/auth/google/","_self")
  }
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className='logo'>Soefia</h2>
        <h2 className="title">
          Sign in to your account
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'email not valid',
                }
              })}
              type="email"
              className="input"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: 'Please enter password' })}
              type="password"
              className="input"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            <div className="forgot-password">
              <Link to="/forgot" className="link">
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="submit-button"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="login-bottom">
          <p className="register">
            New User?{' '}
            <Link to="/signup" className="link">
              Register Now
            </Link>
          </p>
          <p>or{' '}</p>
            
          <div className="google-btn" onClick={handleGoogleAuth}>
            <div className="google-icon-wrapper">
              <img alt="Google icon" className="google-icon" src={googleicon} />
            </div>
            <p className="btn-text"><b>Sign in with Google</b></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
