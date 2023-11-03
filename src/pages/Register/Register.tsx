import { ChangeEvent, FormEvent, useState } from "react"

interface FormRegister {
  displayName : string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormRegister> ({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>('');
  // const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});

  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); //clear previous error
    console.log("test")

    if (formData.username.length !== 8) {
      setError('Username must be 8 characters long');
      return;
    }

    // cek username
    if (formData.password !== formData.confirmPassword) {
      setError('Password doesn\'t match');
      return;
    }

    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      displayName: formData.displayName,
    }

    try {
      const url = import.meta.env.SERVER_URL;
      const response = await fetch (`${url}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json(); // Parse the response data
      console.log(responseData); // Log the response data from the server
      if (response.ok) {
        console.log('Registration successful');
      } else {
        setError('Registration failed'); // Handle registration failure
      }
    } catch (error) {
      setError('Api error, registration failed');
    }

  }

  return (
    <>
      <div className="w-screen h-screen bg-blue50 flex flex-row items-center">

        <div className="right-container w-[50%] md:w-full px-10 ">
          <div className="login-container w-full flex flex-col pt-10 text-center rounded-3xl bg-yellow100 min-h-[70vh] shadow-lg">
            <p className="text-3xl text-blue400">Sign Up</p>
            <p className="text-md text-blue300 mb-5">for premium app</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full px-10 pt-5 pb-10" action="">

              <label htmlFor="displayName" className="self-start text-sm px-2 text-blue300">Name</label>
              <input 
                type="text" 
                name = "displayName"
                className="px-5 text-sm py-2 mb-3 rounded-3xl" 
                value={formData.displayName}
                onChange={handleInputChange}
                required/>

              <label htmlFor="username" className="self-start text-sm px-2 text-blue300">Username</label>
              <input 
                type="text"
                name = "username"
                className="px-5 text-sm py-2 mb-3 rounded-3xl" 
                value={formData.username}
                onChange={handleInputChange}
                required/>

              <label htmlFor="email" className="self-start text-sm px-2 text-blue300">Email</label>   
              <input  
                type="email" 
                name = "email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-5 text-sm py-2 mb-3 rounded-3xl" 
                required/>

              <label htmlFor="password" className="self-start text-sm px-2 text-blue300">Password</label>  
              <input 
                type="password" 
                className="px-5 text-sm py-2 mb-3 rounded-3xl" 
                value={formData.password}
                onChange={handleInputChange}
                name = "password"
                required/>

              <label htmlFor="confirmPassword" className="self-start text-sm px-2 text-blue300">Confirm Password</label>
              <input 
                type="password" 
                className="px-5 text-sm py-2 rounded-3xl" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                name = "confirmPassword"
                required/>
               <p className="self-start text-sm px-5 text-red100">{error}</p> 
              <button type="submit" className="btn-var1">Sign Up</button>
            </form>

            <p className="text-sm mb-20">Already have an account?<a href="login" className="text-blue350 hover:text-blue400"> Sign In</a></p>
          </div>
        </div>

        <div className="left-container w-[50%] md:hidden pr-4">
          <img src="image1.svg" alt="" />
        </div>
      </div>
    
    </>
  )
};
