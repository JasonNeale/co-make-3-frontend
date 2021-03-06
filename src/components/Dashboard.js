// Package imports
import React, { useEffect, useState } from 'react'

// Component Imports
import DashNav from './DashboardNav'
import DashContent from './DashboardContent'
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth'

// Context Imports
import { PostContext } from '../contexts/PostContext';


function Dashboard(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('https://co-make-3.herokuapp.com/api/posts')
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
    }, [])
    
    return (
        <PostContext.Provider value={posts}>
            <div className="row dashboard-wrapper">
                <DashNav />
                <DashContent />
            </div>
        </PostContext.Provider>
    )
}

export default Dashboard