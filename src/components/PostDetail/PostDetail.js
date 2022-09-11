import React, { useEffect, useState } from 'react'
import "./styles.css"

import { useDispatch, useSelector } from 'react-redux';

import formatDistance from 'date-fns/formatDistance'
import { parseISO } from "date-fns/esm";

import { useParams, useNavigate } from 'react-router-dom';
import { getPost, likePost, deletePost, getPostsBySearch } from '../../actions/posts';

import { AiOutlineLike } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"
import { IoTrashOutline } from "react-icons/io5"
import { CircularProgress } from "@mui/material"

import Post from "../Posts/Post/Post"
import CommentSection from './CommentSection';

const PostDetail = () => {
  
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [likes, setLikes] = useState(post?.likes)

  const user = JSON.parse(localStorage.getItem('profile'))
 
  const userId = user?.result.googleId || user?.result?._id;
  
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post, dispatch])

  if (!post) return null

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id)

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes.find((like) => like === (userId))
        ? (
          <><AiFillLike />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><AiOutlineLike />&nbsp;{likes.length} {likes.length === 1 ? `Like` : 'Likes'}</>
        );
    }

    return <><AiOutlineLike />&nbsp;Like</>;
  }

  const delPost = (id) => {
    dispatch(deletePost(id))
    navigate("/posts")
  }

  if (isLoading) {
    return (
      <div className="postdetail">
        <div className="postdetail__container">
          <CircularProgress size="7em" />
        </div>
      </div >
    );
  }

  return (
    <div className="postdetail">
      <div className="postdetail__container">
        <div className="postdetail__img">
          <img src={post?.selectedFile} alt="memories" />
        </div>
        <div className="postdetail__info">

          <div className="postdetail__creator">by_{post?.name}</div>

           {/* <div className="postdetail__time">{formatDistance(parseISO(post.createAt), new Date())}</div>  */}

          <div className="postdetail__title"><b>{post?.title}</b></div>

          <div className="postdetail__message">{post?.message}</div>

          <div className="postdetail__tags">{post?.tags?.map(tag => `#${tag} `)}</div>
          {(user?.result?.googleId || user?.result?._id) &&
            <CommentSection post={post} />}
          <div className="postdetail__buttons">
            <div className="postdetail__like" disabled={!user?.result} onClick={handleLike}>
              <Likes />
            </div>
            <div className="postdetail__delete">
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                <IoTrashOutline onClick={() => delPost(post._id)} disabled={!user?.result} />}
            </div>
          </div>
        </div>
      </div>
      {
        recommendedPosts?.length > 0 && (
          <>
            <div className="recommendedPosts__cards"> You might also like: </div>
            <div className='recommendedPosts__container'>
              {recommendedPosts.slice(0, 5).map((post) => (<div key={Math.random().toString()}><Post post={post} /></div>))}
            </div>
          </>
        )
      }
    </div >
  )
}

export default PostDetail
