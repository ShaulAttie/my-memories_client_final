import "./styles.css"
import React, { useEffect, useState } from 'react'

import formatDistance from 'date-fns/formatDistance'
import { parseISO } from "date-fns/esm";

import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';

import { useNavigate } from "react-router-dom"

import { AiOutlineLike } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"
import { IoTrashOutline } from "react-icons/io5"
import { GiPencil } from "react-icons/gi"

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [likes, setLikes] = useState(post?.likes)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userId = user?.result.googleId || user?.result?._id;

  const hasLikedPost = post?.likes?.find((like) => like === userId);

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

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    navigate(`/posts/${post._id}`)
  };


  // console.log(formatDistance(parseISO(post.createAt), new Date()))
  // console.log(post.createAt);
  return (
    <div className="post__container">
      <div className="post__subcontainer" onClick={openPost}>
        <div className="post__img">
          <img src={post.selectedFile} alt="memories" />
          <div className="post__img__info">
            <div className="post__creator">by_{post.name}
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                (window.location.pathname.split("/")[2] === undefined) &&
                <GiPencil
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id)
                  }}
                />
              }
            </div>

            {/* <div className="post__time">{formatDistance(parseISO(post.createAt), new Date())}</div> */}

          </div>
        </div>
        <div className="post__tags">{post.tags.map(tag => `#${tag} `)}</div>
        <div className="post__title"  >{post.title}</div>
        <div className="post__message">{post.message}</div>
      </div>
      <div className="post__buttons">
        <div className="post__like" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </div>
        {/* <div className="post__edit">
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            (window.location.pathname.split("/")[2] === undefined) &&
            <GiPencil
              onClick={(e) => {
                // e.stopPropagation();
                setCurrentId(post._id)
              }}
            />
          }
        </div> */}
        <div className="post__delete">
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
            <IoTrashOutline onClick={() => dispatch(deletePost(post._id))} disabled={!user?.result} />}
        </div>
      </div>
    </div>
  )
}

export default Post
