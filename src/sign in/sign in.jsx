import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import './sign in.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Languageselectors from '../components/language-selectors';
import axios from 'axios';
const SignupForm = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const userSchema = yup.object({
        firstName: yup.string().required(t('youssef')).min(2, t('lengthError')).max(11, t('lengthError')),
        lastName: yup.string().required(t('yousse')).min(2, t('lengthError')).max(11, t('lengthError')),
        email: yup.string().required(t('youss')).email(t('emailError')),
        password: yup.string().required(t('yous')).matches(/^(?=.*[A-Z])[A-Za-z0-9]/, t('passwordError')).min(8, t('passwordError')),
        repassword: yup.string().required(t('you')).oneOf([yup.ref('password')], t('repasswordError')),
        number: yup.string().required(t('yo')).matches(/^01[1250][0-9]{8}$/, t('numberError'))
    });
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            password: "",
            repassword: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://jwt-bearer-auth1.p.rapidapi.com/login', values, {
                    headers: {
                        'content-type': 'application/json',
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': 'ddf881fae0mshe761ff8e4a2b0cbp116c40jsne983689f024f',
                        'X-RapidAPI-Host': 'jwt-bearer-auth1.p.rapidapi.com'
                    }
                });
                if (response.status === 200) {
                    console.log('Signup successful');
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    navigate('/L');
                }
            } catch (error) {
                setError(error.message);
            }
        },
    });
    //Email:your_email@gdomain.com
    // password:Your_password123.
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://jwt-bearer-auth1.p.rapidapi.com/login', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Languageselectors />
            <div className='container-sign mt-5 form-signin'>
                <form onSubmit={formik.handleSubmit}>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='mb-3'>
                        <label htmlFor="firstName">{t("greeting")}</label>
                        <input
                            className="form-label form-control"
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder={t("greeting")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName && <p className='message-error my-2 fs-6'>{formik.errors.firstName}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="lastName">{t("greetin")}</label>
                        <input
                            className="form-label form-control"
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder={t("greetin")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName && <p className='message-error my-2 fs-6'>{formik.errors.lastName}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">{t("greeti")}</label>
                        <input
                            className="form-label form-control"
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t("greeti")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && <p className='message-error my-2 fs-6'>{formik.errors.email}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">{t("greet")}</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder={t("greet")}
                        />
                        {formik.touched.password && formik.errors.password && <p className='message-error my-2 fs-6'>{formik.errors.password}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="repassword">{t("gree")}</label>
                        <input
                            type="password"
                            name='repassword'
                            className="form-control"
                            id="repassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.repassword}
                            placeholder={t("gree")}
                        />
                        {formik.touched.repassword && formik.errors.repassword && <p className='message-error my-2 fs-6'>{formik.errors.repassword}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="number">{t("gre")}</label>
                        <input
                            type="text"
                            name='number'
                            className="form-control"
                            id="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.number}
                            placeholder={t("gre")}
                        />
                        {formik.touched.number && formik.errors.number && <p className='message-error my-2 fs-6'>{formik.errors.number}</p>}
                    </div>
                    <button type="submit" className='btn btn-primary'>{t("register")}</button>
                </form >
            </div>
        </>
    );
};
export default SignupForm;