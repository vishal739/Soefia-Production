import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync, selectCheckUser, selectError } from '../../authSlice'
import "./signup.scss"

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectCheckUser);
    const checkError = useSelector(selectError);
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${isLoggedIn.role}`)
        } else if (checkError) {
            alert(checkError.message);
        }
    }, [isLoggedIn, checkError]);

    const onSubmit = (data) => {
        console.log("Creating account for this data: ");
        if(data.password!=data.confirmPassword){
            return;
        }
        dispatch(dispatch(createUserAsync({ email: data.email, password: data.password })));
        console.log(data);
    };

    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h2 className='logo'>Soefia</h2>
                    <h2 className="title">
                        Create your account
                    </h2>
                    <div className="form-container">
                        <form noValidate
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <div className="input-group">
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
                                        className="input-field"
                                    />
                                    {errors.email && (<p className='error-message'>{errors.email.message}</p>)}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        id="password"
                                        {...register("password", {
                                            required: 'Please enter password', pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message: `- at least 8 characters
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    - Can contain special characters`,
                                            }
                                        })}
                                        type="password"
                                        className="input-field"
                                    />
                                    {errors.password && (
                                        <p className="error-message">{errors.password.message}</p>)}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        id="confirmPassword"
                                        {...register("confirmPassword", {
                                            required: 'Please enter password again',
                                            validate: (value) => value === watch('password') || 'Password not matching'
                                        })}
                                        type="password"
                                        className="input-field"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="error-message">{errors.confirmPassword.message}</p>)}
                                </div>
                            </div>

                            <div className="submit-group">
                                <button
                                    type="submit"
                                    className="submit-button"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="signin-redirect">
                            Have a account?{' '}
                            <Link to="/login" className="signin-link">
                                Login Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
