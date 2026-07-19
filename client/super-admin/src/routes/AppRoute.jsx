import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/mainLayout"
import Dashboard from "../pages/Dashboard"
import CreateProduct from "../pages/CreateProduct"
import AllProducts from "../pages/AllProducts"
import Category from "../pages/Category"
import Brand from "../pages/Brand"
import AllOrders from "../pages/AllOrders"
import Profile from "../pages/Profile"
import AdminRegister from "../pages/super-admin/AdminRegister"
import PrivateRoute from "../layouts/privateRoute"
import AdminLogin from "../pages/super-admin/AdminLogin"
import SingleOrderPage from "../pages/SingleOrderPage"
import EditProductPage from "../pages/EditProductPage"

const AppRoute = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
          <Route path="/edit-product/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
          <Route path="/all-products" element={<PrivateRoute><AllProducts /></PrivateRoute>} />
          <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
          <Route path="/brand" element={<PrivateRoute><Brand /></PrivateRoute>} />
          <Route path="/all-orders" element={<PrivateRoute><AllOrders /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/all-orders/single-order/:id" element={<PrivateRoute><SingleOrderPage /></PrivateRoute>} />


        </Route>
        {/* Admin route */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />

      </Routes>
    </div>
  )
}

export default AppRoute