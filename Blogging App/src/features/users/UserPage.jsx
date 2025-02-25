import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice.js";
import { useParams } from "react-router-dom";
import { selectPostsForUser } from "../posts/postsSlice.js";
import { Link } from "react-router-dom";

function UserPage() {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostsForUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
}

export default UserPage;
