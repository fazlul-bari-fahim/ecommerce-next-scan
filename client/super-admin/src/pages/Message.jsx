import bin from "../assets/bin.png"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import contactStore from "../stores/contactStore"

const Message = () => {


    const { getContactRequest, allContact, totalContact, deleteContactRequest } = contactStore();
    const [deletePopup, setDeletePopup] = useState(false);
    const [delete_id, setDelete_id] = useState("");













    const Navigate = useNavigate();




    useEffect(() => {
        const fetchData = async () => {
            try {

                await getContactRequest(10000, 1);

            } catch (error) {
                console.log(error);

            }
        };
        fetchData();
    }, []);


    const handleDelete = async (e) => {


        e.preventDefault();
        const result = await deleteContactRequest(delete_id);

        if (result === true) {
            await getContactRequest(10000, 1);
            setDeletePopup(false)
        }

    }












    return (
        <div className="bg-[#e4e4e4]  max-[426px]:w-105 w-auto min-h-screen flex  justify-center">

            <div className="flex flex-col mt-10 ">

                <div className="flex flex-row justify-between my-3 mx-5">
                    <h1 className="text-xl font-semibold">All Messages:</h1>
                    <div className="text-xl font-semibold flex flex-row gap-3">Total Message:<h3 className="text-lg font-semibold text-green-600">{totalContact}</h3></div>
                </div>
                <table className="bg-white h-auto mb-20 w-270 max-[426px]:w-95 rounded-lg shadow shadow-black  flex gap-5 flex-col px-8 max-[426px]:px-2 py-8 ">

                    <thead>
                        <tr className="flex">
                            <th className="w-30 flex justify-center max-[426px]:hidden">Subject</th>
                            <th className="w-100  flex justify-center max-[426px]:text-[10px] max-[426px]:w-45">Message</th>
                            <th className="w-30  flex justify-center max-[426px]:text-[10px] max-[426px]:w-15">Name</th>
                            <th className="w-30  flex justify-center max-[426px]:text-[10px] max-[426px]:w-20">Phone</th>
                            <th className="w-40 flex  justify-center max-[426px]:hidden">Email</th>
                            <th className="w-20  flex justify-center max-[426px]:text-[10px] max-[426px]:w-10">Manage</th>
                        </tr>
                    </thead>



                    <tbody className="flex flex-col gap-3">

                        {/* 1st */}


                        {
                            allContact?.map((item) => (

                                <tr key={item?._id} className="flex h-auto py-1 justify-center items-center rounded-md bg-gray-200">
                                    <td className="w-30 text-[12px]  font-normal  flex justify-center max-[426px]:hidden">{item?.subject}</td>
                                    <td className="w-100 text-[12px]  font-normal flex justify-center max-[426px]:text-[10px] max-[426px]:w-45">{item?.message}</td>
                                    <td>{item?.last_name}</td>
                                    <td className="w-30 text-[12px] font-normal flex justify-center max-[426px]:text-[10px] max-[426px]:w-20">{item?.phone}</td>
                                    <td className="w-40 text-[12px] font-normal flex justify-center max-[426px]:hidden">{item?.email}</td>
                                    <td><button onClick={() => { setDeletePopup(true), setDelete_id(item?._id) }} className="w-20 text-[12px] font-normal flex justify-center max-[426px]:text-[10px] max-[426px]:w-10 cursor-pointer"><img className="h-4" src={bin}></img></button></td>
                                </tr>

                            ))
                        }



                    </tbody>





                </table>



            </div>

            {/* delete popup */}

            {
                deletePopup && (
                    <form onSubmit={handleDelete} className="fixed bg-black/90   inset-0 flex justify-center items-center">

                        <div className="bg-red-400  h-30 w-80 flex flex-col gap-3 justify-center items-center px-4 py-2 rounded-lg">
                            <h1 className="text-lg font-semibold">Are you sure you want to remove this message ?</h1>
                            <div className="flex flex-row w-full justify-between">
                                <button type="button" onClick={() => { setDeletePopup(false) }} className="bg-[#fe8110] hover:bg-[#c56007] px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">Close</button>
                                <button type="submit" className="bg-[#ff0707] hover:bg-[#8a0202] px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">Delete</button>

                            </div>
                        </div>

                    </form>
                )
            }

        </div >
    )
}

export default Message