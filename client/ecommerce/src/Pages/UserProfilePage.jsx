import { useEffect, useState } from "react";
import UserStore from "../Store/UserStore"


const UserProfilePage = () => {

    const { userUpdateLoading, userUpdateRequest, userGetRequest, userData } = UserStore();


    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [city, setcity] = useState("");
    const [phone, setphone] = useState("");
    const [post_Code, setpost_Code] = useState("");
    const [address, setaddress] = useState("");
    const [state, setstate] = useState("");
    const [password, setpassword] = useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await userUpdateRequest({
                first_name: first_name,
                last_name: last_name,
                city: city,
                phone: phone,
                address: address,
                post_Code: post_Code,
                state: state,
                password: password,

            });

            if (result) {
                await userGetRequest()
            }






        } catch (error) {
            console.log(error)

        }
    };




    useEffect(() => {
        const fetchData = async () => {
            try {

                await userGetRequest();




            } catch (error) {
                console.log(error);
            }
        }; fetchData();
    }, []);



    useEffect(() => {
        if (userData) {
            const data = () => {
                setfirst_name(userData.first_name || "");
                setlast_name(userData.last_name || "");
                setphone(userData.phone || "");
                setcity(userData.city || "");
                setstate(userData.state || "");
                setaddress(userData.address || "");
                setpost_Code(userData.post_Code || "");
            };
            data();
        }
    }, [userData]);



    return (
        <div className="w-full flex flex-col">
            <div className="px-10 max-[1025px]:px-3 py-5 border-b-2 border-gray-300 w-full ">
                <h1 className="text-2xl font-semibold">Customer Information</h1>
            </div>
            <div className="flex max-[1100px]:flex-col gap-10 px-10 max-[1025px]:px-3 py-5">


                {/* User Information */}


                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">User Information</h1>
                    <div className="w-80 h-auto my-5 gap-3 shadow-md bg-gray-300/50 rounded-lg flex flex-col px-5 py-8">
                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">First Name</h3>
                            <h3 className="text-gray-700">{userData?.first_name}</h3>
                        </div>


                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">Last Name</h3>
                            <h3 className="text-gray-700">{userData?.last_name}</h3>
                        </div>


                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">Phone:</h3>
                            <h3 className="text-gray-700">{userData?.phone}</h3>
                        </div>

                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">Email:</h3>
                            <h3 className="text-gray-700">{userData?.email}</h3>
                        </div>
                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">Division:</h3>
                            <h3 className="text-gray-700">{userData?.state}</h3>
                        </div>


                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">City:</h3>
                            <h3 className="text-gray-700">{userData?.city}</h3>
                        </div>

                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">Address:</h3>
                            <h3 className="text-gray-700">{userData?.address}</h3>
                        </div>

                        <div className="flex gap-3 border-b-2 border-gray-400 px-2 pb-1">
                            <h3 className="font-semibold">ZIP Code:</h3>
                            <h3 className="text-gray-700">{userData?.post_Code}</h3>
                        </div>
                    </div>
                </div>


                {/* User Information */}
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Change User Information</h1>
                    <form onSubmit={handleSubmit} className="w-180 max-[835px]:w-120 max-[1025px]:w-150 h-auto my-5 gap-3 shadow-md bg-gray-300/50 rounded-lg flex flex-col justify-center items-center px-5 py-8">

                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="first_name" className="font-semibold text-xl w-30">First Name:</label>
                            <input placeholder="MR. Saidur" id="first_name" value={first_name} onChange={(e) => setfirst_name(e.target.value)} type="text" className="text-gray-700   w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>

                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="last_name" className="font-semibold text-xl w-30">Last Name:</label>
                            <input placeholder="Rahman" type="text" id="last_name" value={last_name} onChange={(e) => setlast_name(e.target.value)} className="text-gray-700  w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>


                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="phone" className="font-semibold text-xl w-30">Phone:</label>
                            <input placeholder="013XXXXXXXX" type="text" id="phone" value={phone} onChange={(e) => setphone(e.target.value)} className="text-gray-700 w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>



                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="state" className="font-semibold text-xl w-30">Division:</label>
                            <select placeholder="Dhaka Division" id="state" value={state} onChange={(e) => setstate(e.target.value)} className="text-gray-700 w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" >

                                <option value="">--Select Division--</option>
                                <option value="Dhaka">Dhaka Division</option>
                                <option value="Chattogram">Chattogram Division</option>
                                <option value="Rajshahi">Rajshahi Division</option>
                                <option value="Khulna">Khulna Division</option>
                                <option value="Barishal">Barishal Division</option>
                                <option value="Sylhet">Sylhet Division</option>
                                <option value="Rangpur">Rangpur Division</option>
                                <option value="Mymensingh">Mymensingh Division</option>


                            </select>
                        </div>



                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="city" className="font-semibold text-xl w-30">City:</label>
                            <select placeholder="Dhaka" id="city" value={city} onChange={(e) => setcity(e.target.value)} className="text-gray-700 w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3 cursor-pointer" >
                                <option value="">--Select City--</option>
                                <option value="Bagerhat">Bagerhat</option>
                                <option value="Bandarban">Bandarban</option>
                                <option value="Barguna">Barguna</option>
                                <option value="Barishal">Barishal</option>
                                <option value="Bhola">Bhola</option>
                                <option value="Bogura">Bogura</option>
                                <option value="Brahmanbaria">Brahmanbaria</option>
                                <option value="Chandpur">Chandpur</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Chuadanga">Chuadanga</option>
                                <option value="Cox's Bazar">Cox's Bazar</option>
                                <option value="Cumilla">Cumilla</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Dinajpur">Dinajpur</option>
                                <option value="Faridpur">Faridpur</option>
                                <option value="Feni">Feni</option>
                                <option value="Gaibandha">Gaibandha</option>
                                <option value="Gazipur">Gazipur</option>
                                <option value="Gopalganj">Gopalganj</option>
                                <option value="Habiganj">Habiganj</option>
                                <option value="Jamalpur">Jamalpur</option>
                                <option value="Jashore">Jashore</option>
                                <option value="Jhalokathi">Jhalokathi</option>
                                <option value="Jhenaidah">Jhenaidah</option>
                                <option value="Joypurhat">Joypurhat</option>
                                <option value="Khagrachhari">Khagrachhari</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Kishoreganj">Kishoreganj</option>
                                <option value="Kurigram">Kurigram</option>
                                <option value="Kushtia">Kushtia</option>
                                <option value="Lakshmipur">Lakshmipur</option>
                                <option value="Lalmonirhat">Lalmonirhat</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Magura">Magura</option>
                                <option value="Manikganj">Manikganj</option>
                                <option value="Meherpur">Meherpur</option>
                                <option value="Moulvibazar">Moulvibazar</option>
                                <option value="Munshiganj">Munshiganj</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Naogaon">Naogaon</option>
                                <option value="Narail">Narail</option>
                                <option value="Narayanganj">Narayanganj</option>
                                <option value="Narsingdi">Narsingdi</option>
                                <option value="Natore">Natore</option>
                                <option value="Netrokona">Netrokona</option>
                                <option value="Nilphamari">Nilphamari</option>
                                <option value="Noakhali">Noakhali</option>
                                <option value="Pabna">Pabna</option>

                                <option value="Panchagarh">Panchagarh</option>
                                <option value="Patuakhali">Patuakhali</option>
                                <option value="Pirojpur">Pirojpur</option>
                                <option value="Rajbari">Rajbari</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Rangamati">Rangamati</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Satkhira">Satkhira</option>
                                <option value="Shariatpur">Shariatpur</option>
                                <option value="Sherpur">Sherpur</option>
                                <option value="Sirajganj">Sirajganj</option>
                                <option value="Sunamganj">Sunamganj</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Tangail">Tangail</option>
                                <option value="Thakurgaon">Thakurgaon</option>


                            </select>



                        </div>


                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="address" className="font-semibold text-xl w-30">Address:</label>
                            <input placeholder="House-5, Road-3, Sector-4" type="text" id="address" value={address} onChange={(e) => setaddress(e.target.value)} className="text-gray-700 w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>



                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="post_Code" className="font-semibold text-xl w-30">Post code:</label>
                            <input placeholder="1200" type="text" id="post_Code" value={post_Code} onChange={(e) => setpost_Code(e.target.value)} className="text-gray-700 w-100 max-[835px]:w-80 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>




                        <div className="flex gap-3 px-2 pb-1 items-center">
                            <label htmlFor="password" className="font-semibold text-xl w-30">Password:</label>
                            <input placeholder="ask#8@!3^*" type="password" id="password" value={password} onChange={(e) => setpassword(e.target.value)} className="text-gray-700 max-[835px]:w-80 w-100 border-2 border-gray-400/80 rounded-2xl focus:outline-0 py-2 px-3" />
                        </div>

                        <button type="submit" className="bg-amber-500 w-140 max-[835px]:w-120 text-xl py-1 text-white mt-2 shadow-md cursor-pointer transition-all active:scale-95 duration-200">{userUpdateLoading ? "Updateing..." : "Update"}</button>


                    </form>
                </div>



            </div>



        </div>
    )
}

export default UserProfilePage