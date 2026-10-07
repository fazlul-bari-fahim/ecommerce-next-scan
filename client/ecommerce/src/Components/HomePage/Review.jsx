import comment from "../../assets/comment.png"
import ratting from "../../assets/rating5.png"




const Review = () => {
    return (
        <div className="w-full h-auto bg-[#1f2736] px-10 py-15 flex flex-col gap-3 justify-center items-center">

            <h3 className="text-xl text-white max-[321px]:text-sm">What Clients are Saying</h3>
            <h1 className="text-4xl font-bold text-center text-white max-[321px]:text-lg">We Value Each of Our Customers</h1>



            <div className=" w-full h-auto grid grid-cols-3 gap-y-10 mt-10 max-[770px]:grid-cols-2 max-[426px]:grid-cols-1">

                {/* Review */}
                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">This is a very high quality product...best products in affordable price ❤️ e product gulo khub fresh and modern dekhle bujha  jacche...
                        The glass quality is quite good,and it gives confidence during use!!!! ❤️❤️</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Sultana Akter</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">বেস্ট প্রোডাক্ট আমি ইউজ করেছি । এবং মানসম্মত প্রোডাক্ট ব্যবহার করার পর বুজা যায় যে ভালো নাকি আমি satisfaction</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Antara Akter</h4>
                </div>



                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">best product. ami peye onk happy product ta jmn dekhsi temon e peyechi.</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Zaara Islam</h4>
                </div>



                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">good product, fast service</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Walid Hasan Ratul</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">it was good. and i'm satisfied to used it</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Orruk Hossain</h4>
                </div>


                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Loved the products qualities. Worth it</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Musfika Afrin</h4>
                </div>



                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Product gulo onk valo, picture a jemon dewa same product e peyachi,</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Lamia Afrin</h4>
                </div>




                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">best product ami niyechi ammu onk pochondo korsen dhonnobad nlm crockreys</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Lamia Afrin</h4>
                </div>




                <div className="bg-gray-50 w-100 max-[770px]:w-80 max-[321px]:w-60  h-120  justify-center items-center px-10 py-4 rounded-md shadow shadow-black/30 flex flex-col gap-3">
                    <img src={comment}></img>
                    <h2 className="text-md text-gray-700 text-center max-[321px]:text-sm">Absolutely good page everyone should visit this page the products are amazing</h2>
                    <img className="h-5" src={ratting}></img>
                    <h4 className="text-lg font-bold">Someone</h4>
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