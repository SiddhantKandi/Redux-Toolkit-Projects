import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  
} from "./postsSlice.js";

import PostExcerpt from "./PostsExcerpt.jsx";
import Spinner from "../../utils/Spinner.jsx";
import {nanoid} from 'nanoid';

function PostsList() {
 

  const posts = useSelector(selectAllPosts); // use it to get the required data from the redux store
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  

  let content;

  if (postStatus === "loading") {
    content = <Spinner />;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => {
      return <PostExcerpt key={nanoid()} post={post} />;
    });
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="mt-4">Posts</h2>
      {content}
    </div>
  );
}

export default PostsList;
