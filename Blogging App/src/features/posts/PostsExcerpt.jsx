import TimeStamp from "./TimeStamp.jsx";
import ReactionButtons from "./reactionButtons.jsx";
import PostAuthor from "../posts/postAuthor.jsx";

const PostsExcerpt = ({ post }) => {
  return (
    <article className="mt-6">
      <h3>{post.title}</h3>
      <p>{post.body.substr(0, 100)}</p>
      <p className="capitalize">
        <PostAuthor userId={post.userId} />
        <TimeStamp timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
