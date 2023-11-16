import { useState } from "react";
import { FormEvent } from "react";

export default function EditPodcastModal() {
  const [error, setError] = useState<string>("")

  const closeHandler = () => {
    const modal = document.getElementById('EditPodcastModal');
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
    const titleElement = document.getElementById('e-title') as HTMLInputElement;
    let title = titleElement ? titleElement.value : null; 
    let audio = "";
    let cover = "";
    let id = "";
    const elmt = document.getElementById("EditPodcastModal")?.dataset.info;
    if (elmt) {
      id = elmt;
      console.log(elmt)
    } else {
      return setError("Something wrong");
    }

    let audioFile = null;
    let coverFile = null;

    const audioElmt = document.getElementById('e-audio') as HTMLInputElement  ;
    if (audioElmt) {
      const selectedFile = audioElmt.files ? audioElmt.files[0] : null;
      if (selectedFile) {
        audioFile = selectedFile;
        let path = selectedFile.name.replace("C:\\fakepath\\", "");
        const isMp3 = /\.mp3$/i.test(path);
        if (!isMp3) {
          return setError("Please input audio in mp3 format");
        } 
        audio = "audio-" + id + ".mp3";
      } 
    }

    const coverElmt = document.getElementById('e-cover') as HTMLInputElement  ;
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
        cover = "cover-" + id + ".jpg";
      } 
    }

    const dataToUpdate: Record<string, any> = {};
    if (title !== "") {
      dataToUpdate.title = title;
    }

    if (audio !== "") {
      dataToUpdate.audio = audio;
    }

    if (cover !== "") {
      dataToUpdate.picture = cover;
    }

    console.log(dataToUpdate)

    if (Object.keys(dataToUpdate).length > 0) {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        // console.log(data)
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/podcast/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(dataToUpdate)
        });

        if (audioFile !== null) {
          let audioName = "audio-" + id + ".mp3";
          let formData = new FormData();
            audioFile = new File([audioFile], audioName, { type: audioFile.type });
            formData.append('file', audioFile);
  
            const audioResponse = await fetch(`${url}/upload/audio`, {
              method: 'POST',
              body: formData
            });
  
            if (!audioResponse.ok) {
              console.log("Error adding audio");
              // Handle the error if needed
            }
        }

        if (coverFile !== null) {
          let coverName = "cover-" + id + ".jpg";
          let formData = new FormData();
            coverFile = new File([coverFile], coverName, { type: coverFile.type });
            formData.append('file', coverFile);
  
            const coverResponse = await fetch(`${url}/upload/cover`, {
              method: 'POST',
              body: formData
            });
  
            if (!coverResponse.ok) {
              console.log("Error adding cover");
              // Handle the error if needed
            }
        }

        const responseData = await response.json();
        if (response.ok) {
          // close trs tambah card
          console.log("success update podcast")
          if (dataToUpdate.title) {
            const title = document.getElementById(`title-${id}`)
            title && (title.innerText = dataToUpdate.title);
          }
          if (dataToUpdate.picture) {
            const url = import.meta.env.VITE_SERVER_URL;
            const cover = document.getElementById(`cover-${id}`) as HTMLImageElement
            cover && (cover.src = `${url}/cover/${dataToUpdate.picture}`);
            console.log(dataToUpdate.picture)
          }
          closeHandler();
        } else {
          return setError(responseData.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
   <>
    <div className="fixed z-10 w-full h-full bg-black100 bg-opacity-20 backdrop-blur-[1.5px] flex justify-center items-center px-5">

      <div className="w-full max-w-[500px] bg-yellow100 h-fit py-10 px-5 rounded-md flex flex-col">
        <p className="self-center mb-5 text-salmon200 text-lg font-bold">Edit Podcast</p>
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <ul>
            <li className="flex flex-col">
              <label htmlFor="e-title">Title</label>
              <input 
                type="text" 
                name="e-title" 
                id="e-title" 
                className="text-sm mb-3" 
                />
            </li>
            <li className="flex flex-col">
              <label htmlFor="e-audio">Audio</label>
              <input 
                type="file" 
                name="e-audio" 
                id="e-audio" 
                className="text-sm mb-3" 
                />
            </li>
            <li className="flex flex-col">
              <label htmlFor="e-cover">Cover</label>
              <input 
                type="file" 
                name="e-cover" 
                id="e-cover" 
                className="text-sm mb-3"/>
            </li>
          </ul>
          <p id="error" className="text-red100 text-sm">{error}</p>
          <div className="mt-10 self-end">
            <a className="cancel-btn mr-5" onClick={closeHandler}>Cancel</a>
            <button type="submit" className="add-btn">Save</button>
          </div>


        </form>

      </div>
    </div>
   </> 
  )
};
