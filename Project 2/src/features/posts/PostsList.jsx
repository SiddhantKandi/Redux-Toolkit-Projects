import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice.js";
import PostAuthor from '../posts/postAuthor.jsx';

function PostsList() {
  const posts = useSelector(selectAllPosts); // use it to get the required data from the redux store

  const renderedPosts = posts.map((post) => {
    return (
      <article key={post.id} className="mt-6">
        <h3>{post.title}</h3>
        <p>{post.content.substr(0, 100)}</p>
        <p className="capitalize"><PostAuthor userId={post.userId} /></p>
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
