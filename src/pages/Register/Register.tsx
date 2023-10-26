export default function Register() {
  return (
    <>
      <div className="w-screen h-screen bg-blue50 flex flex-row items-center">

        <div className="right-container w-[50%] md:w-full px-10 ">
          <div className="login-container w-full flex flex-col pt-10 text-center rounded-3xl bg-yellow100 min-h-[70vh] shadow-lg">
            <p className="text-3xl text-blue400">Sign Up</p>
            <p className="text-md text-blue200 mb-5">for premium app</p>
            <form className="flex flex-col w-full h-full px-10 gap-3 pt-5 pb-10" action="">
              <input type="text" placeholder="Name" className="px-5 text-sm py-2 rounded-3xl" required/>
              <input type="text" placeholder="Username" className="px-5 text-sm py-2 rounded-3xl" required/>
              <input type="email" placeholder="Email" className="px-5 text-sm py-2 rounded-3xl" required/>
              <input type="password" className="px-5 text-sm py-2 rounded-3xl" placeholder="Password" required/>
              <input type="password" className="px-5 text-sm py-2 rounded-3xl" placeholder="Confirm Password" required/>
              <button type="submit" className="btn-var1">Sign Up</button>
            </form>

            <p className="text-sm mb-20">Already have an account?<a href="login" className="text-blue350 hover:text-blue400"> Sign In</a></p>
          </div>
        </div>

        <div className="left-container w-[50%] md:hidden pr-4">
          <img src="public/image1.svg" alt="" />
        </div>
      </div>
    
    </>
  )
};
