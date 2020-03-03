// Package imports
import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

// Component Imports
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


function Home() {
    const loggedIn = () => {
        if (localStorage.token != "") {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="col form-wrapper">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <img className="form-logo" alt="co-make logo" src="/images/co-make-logo.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <nav className="comp-nav">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </nav>
                            <hr />
                        </div>
                    </div>
                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/dashboard/:id" /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login" render={renderProps => {
                        return <LoginForm {...renderProps} />
                    }} />
                    <Route path="/register" render={renderProps => {
                        return <RegisterForm {...renderProps} />
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Home