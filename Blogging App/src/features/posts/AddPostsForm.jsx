import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice.js";
import { selectAllUsers } from "../users/usersSlice.js";

const AddPostsForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUserChanged = (e) => setUserId(e.target.value);

  let canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const saveForm = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        alert("Failed to save the post ");
        console.log("Error is : ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user, index) => (
    <option key={index} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="mt-4 border border-white px-4 py-2 rounded-md">
      <h2 className=" text-2xl font-serif font-semibold mt-3 mb-4">
        Add a new post
      </h2>

      <form>
        <label htmlFor="postTitle">Title :</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder="Enter the title of the post"
          className="rounded-md px-2 text-black"
        />
        <label htmlFor="userAdded">User :</label>
        <select
          id="User"
          value={userId}
          onChange={onUserChanged}
          className="text-black"
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContext">Content :</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          placeholder="Enter the post content here"
          className="rounded-md px-2 text-black"
        />
        <button
          className={`bg-green-500 px-3 py-2 max-w-auto mx-auto rounded-lg ${
            canSave
              ? "hover:cursor-pointer"
              : "hover:cursor-not-allowed opacity-50"
          }`}
          onClick={saveForm}
          type="button"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </div>
  );
};

export default AddPostsForm;
