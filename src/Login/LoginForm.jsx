import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../../authService';

const LoginForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const userSchema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password);
                navigate('/dashboard');
            } catch (error) {
                setError(error.message);
            }
        },
    });

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-label form-control"
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Enter Your Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && <p className='message-error my-2 fs-6'>{formik.errors.email}</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder='Enter Your Password'
                    />
                    {formik.touched.password && formik.errors.password && <p className='message-error my-2 fs-6'>{formik.errors.password}</p>}
                </div>
                <button type="submit" className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
