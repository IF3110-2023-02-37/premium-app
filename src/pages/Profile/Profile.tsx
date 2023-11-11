import DeleteUserModal from "../Components/DeleteUserModal";
import Navbar from "../Components/Navbar"
import {useState, useEffect, ChangeEvent} from 'react';

export default function Profile() {
  const url = import.meta.env.VITE_SERVER_URL
  const userData = localStorage.getItem('user');
  let userObject: any;
  if (userData) {
    userObject = JSON.parse(userData);
    console.log(userObject)
  }
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>(userObject.displayName);
  const [description, setDescription] = useState<string>(userObject.description);

  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName)
    if (modal) {
      modal.style.display = 'block';
    }
  };


  useEffect(() => {
    const display = document.getElementById("displayName") as HTMLInputElement;
    if (display) {
      display.value = displayName; 
    }
  }, [displayName])

  const submitHandler = async () => {
    let picture = "";
    let description = "";

    const pic = document.getElementById("upload-image") as HTMLInputElement
    if (pic) {
      const selectedFile = pic.files ? pic.files[0] : null;
      if (selectedFile) {
        picture = selectedFile.name.replace("C:\\fakepath\\", "");
        const isImage = /\.(png|jpe?g)$/i.test(picture);

        if (!isImage) {
          console.log("Please input cover in png or jpg format");
        } 
        // cover = path;
      } 
    }

    const desc = document.getElementById("bio") as HTMLTextAreaElement
    if (desc) {
      description = desc.value;
      console.log("bio: "  + description)
    }

    const dataToUpdate: Record<string, any> = {};
    if (displayName === "") {
      dataToUpdate.displayName = displayName;
      return setError("Display name must not empty")
    }

    if (picture !== "") {
      dataToUpdate.picture = picture;
      userObject.picture = picture;
    }

    dataToUpdate.description = description;
    userObject.description = description;
    
    dataToUpdate.displayName = displayName;
    userObject.displayName = displayName;

    console.log(dataToUpdate)

    
    if (Object.keys(dataToUpdate).length > 0) {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        // console.log(data)
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/user/update/${userObject.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(dataToUpdate)
        });

        const responseData = await response.json();
        if (response.ok) {
          console.log("success update profile")
          setSuccess("Profile Updated")
          if (dataToUpdate.picture) {
            const url = import.meta.env.VITE_SERVER_URL;
            const frame = document.getElementById(`frame`) as HTMLImageElement
            console.log(dataToUpdate)
            frame.style.backgroundImage = `url(${url}/profile/${dataToUpdate.picture})`;
          }
          
          // Store the updated data back in localStorage
          const updatedUserString = JSON.stringify(userObject);
          userObject = updatedUserString;
          localStorage.removeItem("user");
          localStorage.setItem("user", updatedUserString);

        } else {
          return setError(responseData.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value); // Update displayName state on input change
  };

  const bioChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  return (
    <>
      <Navbar/>
      <div id="DeleteUserModal" className="hidden">
        <DeleteUserModal/>
      </div>
      <div className="bg-blue100 w-full min-h-[100vh] pt-[110px] flex justify-center px-5">
        <div className="max-w-[600px] w-full">
          <div className="flex w-full">
            <label htmlFor="upload-image">
              <div id="frame" className="frame mr-5" style={{ backgroundImage: `url(${url}/profile/${userObject.picture})` }}>
                <div className="edit-button">
                  <p>Edit</p>
                </div>
              </div>
            </label>
            <input type="file" className="input-file hide w-[1px]" name="upload-image" id="upload-image"/>
            <div className="w-full">
              <p className="text-blue400">Display Name</p>

              <input type="text" className=" text-3xl bg-blue100 w-full border-b-2 border-white100 text-white100" id="displayName" onChange={onChangeHandler}/>
              <p className="text-sm pt-2 text-white">{userObject.username}</p>
            </div>
          </div>

          <div className="w-full mt-10">
            <label htmlFor="bio">Your Bio</label>
            <textarea className="resize-none w-full h-[100px] p-2" name="bio" id="bio" onChange={bioChangeHandler} value={description}></textarea>
          </div>
          <div className="flex justify-between my-3 ">
            <button className="hover:text-red100" onClick={() => {openModal("DeleteUserModal")}}>Delete Account?</button>
            <button className="add-btn" onClick={submitHandler}>Save</button>
          </div>
          <p className="text-right px-2 text-red100">{error}</p>
          <p className="text-right px-2 text-blue400">{success}</p>

        </div>
      </div>
    </>
  )
};
 