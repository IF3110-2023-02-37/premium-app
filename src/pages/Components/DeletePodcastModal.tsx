import { useState, FormEvent } from "react";
import { Podcast } from "../../interfaces";


export interface DeletePodcastModalProps {
  deletePodcast: (podcast: Podcast) => void;
}


export default function DeletePodcastModal({ deletePodcast }: DeletePodcastModalProps) {
  const closeHandler = () => {
    const modal = document.getElementById('DeletePodcastModal');
    if (modal) {
      modal.style.display = 'none';
      const inputElements = modal.querySelectorAll('input');
      inputElements.forEach((input: HTMLInputElement) => {
        input.value = ''; // Clear the value of each input element
      });
    }
  }

  const deleteHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = "";
    const elmt = document.getElementById("DeletePodcastModal")?.dataset.info;
    if (elmt) {
      id = elmt;
      console.log(elmt);
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/podcast/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (response.ok) {
          // close trs tambah card
          console.log("success delete podcast");
          deletePodcast(responseData.data)
          closeHandler();
        } 
      
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Delete failed");
    }
  }

  return (
    <>
     <div className="fixed z-10 w-full h-full bg-black100 bg-opacity-20 backdrop-blur-[1.5px] flex justify-center items-center px-5">
 
       <div className="w-full max-w-[400px] bg-yellow100 h-fit py-10 px-5 rounded-md flex flex-col">
         <p className="text-center mb-10">Are you sure want to delete this podcast?</p>
         <form onSubmit={deleteHandler} className="self-center">
            <a className="cancel-btn mr-5" onClick={closeHandler}>Cancel</a>
            <button className="add-btn" type="submit">Delete</button>
         </form>
 
       </div>
     </div>
    </> 
   )
};
