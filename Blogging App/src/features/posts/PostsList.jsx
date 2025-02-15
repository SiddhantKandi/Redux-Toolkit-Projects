import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice.js";
import PostAuthor from '../posts/postAuthor.jsx';
import TimeStamp from './TimeStamp.jsx';
import ReactionButtons from './reactionButtons.jsx'

function PostsList() {
  const posts = useSelector(selectAllPosts); // use it to get the required data from the redux store

  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article key={post.id} className="mt-6">
        <h3>{post.title}</h3>
        <p>{post.content.substr(0, 100)}</p>
        <p className="capitalize">
          <PostAuthor userId={post.userId} />
          <TimeStamp timeStamp={post.date}/></p>
        <ReactionButtons post = {post} />
      </article>
    );
  });

  return (
    <div>
      <h2 className="mt-4">Posts</h2>
      {renderedPosts}
    </div>
  );
}

export default PostsList;
