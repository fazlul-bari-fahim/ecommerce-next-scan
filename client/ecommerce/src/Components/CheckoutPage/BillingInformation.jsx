import { useEffect, useState } from "react";

const BillingInformation = ({ setBillingInfo }) => {






    const [billfirst_name, setbillfirst_name] = useState("");
    const [billlast_name, setbilllast_name] = useState("");
    const [billphone, setbillphone] = useState("");
    const [billaddress, setbilladdress] = useState("");
    const [billdivision, setbilldivision] = useState("");
    const [billcity, setbillcity] = useState("");
    const [billzip, setbillzip] = useState("");



    useEffect(() => {
        setBillingInfo(
            {
                BillFirstName: billfirst_name,
                BillLastName: billlast_name,
                BillPhone: billphone,
                BillAddress: billaddress,
                BillDivision: billdivision,
                BillCity: billcity,
                BillZip: billzip
            },


        )
    }, [
        billfirst_name,
        billlast_name,
        billphone,
        billaddress,
        billdivision,
        billcity,
        billzip

    ]);










    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-lg max-[850px]:w-80 max-[426px]:w-100 font-semibold mt-5 border-b pb-2">Shipping Information</h1>

            <div className="flex justify-between pr-10 max-[426px]:pr-0 max-[426px]:w-100 ">
                <div className="flex flex-col gap-1">

                    <label htmlFor="billfirst_name" className="text-lg flex font-semibold text-black/50">First Name <p className="text-red-800 text-xl">*</p></label>

                    <input type="text" vlue={billfirst_name} id="BillFirstName" onChange={(e) => setbillfirst_name(e.target.value)} placeholder="Enter your first name" className="w-45 max-[850px]:w-35 max-[426px]:w-45 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                </div>




                <div className="flex flex-col gap-1">

                    <label htmlFor="billlast_name" className="text-lg flex font-semibold text-black/50">Last Name <p className="text-red-800 text-xl">*</p></label>

                    <input type="text" value={billlast_name} onChange={(e) => setbilllast_name(e.target.value)} placeholder="Enter your last name" className="w-45 max-[850px]:w-35 max-[426px]:w-45 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                </div>
            </div>




            <div className="flex flex-col gap-1">

                <label htmlFor="billphone" className="text-lg flex font-semibold text-black/50">Phone Number<p className="text-red-800 text-xl">*</p></label>

                <input type="text" id="billphone" value={billphone} onChange={(e) => setbillphone(e.target.value)} placeholder="Enter your Phone Number" className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
            </div>

            <div className="flex flex-col gap-1">

                <label htmlFor="billaddress" className="text-lg flex font-semibold text-black/50">Full Address<p className="text-red-800 text-xl">*</p></label>

                <input type="text" value={billaddress} id="billaddress" onChange={(e) => setbilladdress(e.target.value)} placeholder="Enter your full Address" className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
            </div>

            <div className="flex flex-col gap-1">

                <label htmlFor="billdivision" className="text-lg flex font-semibold text-black/50">Division</label>

                <select value={billdivision} id="billdivision" onChange={(e) => setbilldivision(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-10 px-2 py-2 cursor-pointer border-2 border-black/20 focus:outline-0" >
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


            <div className="flex flex-col gap-1">

                <label htmlFor="billcity" className="text-lg flex font-semibold text-black/50">City</label>

                <select value={billcity} id="billcity" onChange={(e) => setbillcity(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-10 px-2 cursor-pointer py-2 border-2 border-black/20 focus:outline-0" >
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




            <div className="flex flex-col gap-1">

                <label htmlFor="billzip" id="billzip" className="text-lg flex font-semibold text-black/50">Zip-code</label>

                <input value={billzip} onChange={(e) => setbillzip(e.target.value)} type="text" placeholder="Enter your Area post/Zip code" className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
            </div>
        </div>
    )
}

export default BillingInformation