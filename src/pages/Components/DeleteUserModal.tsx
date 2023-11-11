import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteUserModal() {
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const userData = localStorage.getItem('user');
  const navigate = useNavigate();
  let userObject: any;
  if (userData) {
    userObject = JSON.parse(userData);
    
  }

  const deleteHandler = async () => {
    console.log(confirm);
    if (confirm === "DELETE") {
      setConfirm("");
      console.log(userObject)
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/user/delete/${userObject.username}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (response.ok) {
          // close trs tambah card
          console.log("success delete user");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
          navigate("/login");
        } 
      
      } catch (error) {
        console.log(error)
      }
    } else {
      setError("Confirmation failed");
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(""); // Clear the error when the user starts typing
    setConfirm(event.target.value);
  };

  const closeHandler = () => {
    setError("");
    const confirm = document.getElementById("confirm") as HTMLInputElement;
    if (confirm) {
      confirm.value = ""
    }
    const modal = document.getElementById('DeleteUserModal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  return (
    <>
      <div className="fixed z-10 w-full h-full bg-black100 bg-opacity-20 backdrop-blur-[1.5px] flex justify-center items-center px-5">
        <div className="w-full max-w-[400px] bg-yellow100 h-fit py-10 px-5 rounded-md flex flex-col">
          <p className="text-center mb-3">Are you sure you want to permanently delete this account?</p>
          <form className="flex flex-col">
            <label htmlFor="confirm" className="text-sm">Type "DELETE"</label>
            <input type="text" name="confirm" id="confirm" onChange={onChangeHandler} />
            <p className="text-red100 mt-1">{error}</p>
            <div className="flex mt-3 self-center">
              <a className="cancel-btn mr-5" onClick={closeHandler}>Cancel</a>
              <button className="add-btn" type="button" onClick={deleteHandler}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
