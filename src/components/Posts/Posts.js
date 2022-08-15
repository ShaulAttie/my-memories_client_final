import React from 'react'
import "./styles.css"

import { useSelector } from "react-redux"
import { CircularProgress } from "@mui/material"

import Post from "./Post/Post"

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts)
    
    // NAO MEXE NESSA PAGINA
    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
        posts.map((post) => (
            <div key={Math.random().toString()}>
                <Post post={post} setCurrentId={setCurrentId} />
            </div>
        )))
    )
}

export default Posts
