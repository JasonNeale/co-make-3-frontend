// Package imports
import React from 'react'
import {NavLink} from 'react-router-dom'


function DashboardNavLink(props) {
    
    return (
        <li>
            <NavLink exact to={props.link}>{props.title}</NavLink>
        </li>
    )
}

export default DashboardNavLink