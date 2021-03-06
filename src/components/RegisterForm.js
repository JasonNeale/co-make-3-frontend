// Package imports
import React from 'react'
import axios from 'axios'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'


const RegisterForm = ({ touched, errors, ...props }) => {

    return (
        <div className="text-center">
            <h2 className="form-title">Register</h2>
            <Form>
                <div className="form-group text-left">
                    <label htmlFor="username">Username:</label>
                    <Field type="text" className="form-control" id="username" name="username" placeholder="Enter username" />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="email">Email Address:</label>
                    <Field type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                </div>
                <div className="form-row">
                    <div className="col">
                        <div className="form-group text-left">
                            <label htmlFor="firstName">Your First Name:</label>
                            <Field type="text" className="form-control" id="first_name" name="first_name" placeholder="Enter your first name" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group text-left">
                            <div className="form-group text-left">
                                <label htmlFor="lastName">Your Last Name:</label>
                                <Field type="text" className="form-control" id="last_name" name="last_name" placeholder="Enter your last name" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="col">
                        <div className="form-group text-left">
                            <label htmlFor="password">Password:</label>
                            <Field type="password" className="form-control" id="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group text-left">
                            <label htmlFor="confirmpassword">Confirm Password:</label>
                            <Field type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" />
                        </div>
                    </div>
                </div>
                <div>
                    {touched.username && errors.username && (<div className="form-validation alert alert-danger" role="alert">{errors.username}</div>)}
                    {touched.email && errors.email && (<div className="form-validation alert alert-danger" role="alert">{errors.email}</div>)}
                    {touched.first_name && errors.first_name && (<div className="form-validation alert alert-danger" role="alert">{errors.first_name}</div>)}
                    {touched.last_name && errors.last_name && (<div className="form-validation alert alert-danger" role="alert">{errors.last_name}</div>)}
                    {touched.password && errors.password && (<div className="form-validation alert alert-danger" role="alert">{errors.password}</div>)}
                    {touched.confirmpassword && errors.confirmpassword && (<div className="form-validation alert alert-danger" role="alert">{errors.confirmpassword}</div>)}
                </div>
                <button type="submit" className="btn btn-alt btn-primary">Register</button>
            </Form>
        </div>
    )
}
                
export default withFormik({
    mapPropsToValues: ({username, email, first_name, last_name, password, confirmpassword}) => ({
        username: username || '',
        email: email || '',
        first_name: first_name || '',
        last_name: last_name || '',
        password: password || '',
        confirmpassword: confirmpassword || '',
    }),
    validationSchema: yup.object().shape({
        username: yup.string().required('A username is requried.'),
        email: yup.string().email('This email is not valid').required('An email is required.'),
        first_name: yup.string().required('Your first name is required.'),
        last_name: yup.string().required('Your last name is required.'),
        password: yup.string().required('A password is required.'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match.').required('These passwords do not match.')
    }),
    handleSubmit: (values, formikBag) => {
        console.log(values);
        const {username, email, first_name, last_name, password} = values;
        const newUser = {
            username,
            email,
            first_name,
            last_name,
            password
        }
        axios
        .post('https://co-make-3.herokuapp.com/api/auth/register', newUser)
        .then(res => {
            formikBag.setStatus(res.data)
            formikBag.resetForm()
            formikBag.props.history.push('/login');
        })
        .catch(err => console.log('Axios: ', err))
    }
})(RegisterForm)