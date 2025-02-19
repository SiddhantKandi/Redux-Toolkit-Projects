import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice.js";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice.js";

function EditPostForm() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    return (
      <section>
        <h3>Post Not found</h3>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    try {
      if (canSave) {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      alert("Failed to save the post");
      console.log("Error occurred while saving the post : ", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      alert("Failed to delete the post");
      console.log("Error occurred while deleting the post : ", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2 className="mb-3">Edit Post</h2>

      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="text-black px-4 py-2 w-auto h-auto text-wrap"
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
          className="text-black px-4 py-2"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          className="text-black px-4 py-2 w-auto h-auto min-h-60"
        />
        <div className="flex flex-row justify-center">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="bg-green-600 px-4 py-2 mr-6 rounded-lg"
          >
            Save Post
          </button>
          <button
            className="bg-red-600 px-4 py-2 rounded-lg"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPostForm;
