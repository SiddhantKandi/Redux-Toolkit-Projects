import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice.js";
import TimeStamp from "./TimeStamp.jsx";
import ReactionButtons from "./reactionButtons.jsx";
import PostAuthor from "./postAuthor.jsx";
import {useParams,Link} from 'react-router-dom'

function SinglePostPage() {

   const {postId} = useParams();


  const post = useSelector((state) => selectPostById(state, Number(postId)));


  if (!post) {
    return (
      <section>
        <h2>Post Not found</h2>
      </section>
    );
  }

  return (
    <article className="mt-6">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="capitalize">
        <Link to={`/post/edit/${postId}`} className="text-orange-600 mb-4">Edit Post</Link>
        <br />
        <PostAuthor userId={post.userId} />
        <TimeStamp timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );

}

export default SinglePostPage;
