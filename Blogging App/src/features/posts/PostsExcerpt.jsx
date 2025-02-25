import TimeStamp from "./TimeStamp.jsx";
import ReactionButtons from "./reactionButtons.jsx";
import PostAuthor from "../posts/postAuthor.jsx";
import {Link} from 'react-router-dom';
// import React from 'react';
import {useSelector} from 'react-redux'
import {selectPostById} from './postsSlice.js'

const PostsExcerpt = ({ postId }) => {

  const post = useSelector((state) => selectPostById(state,postId))

  return (
    <article className="mt-6">
      <h3>{post?.title}</h3>
      <p className="excerpt">{post?.body.substring(0, 75)}...</p>
      <p className="capitalize postCredit mt-3">
        <Link to={`post/${post?.id}`} className="text-blue-500 mb-4">View Post</Link>
        <br />
        <PostAuthor userId={post?.userId}/>
        <TimeStamp timeStamp={post?.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

// PostExcerpt = React.memo(PostExcerpt) One way to do it this way

export default PostsExcerpt;
