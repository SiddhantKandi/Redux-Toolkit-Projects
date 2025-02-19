import PostLists from "./features/posts/PostsList.jsx";
import AddPostForm from "./features/posts/AddPostsform.jsx";
import Layout from "./components/Layout.jsx";
import EditPostForm from './features/posts/EditPostForm.jsx';
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLists />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
