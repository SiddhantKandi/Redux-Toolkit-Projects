import { Link, useNavigate } from "react-router-dom";

function Header() {
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
