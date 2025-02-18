import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice.js";
import { useEffect } from "react";
import PostExcerpt from "./PostsExcerpt.jsx";
import Spinner from "../../utils/Spinner.jsx";
import {nanoid} from 'nanoid';

function PostsList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts); // use it to get the required data from the redux store
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

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
