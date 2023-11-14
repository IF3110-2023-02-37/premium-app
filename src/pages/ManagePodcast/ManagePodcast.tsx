import Navbar from "../Components/Navbar"
import AddPodcastModal from "../Components/AddPodcastModal";
import EditPodcastModal from "../Components/EditPodcastModal";
import DeletePodcastModal from "../Components/DeletePodcastModal";
import { useState, useEffect } from "react";
import { Podcast } from "../../interfaces";


export default function ManagePodcast() {
  const [listPodcast, setListPodcast] = useState<Podcast[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const podcastsPerPage = 10;

  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName)
    if (modal) {
      modal.style.display = 'block';
    }
    console.log(listPodcast)
  };

  const openEditModal = (podcast: Podcast) => {
    openModal("EditPodcastModal");
    const title = document.getElementById("e-title") as HTMLInputElement;
    const modal = document.getElementById("EditPodcastModal")
    if (title && modal) {
      const podcastTitleElement = document.getElementById(`title-${podcast.id}`);
      title.value = podcastTitleElement?.textContent ?? "";
      modal.setAttribute("data-info", podcast.id);
    }
  }

  const openDeleteModal = (podcast: Podcast) => {
    openModal("DeletePodcastModal");
    const modal =  document.getElementById("DeletePodcastModal")
    if (modal) {
      modal.setAttribute("data-info", podcast.id)
    }
  }

  const fetchData = async(username: string, token: any) => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${url}/podcast/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        // console.log("success")
        setListPodcast(responseData.data);
        // console.log(listPodcast)
      } else {
        alert('Error fetching data, please try again later');
      }
    } catch (error) {
      console.error(error);
    }
  }  

  useEffect(() => {
    const user = localStorage.getItem('user');  
    if (user) {
      const username = JSON.parse(user).username;
      const token = localStorage.getItem('token');

      fetchData(username, token);
    }
  }, [])

  const addNewPodcast = (newPodcast: Podcast) => {
    setListPodcast((prevList) => [newPodcast, ...prevList]);
  };

  const deletePodcast = (podcast: Podcast) => {
    const updatedList = listPodcast.filter(item => item && item.id !== podcast.id);
    setListPodcast(updatedList);
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const url = import.meta.env.VITE_SERVER_URL;
  const totalPages = Math.ceil(listPodcast.length / podcastsPerPage);
  const visiblePages = calculateVisiblePages(currentPage, totalPages);

  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = listPodcast.slice(indexOfFirstPodcast, indexOfLastPodcast);

  return (
    <>
      <div className="hidden" id="AddPodcastModal">
        <AddPodcastModal addNewPodcast={addNewPodcast} />
      </div>
      <div className="hidden" id="EditPodcastModal">
        <EditPodcastModal />
      </div>
      <div className="hidden" id="DeletePodcastModal">
        <DeletePodcastModal deletePodcast={deletePodcast}/>
      </div>
      <Navbar />
      <div className="bg-blue100 w-full min-h-[100vh] pt-[110px] flex justify-center px-5">
        <div className="w-full max-w-[600px] flex flex-col">
          <a className="self-end mb-3 py-3 flex items-center hover:cursor-pointer" onClick={() => openModal("AddPodcastModal")}>
            <img src="image/add.svg" className="w-7 mr-4 hover:cursor-pointer" alt="" />
            <p>Add New Podcast</p>
          </a>

          <div className="list-podcast">
            {currentPodcasts.map((podcast) => (
              <div className="podcast w-full px-5 py-2 flex justify-between bg-blue50 mb-5 rounded-md" key={podcast.id} id={"podcast-" + podcast.id}>
                <div className="flex">
                  <img id={"cover-" + podcast.id} src={url + "/cover/" + podcast.picture} className="w-[60px] rounded-md mr-3 cover" alt="" />
                  <div className="text-md">
                    <p id={"title-" + podcast.id}>{podcast.title}</p>
                    <p className="text-black100 text-opacity-70 text-xs">{podcast.date}</p>
                  </div>
                </div>
                <div className="items-center flex">
                  <button>
                    <img src="image/edit.svg" alt="edit" className="w-[35px]" 
                      onClick={() => openEditModal(podcast)} />
                  </button>
                  <button>
                    <img src="image/delete.svg" alt="delete" className="w-[35px] transition duration-300 ease-in-out hover:text-red100" 
                      onClick={() => openDeleteModal(podcast)}/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination w-full flex items-center justify-center gap-3">
            {visiblePages.map((page) => (
              <button className="bg-blue300 w-7 text-white100 rounded-lg mb-10" key={page} onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const calculateVisiblePages = (currentPage: number, totalPages: number): number[] => {
  const visiblePages = [];

  if (totalPages <= 5) {
    // Show all pages if total pages are less than or equal to 5
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    // Show a range of 5 pages based on the current page
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  }

  return visiblePages;
};