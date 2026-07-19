import comment from "../../assets/comment.png"
import ratting from "../../assets/rating5.png"




const Review = () => {
    return (
        <div className="w-full h-auto bg-red-600 px-10 py-15 flex flex-col gap-3 justify-center items-center">

            <h3 className="text-xl text-white max-[321px]:text-sm">What Clients are Saying</h3>
            <h1 className="text-4xl font-bold text-center text-white max-[321px]:text-lg">We Value Each of Our Customers</h1>



            <div className=" w-full h-auto grid grid-cols-3 gap-y-10 mt-10 max-[770px]:grid-cols-2 max-[426px]:grid-cols-1">

                {/* Review */}
                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>



                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>



                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Amazing drone! The camera quality is outstanding, and the flight controls are incredibly smooth. Perfect for capturing aerial footage.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">James R.</h4>
                </div>






















            </div>

            {/* <div className="flex flex-col justify-start  w-full ">
                <form className="flex flex-col w-100 max-[426px]:w-80 max-[321px]:w-60 gap-5">
                    <h3 className="text-2xl text-white">Give a review</h3>
                    <input type="text" placeholder="Your name here" className="bg-white h-8 w-auto px-3 shadow-inner shadow-black/40" />
                    <textarea type="text" rows={8} cols={20} placeholder="Your Comment here" className="bg-white  px-3 py-3 shadow-inner shadow-black/40" />
                    <button className="bg-black py-1 rounded-sm border border-black/70 cursor-pointer font-semibold hover:bg-gray-900 text-white transition-all active:scale-75 duration-500">Submit</button>

                </form>

            </div> */}





        </div>
    )
}

export default Review