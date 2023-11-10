import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLogin } from "../../interfaces";

export default function Login() {
  const [formData, setFormData] = useState<FormLogin> ({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const data = {
      username: formData.username,
      password: formData.password
    }

    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (response.ok) {
        // navigate("/home")
        console.log(responseData.user.role)
        localStorage.setItem('user', JSON.stringify(responseData.user))
        if (responseData.token) {
          localStorage.setItem('token', responseData.token);
          if (responseData.user.role === "user") {
            navigate('/manage-podcast')
          }

        } else {
          setError("Error token, failed to login");
        }
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      
    }
    
  }

  return (
    <>
      <div className="w-screen h-screen bg-blue50 flex flex-row items-center">
        <div className="left-container w-[50%] md:hidden pl-4">
          <img src="image1.svg" alt="" />
        </div>


        <div className="right-container w-[50%] md:w-full px-10 ">
          <div className="login-container w-full flex flex-col pt-10 text-center rounded-3xl bg-yellow100 min-h-[70vh] shadow-lg">
            <p className="text-3xl text-blue400">Login</p>
            <p className="text-md text-blue200 mb-5">for premium app</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full px-10 pt-5 pb-10" action="">

              <label htmlFor="username" className="self-start text-sm px-2 text-blue300">Username</label>
              <input 
                type="text" 
                name ="username" 
                value = {formData.username}
                onChange={handleInputChange}
                className="px-5 text-sm py-2 rounded-3xl mb-5" 
                required/>

              <label htmlFor="password" className="self-start text-sm px-2 text-blue300">Password</label>
              <input 
                type="password" 
                name= "password"
                value={formData.password}
                onChange={handleInputChange}
                className="px-5 text-sm py-2 rounded-3xl mb-5" 
                required/>

              <p className="self-start text-sm px-5 text-red100 mt-3">{error}</p> 
              <button type="submit" className="btn-var1 mt-5 w-[50%] self-center">Sign In</button>
            </form>

            <p className="text-sm">New user?<a href="register" className="text-blue350 hover:text-blue400"> Sign up</a></p>
          </div>
        </div>
      </div>
    
    </>
  )
};
