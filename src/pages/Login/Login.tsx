export default function Login() {
  return (
    <>
      <div className="w-screen h-screen bg-blue50 flex flex-row items-center">
        <div className="left-container w-[50%] md:hidden pl-4">
          <img src="public/image1.svg" alt="" />
        </div>


        <div className="right-container w-[50%] md:w-full px-10 ">
          <div className="login-container w-full flex flex-col pt-10 text-center rounded-3xl bg-yellow100 min-h-[70vh] shadow-lg">
            <p className="text-3xl text-blue400">Login</p>
            <p className="text-md text-blue200 mb-5">for premium app</p>
            <form className="flex flex-col w-full h-full px-10 gap-3 pt-5 pb-10" action="">
              <input type="text" placeholder="Username" className="px-5 text-sm py-2 rounded-3xl" required/>
              <input type="password" className="px-5 text-sm py-2 rounded-3xl" placeholder="Password" required/>
              <button type="submit" className="btn-var1">Sign In</button>
            </form>

            <p className="text-sm">New user?<a href="register" className="text-blue350 hover:text-blue400"> Sign up</a></p>
          </div>
        </div>
      </div>
    
    </>
  )
};
