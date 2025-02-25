import { Link, useNavigate } from "react-router-dom";
import { increaseCount, getCount } from "../features/posts/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  const navigate = useNavigate();
  return (
    <header className="min-w-full flex justify-between items-center p-4 bg-gray-800 text-white hover:cursor-pointer">
      <h1
        className="text-3xl font-bold ml-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Redux Blog
      </h1>
      <nav>
        <ul className="flex space-x-7 mr-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/post" className="hover:text-gray-300">
              Post
            </Link>
          </li>
          <li>
            <Link to="/user" className="hover:text-gray-300">
              Users
            </Link>
          </li>
          <button
            className="bg-green rounded-lg px-2 border border-white"
            onClick={() => {
              dispatch(increaseCount());
            }}
          >
            {count}
          </button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
