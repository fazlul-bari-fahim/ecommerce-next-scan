import { NavLink, useNavigate } from "react-router-dom"
import larrow from "../assets/right-arrow.png"
import store from "../assets/car.png"
import help from "../assets/help-web-button.png"


const Contact = () => {


  const navigate = useNavigate();




  return (
    <div className="flex flex-col">

      {/* Page url section */}

      <div className="bg-[#ececec] px-8 max-[321px]:px-5 py-3 flex flex-row gap-2 justify-between items-center my-3">
        <div className="flex flex-row gap-3">
          <NavLink className="font-semibold flex flex-row gap-3 items-center max-[321px]:text-[12px]  " to="/">Home <img className="h-3 w-3 " src={larrow}></img> </NavLink>
          <h5 className="text-gray-500 max-[321px]:text-[12px]">Contact</h5>

        </div>



        <div>
          <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black hover:cursor-pointer flex flex-row items-center gap-2 max-[376px]:text-sm max-[321px]:text-[12px]"><img className="h-3 w-3 rotate-180" src={larrow}></img> Return to Previous Page</button>

        </div>

      </div>

      <div className="flex flex-row mx-5 my-10 gap-10">

        {/* map */}
        <div className="w-150 h-110 border-2 max-[426px]:hidden">
          <iframe

            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.956025477763!2d90.38296581058205!3d23.73870057858942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c78b718c03%3A0x85f0047e17dda266!2sMultiplan%20Computer%20City%20Center%2C%20341%20New%20Elephant%20Rd%2C%20Dhaka%201205!5e1!3m2!1sen!2sbd!4v1780558434604!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


        {/* Message */}
        <div className="flex flex-col gap-5 w-150">
          <h3 className="text-3xl font-semibold">Send Message</h3>
          <input placeholder="Enter your Name" className="border-2 px-3 py-1 border-black/40 h-10 " type="text" />
          <input placeholder="Enter your Phone Number" className="border-2 px-3 py-1 border-black/40 h-10" type="text" />
          <input placeholder="Enter your email" className="border-2 px-3 py-1 border-black/40 h-10" type="text" />

          <textarea placeholder="Type your message" className="border-2 px-3 py-2 border-black/40 h-80" type="text" />
          <button className="bg-black py-2  w-30 text-white font-semibold hover:cursor-pointer">Submit</button>
        </div>




      </div>



      <div className="my-10 px-5">
        {/* info */}
        <div className="grid grid-cols-3 max-[675px]:grid-cols-1 items-center justify-between gap-8">

          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5"><img className="h-10" src={store}></img><h1 className="text-2xl font-semibold">Our Showroom</h1></div>
            <h3 className="text-lg max-[1025px]:text-sm">215 Multiplan, Elephent Road, Dhaka</h3>
            <h3 className="text-lg">+8801453-526 120</h3>
          </div>



          <div className="flex flex-col gap-3  w-80">
            <div className="flex flex-row gap-5"><img className="h-10" src={help}></img><h1 className="text-2xl font-semibold">Quick Help</h1></div>
            <h3 className="text-lg max-[1025px]:text-sm w-70">You can ask anything you want to know about our products</h3>
            <div className="flex flex-row gap-3">
              <h3 className="font-semibold">Email:</h3> <h3 className="text-lg">contact@gocart.com</h3>
            </div>
          </div>



          <div className="flex flex-col gap-3 w-80">
            <div className="flex flex-row gap-5"><img className="h-10" src={help}></img><h1 className="text-2xl font-semibold">Call Us</h1></div>
            <h3 className="text-lg max-[1025px]:text-sm">Call Our tem Sat-Thus  from 8am to 10pm</h3>
            <div className="flex flex-row gap-3">
              <h3 className="font-semibold">Phone:</h3> <h3 className="text-lg">+880135-458-3489</h3>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact