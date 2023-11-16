import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove the token from localStorage
    localStorage.removeItem("token");

    if (localStorage.getItem("token") === null) {
      navigate('/login');
    } else {
      console.log("failed to remove token")
    }
  }

  
  return (
    <nav className="max-w-[100vw] w-[100vw] fixed p-4">
      <div className="bg-blue-500 p-4 bg-blue300 w-full rounded-3xl bg-opacity-80  backdrop-blur-[2.5px]">
        
        <div className="text-white100">
          <ul className="flex space-x-[5vw] justify-end items-center">
            <li>
              <Link to="/manage-podcast" className="hover:opacity-100  opacity-75">Podcast</Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:opacity-100  opacity-75">Feedback</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:opacity-100  opacity-75">Logout</button>
            </li>
            <li>
              <Link to="/profile">
                <img src="image/profile/default.jpg" className="w-10 h-10 rounded-full opacity-90 hover:shadow-3xl hover:opacity-100" alt="" />
              </Link>
            </li>
            
          </ul>
        </div>
      
      </div>
    </nav>
  );
};
