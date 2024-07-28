import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkUserAsync, selectError, selectCheckUser } from '../../authSlice';
import './login.scss'; 

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectCheckUser);
  // const checkError = useSelector(selectError);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(location.state?.from || '/');
  //   } else if (checkError) {
  //     alert(checkError.message);
  //   }
  // }, [isLoggedIn, checkError, navigate, location.state]);

  const onSubmit = (data) => {
    // dispatch(
    //   checkUserAsync({ email: data.email, password: data.password })
    // );
    console.log(data); // Placeholder for form submission
  };

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
        <p className="register">
          New User?{' '}
          <Link to="/signup" className="link">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
