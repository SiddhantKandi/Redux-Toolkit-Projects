import TimeStamp from "./TimeStamp.jsx";
import ReactionButtons from "./reactionButtons.jsx";
import PostAuthor from "../posts/postAuthor.jsx";
import {Link} from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
  return (
    <article className="mt-6">
      <h3>{post.title}</h3>
      <p className="excerpt">{post.body.substr(0, 75)}...</p>
      <p className="capitalize postCredit mt-3">
        <Link to={`post/${post.id}`} className="text-blue-500 mb-4">View Post</Link>
        <br />
        <PostAuthor userId={post.userId}/>
        <TimeStamp timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
