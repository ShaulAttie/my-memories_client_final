import "./styles.css"
import React, { useEffect, useState } from 'react'

import { useDispatch } from "react-redux"
import { getPosts } from "../../actions/posts"

import { FcNext } from "react-icons/fc"
import { FcPrevious } from "react-icons/fc"

import Posts from "../Posts/Posts"
import Search from "../Search/Search"
import Form from "../Form/Form"

const Main = () => {
    const [currentId, setCurrentId] = useState(0)
    const [skip, setSkip] = useState(1)

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

    const itemsPerPage = 8

    const params = { limit: itemsPerPage, skip: skip }

    useEffect(() => {
        dispatch(getPosts(params))

    }, [currentId, user, skip, dispatch])

    const previous = () => {
        setSkip((prev) => prev -= 1)
    }
    const next = () => {
        setSkip((prev) => prev += 1)
    }

    return (
        <div className="main__container">
            <div className="sub__main__container">
                <div className="left__container">
                    <Posts setCurrentId={setCurrentId} />
                </div>
                <div className="pre__next">
                    <div className="previous" >
                        {skip > 1 &&
                            <div className="sub__previous" onClick={previous} >
                                <FcPrevious />Previous</div>}
                    </div>
                    <div className="next" onClick={next}>
                        Next<FcNext /></div>
                </div>
            </div>
            <div className="right__container">
                <Search />
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>
        </div>
    )
}

export default Main