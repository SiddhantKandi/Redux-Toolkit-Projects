import PostLists from "./features/posts/PostsList.jsx";
import AddPostForm from "./features/posts/AddPostsform.jsx";
import Layout from "./components/Layout.jsx";
import EditPostForm from './features/posts/EditPostForm.jsx';
import { Routes, Route,Navigate } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage.jsx";
import UserPage from './features/users/UserPage.jsx';
import UsersList from './features/users/UsersList.jsx';

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
        

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  );
}

export default App;
