import { useSelector } from "react-redux";
import { selectPostIds, getPostsError, getPostsStatus } from "./postsSlice.js";

import PostExcerpt from "./PostsExcerpt.jsx";
import Spinner from "../../utils/Spinner.jsx";

function PostsList() {
  const orderedPostsIds = useSelector(selectPostIds); // use it to get the required data from the redux store
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;

  if (postStatus === "loading") {
    content = <Spinner />;
  } else if (postStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => {
      return <PostExcerpt key={postId} postId={postId} />;
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
