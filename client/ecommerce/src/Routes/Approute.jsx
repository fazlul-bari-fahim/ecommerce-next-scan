import { Route, Routes } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout.jsx"
import HomePage from "../Pages/HomePage.jsx"
import AllProducts from "../Pages/AllProducts.jsx"
import Contact from "../Pages/Contact.jsx"
import SingleProductPage from "../Pages/SingleProductPage.jsx"
import CheckoutPage from "../Pages/CheckoutPage.jsx"
import ThankYouPage from "../Pages/ThankYouPage.jsx"
import UserProfilePage from "../Pages/UserProfilePage.jsx"
import UserRegister from "../Pages/UserRegister.jsx"
import UserLogin from "../Pages/UserLogin.jsx"
import UserLayout from "../Layouts/UserLayout.jsx"
import AllOrderPage from "../Pages/AllOrderPage.jsx"
import PrivateRoute from "../Layouts/PrivateRoute.jsx"
import Invoice from "../Pages/Invoice.jsx"
import CategoryProductPage from "../Pages/CategoryProductPage.jsx"




const Approute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/single-products/:id" element={<SingleProductPage />} />
          <Route path="/category-products/:id" element={<CategoryProductPage />} />

        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />


        <Route path="/dashboard-profile" element={<UserLayout />}>

          <Route index element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="all-orders" element={<PrivateRoute><AllOrderPage /></PrivateRoute>} />
          <Route path="/dashboard-profile/invoice/:id" element={<PrivateRoute><Invoice /></PrivateRoute>} />
        </Route>


        <Route path="/dashboard-profile/register" element={<UserRegister />} />
        <Route path="/dashboard-profile/login" element={<UserLogin />} />
      </Routes>
    </div>
  )
}

export default Approute