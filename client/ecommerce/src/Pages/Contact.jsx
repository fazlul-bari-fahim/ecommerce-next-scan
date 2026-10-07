import { useState } from "react"
import mail from "../assets/envelope.png"
import location from "../assets/location-pin.png"
import time from "../assets/time.png"
import call from "../assets/call.png"
import contactStore from "../Store/ContactStore"
import { useNavigate } from "react-router-dom"



const Contact = () => {


  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setMessage] = useState("");

  const { createContactLoading, createContactRequest } = contactStore();

  const navigate = useNavigate();



  const handelSubmit = async (e) => {
    e.preventDefault();
    const result = await createContactRequest({
      data: {

        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
      }
    })

    if (result === true) {
      navigate("/success-message")
    }

  };







  return (
    <div className="w-full flex justify-center items-center">
      <div className=" py-10 px-20 flex gap-30 max-[1200px]:flex-col max-[1300px]:items-center">

        {/* Left side */}

        <div className=" shadow-2xl w-120 max-[426px]:w-100 max-[376px]:w-90 max-[321px]:w-80 h-120 rounded-2xl ">
          <div className="bg-gray-800 text-white py-4 rounded-t-xl">
            <h2 className=" text-2xl text-center">Get in Touch with us now !</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 max-[321px]:p-2 max-[321px]:text-sm mt-3">
            {/* card-1 */}

            <div className="shadow w-50 max-[426px]:w-40 h-30 rounded-2xl flex flex-col justify-center items-center">
              <img className="h-8" src={call}></img>

              <h2 className="text-xl max-[321px]:text-sm font-semibold">
                Phone Number
              </h2>

              <p className="text-gray-600 mt-2 max-[321px]:text-sm">
                +8801955-443 969
              </p>
            </div>


            {/* card-2 */}


            <div className="shadow w-50 max-[426px]:w-40 h-30 rounded-2xl flex flex-col justify-center items-center">

              <img className="h-8" src={mail}></img>
              <h2 className="text-xl max-[321px]:text-sm font-semibold">
                Gmail
              </h2>

              <p className="text-gray-600 mt-2 max-[321px]:text-sm">
                nlmcrockerys@gmail.com
              </p>
            </div>

            {/* card-3 */}


            <div className="shadow w-50 max-[426px]:w-40 h-30 rounded-2xl flex flex-col justify-center items-center">
              <img className="h-8" src={location}></img>

              <h2 className="text-xl font-semibold max-[321px]:text-sm">
                Location
              </h2>

              <p className="text-gray-600 mt-2 max-[321px]:text-sm px-3 text-center">
                Molibazar trade center,Mitford, Dhaka.
              </p>
            </div>



            {/* card-4 */}

            <div className="shadow w-50 max-[426px]:w-40 h-30 rounded-2xl flex flex-col justify-center items-center">

              <img className="h-8" src={time}></img>
              <h2 className="text-xl font-semibold max-[321px]:text-sm">
                Warking Hours
              </h2>

              <p className="text-gray-600 mt-2 max-[321px]:text-sm">
                9:00AM-6:00 PM
              </p>
            </div>

          </div>
        </div>



        {/* contact form */}
        <form onSubmit={handelSubmit} className=" shadow-2xl rounded-lg w-140 max-[426px]:w-100 max-[376px]:w-90 max-[321px]:w-80 max-[425px]:w-100  ">

          {/* Heading */}
          <div className="bg-gray-800 text-white py-4 rounded-t-xl">
            <h2 className=" text-3xl text-center">Contac Us</h2>
          </div>


          <div className="p-5">
            {/* Name */}
            <div className="grid  grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
                className="border border-gray-300 rounded-lg px-4 py-3 "
              />
              <input
                type="text"
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
                placeholder="Last Name"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Contact */}


          <div className="grid grid-cols-2 p-5 gap-4 w-full ">
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="border border-gray-300 rounded-lg px-4 py-3 "
            />
            <input type="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
              className="w-full  border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>


          <div className="p-5 w-full ">
            <input
              type="text"
              onChange={(e) => setsubject(e.target.value)}
              value={subject}
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 "
            />
          </div>

          <div className="p-5">
            <input type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Write your message..."
              className="w-full h-20 border border-gray-300 rounded-lg px-3" />
            <button type="submit" className="bg-[#1f2736] mt-4 font-bold text-white px-4 py-2 rounded-2xl hover:text-blue-300 cursor-pointer">{createContactLoading ? "Sending... Message" : "Send Message"}</button>
          </div>

        </form>




      </div>
    </div>
  )
}

export default Contact