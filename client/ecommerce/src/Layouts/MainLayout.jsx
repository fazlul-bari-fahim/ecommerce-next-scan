import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartPopup from "../Components/CartPopup";

const MainLayout = () => {

  const [cartPopup, setCartPopup] = useState(false);



  return (
    <div className="flex flex-col w-full">
      <Navbar setCartPopup={setCartPopup} />

      <Outlet />
      {/* CartPopup */}
      <AnimatePresence>
        {
          cartPopup && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="fixed top-2 right-3 z-50 shadow-xl shadow-black"
            >
              <CartPopup setCartPopup={setCartPopup} />
            </motion.div>
          )
        }
      </AnimatePresence>

      <Footer />


    </div>
  )
}

export default MainLayout