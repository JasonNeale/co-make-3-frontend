// Package imports
import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';


const LoginForm = (props) => {

    console.log(props)

    return (
        <div className="text-center">
            <h2 className="form-title">Login</h2>
            <Form>
                <div className="form-group text-left">
                    <label htmlFor="username">Username:</label>
                    <Field type="text" className="form-control" id="username" name="username" placeholder="Enter username" />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Password:</label>
                    <Field type="password" className="form-control" id="password" name="password" placeholder="Password" />
                </div>
                <div>
                    {props.touched.password && props.errors.password && (<div className="form-validation alert alert-danger" role="alert">{props.errors.password}</div>)}
                    {props.touched.email && props.errors.email && (<div className="form-validation alert alert-danger" role="alert">{props.errors.email}</div>)}
                </div>
                <button type="submit" className="btn btn-alt btn-primary">Login</button>
            </Form>
        </div>
    )
}
                
export default withFormik({
    mapPropsToValues: ({username, password}) => ({
        username: username || '',
        password: password || ''
    }),
    validationSchema: yup.object().shape({
        username: yup
            .string()
            .required('An email is required.'),
        password: yup
            .string()
            .required('A password is required.'),
    }),
    handleSubmit: (values, formikBag) => {
        axiosWithAuth()
            .post('http://co-make-3.herokuapp.com/api/auth/login', values)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userID', res.data.id)
                localStorage.setItem('username', res.data.username)
                formikBag.setStatus(res.data)
                console.log('Res.data: ', res.data)
                formikBag.resetForm()
                formikBag.props.history.push(`/dashboard/${res.data.id}`)
            })
            .catch(err => console.log('Axios: ', err.res))
    }
})(LoginForm)