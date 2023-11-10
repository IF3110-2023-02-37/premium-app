import { FormEvent, useState } from "react";
import { Podcast, PodcastData, AddPodcastModalProps } from "../../interfaces";


export default function AddPodcastModal({ addNewPodcast }: AddPodcastModalProps) {
  const [error, setError] = useState<string>('');
  const closeHandler = () => {
    const modal = document.getElementById('AddPodcastModal');
    if (modal) {
      modal.style.display = 'none';
      const inputElements = modal.querySelectorAll('input');
      inputElements.forEach((input: HTMLInputElement) => {
        input.value = ''; // Clear the value of each input element
      });
      setError('');
    }
  }

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement;
    let title = titleElement ? titleElement.value : null; 
    let audio = "";
    let cover = "";

    let audioFile = null;
    let coverFile = null;

    const audioElmt = document.getElementById('audio') as HTMLInputElement  ;
    if (audioElmt) {
      const selectedFile = audioElmt.files ? audioElmt.files[0] : null;
      if (selectedFile) {
        audioFile = selectedFile;
        let path = selectedFile.name.replace("C:\\fakepath\\", "");
        const isMp3 = /\.mp3$/i.test(path);
        if (!isMp3) {
          return setError("Please input audio in mp3 format");
        } 
        audio = path;
      } else {
        return setError("No audio selected");
      }
    }

    const coverElmt = document.getElementById('cover') as HTMLInputElement  ;
    if (coverElmt) {
      const selectedFile = coverElmt.files ? coverElmt.files[0] : null;
      if (selectedFile) {
        coverFile = selectedFile;
        let path = selectedFile.name.replace("C:\\fakepath\\", "");
        console.log("cover path: "+path)
        const isImage = /\.(png|jpe?g)$/i.test(path);

        if (!isImage) {
          return setError("Please input cover in png or jpg format");
        } 
        cover = path;
      } else {
        return setError("No cover selected");
      }
    }

    if (audio && title && cover) {
      const userString = localStorage.getItem('user') ; // Retrieve the item as a string
      if (userString) {
        const user = JSON.parse(userString).username; // Parse the string to get the JSON object
        const token = localStorage.getItem('token')
        const data: PodcastData = {
          podcaster: user,
          audio: audio,
          title: title,
          picture: cover
        };

        try {
          const url = import.meta.env.VITE_SERVER_URL;
          console.log(data)
          const response = await fetch(`${url}/podcast/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
          });

          const responseData = await response.json();
          if (response.ok) {
            console.log("success add podcast");
            addNewPodcast(responseData.data)
            closeHandler();
          } else {
            return setError(responseData.message)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    console.log()
  }
  
  return (
    <>
      <div className="fixed z-10 w-full h-full bg-black100 bg-opacity-20 backdrop-blur-[1.5px] flex justify-center items-center px-5">

        <div className="w-full max-w-[500px] bg-yellow100 h-fit py-10 px-5 rounded-md justify-center flex flex-col">
          <p className="self-center mb-5 text-salmon200 text-lg font-bold">Add New Podcast</p>
          <form action="" className="flex flex-col" onSubmit={handleSubmit}>
            <ul>
              <li className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  className="text-sm mb-3" 
                  required/>
              </li>
              <li className="flex flex-col">
                <label htmlFor="audio">Audio</label>
                <input 
                  type="file" 
                  name="audio" 
                  id="audio" 
                  className="text-sm mb-3" 
                  />
              </li>
              <li className="flex flex-col">
                <label htmlFor="cover">Cover</label>
                <input 
                  type="file" 
                  name="cover" 
                  id="cover" 
                  className="text-sm mb-3"/>
              </li>
            </ul>
            <p id="error" className="text-red100 text-sm">{error}</p>
            <div className="mt-10 self-end">
              <a className="cancel-btn mr-5" onClick={closeHandler}>Cancel</a>
              <button type="submit" className="add-btn">Add</button>
            </div>
    

          </form>

        </div>
      </div>
    </>
  )
};

