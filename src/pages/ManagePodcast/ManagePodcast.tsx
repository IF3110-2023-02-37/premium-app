import Navbar from "../Components/Navbar"
import AddPodcastModal from "../Components/AddPodcastModal";
import { useState } from "react";

export default function ManagePodcast() {
  const openModal = () => {
    const modal = document.getElementById("AddPodcastModal")
    if (modal) {
      modal.style.display = 'block';
    }
  };

  const podcastData = [
    {
      id: 1,
      user: "test1234",
      podcaster: "dedi",
      title: "Podcast Title 1",
      picture: "image/cover.jpg",
      date: "10/10/2023"
    },
    {
      id: 1,
      user: "test1234",
      podcaster: "dedi",
      title: "Podcast Title 1",
      picture: "image/cover.jpg",
      date: "10/10/2023"
    },
    {
      id: 1,
      user: "test1234",
      podcaster: "dedi",
      title: "Podcast Title 1",
      picture: "image/cover.jpg",
      date: "10/10/2023"
    },
    {
      id: 1,
      user: "test1234",
      podcaster: "dedi",
      title: "Podcast Title 1",
      picture: "image/cover.jpg",
      date: "10/10/2023"
    },
    {
      id: 1,
      user: "test1234",
      podcaster: "dedi",
      title: "Podcast Title 1",
      picture: "image/cover.jpg",
      date: "10/10/2023"
    },
  ];
  
  return(
    <>
      <div className="hidden" id="AddPodcastModal">
        <AddPodcastModal/>
      </div>
      <Navbar/>
      <div className="bg-blue100 w-full min-h-[100vh] pt-[110px] flex justify-center px-5">
        <div className="w-full max-w-[600px] flex flex-col">
          <a className="self-end mb-3 py-3 flex items-center hover:cursor-pointer" onClick={openModal}>
            <img src="image/add.svg" className="w-7 mr-4 hover:cursor-pointer" alt=""/>
            <p>Add New Podcast</p>
          </a>

          <div className="list-podcast">
            {podcastData.map((podcast) => (
              <div className="podcast w-full px-5 py-2 flex justify-between bg-blue50 mb-5 rounded-md" key={podcast.id}>
                <div className="flex">
                  <img src={podcast.picture} className="w-[60px] rounded-md mr-3" alt="" />
                  <div className="text-md">
                    <p>{podcast.title}</p>
                    <p className="text-black100 text-opacity-70 text-xs">{podcast.date}</p>
                  </div>
                </div>
                <div className="items-center flex">
                  <button>
                    <img src="image/edit.svg" alt="edit" className="w-[35px]" />
                  </button>
                  <button>
                    <img src="image/delete.svg" alt="delete" className="w-[35px] transition duration-300 ease-in-out hover:text-red100" />
                  </button>
                </div>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </>
  )
};