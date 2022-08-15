import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { TextField, Button } from '@mui/material';
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const dispatch = useDispatch();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div>
      <div >
        <div className='comments'>
          <div >Comments</div>
          {comments?.map((c, i) => (
            <div className="comments__field" key={i}>
              <strong>{c.split(': ')[0]}</strong>&nbsp;
              {c.split(':')[1]}
            </div>
          ))}
          <div className="ref" ref={commentsRef} />
        </div>
        <div style={{ width: '95%' }}>
          <div >Write a comment</div>
          <TextField
            label="Comment"
            minRows={3}
            mutiline="true"
            value={comment}
            variant="outlined"
            fullWidth
            onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button
            style={{ marginTop: '10px', marginBottom: '10px' }}
            disabled={!comment.length}
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;