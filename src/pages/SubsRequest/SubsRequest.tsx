import { useNavigate } from "react-router-dom";
import { getAuthData } from "../../utils/auth"
import { stat } from "fs";

const data = [
  {
    username: "user1",
    podcast: "podkes senin kamis",
    idPodcast: "1",
    status: "rejected"
  },
  {
    username: "user2",
    podcast: "podkes minggu malam",
    idPodcast: "2",
    status: "pending"
  },
  {
    username: "user3",
    podcast: "podkes jumat berkah",
    status: "pending",
    idPodcast: "3",
  },
  {
    username: "user4",
    podcast: "podkes besok senin",
    status: "accepted",
    idPodcast: "4",
  }
]

export default function SubsRequest() {
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

  const subsHandler = (username: string, idPodcast: string, status: string) => {
    // request disini
    console.log(username);
    console.log(idPodcast);
    console.log(status);
  }
  return (
    <>
      <div className="bg-blue100 w-full min-h-[100vh] flex flex-col  px-5 py-2 items-center">
        
        <div className="flex items-center bg-blue300  w-full h-fit justify-end px-5 py-2 rounded-md bg-opacity-80  backdrop-blur-[2.5px]">
          <button className="mr-5 text-md text-white100">Subscription Request</button>
          <button className="bg-salmon100 text-md text-salmon200 rounded-md w-fit  py-2 px-4" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mt-5 text-xl font-bold text-white100 text-bold w-full text-center border-b-2 max-w-[800px]">Subscription Request</div>
        <div className="w-full max-w-[800px] flex flex-col gap-5 mt-5">
          {data.map((subs) => (
            subs.status === "pending" && (
              <div className="flex hover:bg-blue200 px-3 py-2 rounded-md">
                <div className="wrapper-info flex flex-col w-full">
                  <p>{subs.username}</p>
                  <p>{subs.podcast}</p>
                </div>
                <div className="button-wrapper flex gap-5">
                  <button className="w-[35px] opacity-75 hover:opacity-100" 
                    onClick={() => subsHandler(subs.username, subs.idPodcast, "Accepted")}>
                    <img src="accept.png" alt="" />
                  </button>
                  <button className="w-[35px] opacity-75 hover:opacity-100">
                    <img src="reject.png" alt="" />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      
    </>

  )
};