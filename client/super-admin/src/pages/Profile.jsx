
const Profile = () => {
  return (
    <div className="bg-[#e4e4e4] min-h-screen flex  pt-20 flex-col items-center gap-10">


      {/* Create  */}
      <div className="h-80 max-[426px]:h-100 w-150 max-[849px]:w-130 max-[426px]:w-80  bg-white rounded-lg shadow-xl flex flex-col items-center justify-center py-7">

        <h1 className="text-xl font-bold py-5 max-[849px]:text-sm">Change your Email & Password</h1>
        <form className="flex flex-col gap-10">
          <div className="flex max-[426px]:flex-col  gap-2">
            <label className="text-2xl max-[426px]:text-lg">Email:</label>
            <input className="border-2 border-black/80 rounded-md px-2 py-1 w-78 max-[426px]:w-65" type="text" />

          </div>

          <div className="flex max-[426px]:flex-col gap-2">
            <label className="text-2xl">Password:</label>
            <input className="border flex justify-center items-center px-2 py-1 rounded-md w-68 " type="password" />

          </div>
          <button className="text-xl bg-black text-white font-bold shadow shadow-black/40 hover:cursor-pointer py-2 rounded-md hover:bg-gray-900 transition-all active:scale-90 duration-300">Update</button>


        </form>
      </div>














    </div>
  )
}

export default Profile