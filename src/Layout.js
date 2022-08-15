import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Auth from './components/Auth/Auth'
import PostDetail from './components/PostDetail/PostDetail'

import './Layout.css'

const Layout = () => {
    // const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <div className="layout__container">
            <Header />
            <Routes>
                <Route path='/'  element={<Main />} />
                <Route path='/posts'  element={<Main />} />
                <Route path='/posts/search'  element={<Main />} />
                <Route path='/posts/:id'  element={<PostDetail />} />
                <Route path='/auth'  element={<Auth />} />

            </Routes>
        </div>
    )
}

export default Layout
