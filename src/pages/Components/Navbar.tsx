import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="max-w-[100vw] w-[100vw] bg-blue-500 p-4 bg-blue300 over fixed">
      <div className="text-white100">
        <ul className="flex space-x-4 justify-end items-center">
          <li>
            <Link to="/manage-podcast" className="hover:opacity-100  opacity-75">Podcast</Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:opacity-100  opacity-75">Feedback</Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:opacity-100  opacity-75">Logout</Link>
          </li>
          <li>
            <Link to="/profile">
              <img src="image/profile/default.jpg" className="w-10 h-10 rounded-full opacity-90 hover:shadow-3xl hover:opacity-100" alt="" />
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};
