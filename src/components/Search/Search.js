import "./styles.css"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { TextField, Button } from "@mui/material"
// import TagsInput from "../TagsInput/TagsInput"
// import ChipInput from 'material-ui-chip-input'

import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from "../../actions/posts"


const Search = () => {
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // function handleSelecetedTags(items) {
    //     setTags(items);
    // }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    // const handleAdd = (tag) => {
    //     setTags([...tags, tag])
    // }

    // const handleDelete = (tagToDelete) => {
    //     setTags(tags.filter((tag) => tag !== tagToDelete))

    // }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))

        } else {
            navigate("/")
        }
    }

    const searchClear = () => {
        setSearch('')
        setTags([])
        dispatch(getPosts({ limit: 8, skip: 1 }))
        // navigate("/")
    }


    var flag = true

    if (tags.length === 1 && tags[0] === "") tags.pop()

    if (search || tags.length) {
        flag = false;
    } else {
        flag = true;
    }

    return (
        <div className="paper__Search">
            <form className="search__form" autoComplete="off" noValidate>
                <h3>Search for Memories</h3>
                <TextField
                    className="textField"
                    name="search"
                    variant="outlined"
                    label="Search Memories"
                    size="small" margin="dense"
                    fullWidth
                    onKeyDown={handleKeyDown}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    className="textField"
                    name="tags"
                    variant="outlined"
                    label="Search Tags"
                    size="small" margin="dense"
                    style={{ margin: '10px 0' }}
                    fullWidth
                    onKeyDown={handleKeyDown}
                    value={tags}
                    onChange={(e) => setTags(e.target.value.toLowerCase().trim().split(','))}
                />
                {/* NEW */}
                {/* <ChipInput
                    className="textField"
                    variant="outlined"
                    value={tags}
                    label="Search Tags"
                    onAdd={(chip) => handleAdd(chip)}
                    onDelete={(chip) => handleDelete(chip)}
                    // style={{ margin: '10px 0' }}
                    fullWidth
                    size="small" margin="dense"
                /> */}
                {/* <TagsInput */}

                {/* // selectedTags={handleSelecetedTags}
                    // fullWidth
                    // variant="outlined"
                    //// id="tags"
                    // name="tags"
                    // placeholder="add Tags"
                    // label="add Tags"
                    // tags00={tags}
                    // size="small" margin="dense" */}
                {/* /> */}

                {/* OLD */}
                {/* <ChipInput
                    className="textField"
                    style={{ margin: '10px 0' }}
                    value={tags}
                    onAdd={(chip) => handleAdd(chip)}
                    onDelete={(chip) => handleDelete(chip)}
                    label="Search Tags"
                    variant="outlined"
                    style={{ margin: '10px 0' }}
                    fullWidth
                    size="small" margin="dense"
                /> */}

                <div className="search__buttons">

                    <Button
                        style={{ marginBottom: '10px' }}
                        className="searchButton"
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={flag}
                        onClick={searchPost}
                        fullWidth
                    >Search
                    </Button>
                    <Button
                        className="searchButton"
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={flag}
                        onClick={searchClear}
                        fullWidth
                    >Clear</Button>
                </div>


            </form>

        </div>
    )
}

export default Search
