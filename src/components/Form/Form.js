import "./styles.css"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { TextField, Button } from "@mui/material"
// import ChipInput from '@mui/material/Chip'
// import ChipInput from 'material-ui-chip-input'


import FileBase64 from "react-file-base64"
// import { createPost } from "../../API"

import { createPost, updatePost } from "../../actions/posts"

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  })
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null) // original
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (!post?.title) clear()

    if (post) setPostData(post)
  }, [post])

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
      clear()
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
      clear()
    }
  }
  const clear = () => {
    setCurrentId(0)
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    })
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag.toLowerCase()] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  if (!user?.result?.name) {
    return (
      <div className="paper__notLog">
        <div className="subPaper__notLog">
          <div className="text">
            <h3>Please Sign In <br />to create your own memories <br />&<br />like other's memories.</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="paper__Form">
      <div className="left__form"></div>
      <form autoComplete="off" noValidate className="form" onSubmit={handleOnSubmit}>
        <h3>{(currentId ? 'Editing' : 'Creating')}  a Memory</h3>
        {/* <TextField className="textField" name="creator" variant="outlined" label="Creator" size="small" margin="dense" value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} fullWidth /> */}
        <TextField className="textField" name="title" variant="outlined" label="Title" size="small" margin="dense" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} fullWidth />
        <TextField className="textField" name="message" multiline rows={4} variant="outlined" label="Message" size="small" margin="dense" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} fullWidth />
        {/* <TextField className="textField" name="tags" variant="outlined" label="Tags" size="small" margin="dense" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} fullWidth /> */}
        {/* NEW */}
        {/* <ChipInput
          className="textField"
          variant="outlined"
          name="tags"
          value={postData.tags}
          label="Search Tags"
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          // style={{ margin: '10px 0' }}
          fullWidth
          size="small" margin="dense"
        /> */}
        {/* <ChipInput
          className="textField"
          margin="dense"
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
        /> */}
        <div className="buttons__form">
          <FileBase64 className="input-file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />

          <Button
            disabled={!postData.title || !postData.message || !postData.tags || !postData.selectedFile}

            // background-color: transparent;
            className="buttonSubmit"
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            fullWidth>
            Submit
          </Button>
          <Button
            disabled={!postData.title || !postData.message || !postData.tags || !postData.selectedFile}
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth>
            Clear
          </Button>
        </div>
      </form >
      <div className="right__form"></div>
    </div >
  )
}

export default Form
