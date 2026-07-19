import laptop from "../../assets/AllProductPage/laptop.png"



const LaptopDeal = () => {
    return (
        <div>

            <div className="relative  bg-red-800 w-auto h-auto my-14 mx-8 max-[1025px]:w-250 max-[770px]:w-190 max-[426px]:w-100 max-[376px]:w-90 max-[321px]:w-80  max-[426px]:mx-1 px-40 max-[770px]:px-20 max-[426px]:px-2 flex flex-col gap-12 py-15 rounded-2xl max-[1025px]:rounded-sm">


                <div className="flex flex-col gap-5 px-10 max-[770px]:px-0 max-[376px]:px-3 ">
                    <div className="flex flex-col gap-3">

                        <h3 className="text-white text-md max-[426px]:text-sm">Find the right laptop for you.</h3>
                        <h1 className="text-white text-4xl max-[426px]:text-xl">Power Meets Performance</h1>

                    </div>




                    <div className="flex flex-row gap-5">
                        <div>
                            <h3 className="text-black text-lg">Now on Sale</h3>
                            <h2 className="text-black text-4xl font-semibold">45% Flat</h2>

                        </div>
                        <button className="bg-white text-black px-4 py-2 max-h-12 cursor-pointer rounded-md font-semibold mt-5">Shop Now</button>
                    </div>
                </div>

                <img className="h-100 w-100 absolute -top-10 left-160 max-[770px]:left-90   drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] max-[426px]:hidden" src={laptop}></img>

            </div>
        </div>
    )
}

export default LaptopDeal