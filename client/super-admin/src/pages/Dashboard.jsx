import { useEffect } from "react"
import UserStore from "../stores/UserStore";
import InvoiceStore from "../stores/InvoiceStore";
import productStore from "../stores/productStore";
import categoryStore from "../stores/categoryStore";
import brandStore from "../stores/brandStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import { NavLink } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);





const Dashboard = () => {

  const { userGetRequest, userData } = UserStore();
  const { AllInvoiceGetRequest, AllInvoice } = InvoiceStore();
  const { productGetRequest, totalProduct } = productStore();
  const { getAllCategoryRequest, totalCategory } = categoryStore();
  const { getBrandRequest, totalBrand } = brandStore();


  const totalOrders =
    (AllInvoice?.ongoingOrder?.length || 0) +
    (AllInvoice?.successOrder?.length || 0) +
    (AllInvoice?.cancleOrder?.length || 0);


  const successRate = totalOrders
    ? ((AllInvoice?.successOrder?.length || 0) / totalOrders) * 100
    : 0;



  const totalItemsSold =
    AllInvoice?.successOrder?.reduce((total, order) => {
      return (
        total +
        order.product_details.reduce(
          (sum, product) => sum + Number(product.qty),
          0
        )
      );
    }, 0) || 0;



  useEffect(() => {
    const fetchData = async () => {
      try {

        await userGetRequest();
        await AllInvoiceGetRequest();
        await productGetRequest({
          category_id: 0,
          brand_id: 0,
          remark: 0,
          keyword: 0,
          per_page: 500,
          page_no: 1
        });
        await getAllCategoryRequest(500, 1);
        await getBrandRequest(500, 1);

      } catch (error) {
        console.log(error)

      }
    }; fetchData();

  }, []);




  const barData = {
    labels: [
      "Users",
      "Products",
      "Categories",
      "Brands",
    ],
    datasets: [
      {
        label: "Dashboard Statistics",
        data: [
          userData.length,
          totalProduct,
          totalCategory,
          totalBrand,
        ],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };







  const pieData = {
    labels: [
      "New Orders",
      "Success Orders",
      "Cancel Orders",
    ],
    datasets: [
      {
        data: [
          AllInvoice?.ongoingOrder?.length || 0,
          AllInvoice?.successOrder?.length || 0,
          AllInvoice?.cancleOrder?.length || 0,
        ],
        backgroundColor: [
          "#0d542a",
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };



  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };



  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };







  return (
    <div className="bg-[#e4e4e4] w-full max-[426px]:pb-30">
      <div className="py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-7 pb-10">

          <div className="bg-white  rounded-xl shadow-lg p-5 border-5 border-green-800">
            <h2 className="text-2xl font-bold mb-5">
              Dashboard Statistics
            </h2>

            <div className="h-60">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-5 border-green-800">
            <h2 className="text-2xl font-bold mb-5">
              Order Status
            </h2>

            <div className="h-60 flex justify-center items-center">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

        </div>

      </div>


      <div className="max-[1300px]:h-auto min-[1300px]:h-screen w-auto grid max-[550px]:grid-cols-1 max-[800px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-7 px-7 py-7 content-start">
        <NavLink to={"/all-orders"} className="h-30  bg-green-900 border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-4xl font-bold text-white">{AllInvoice?.ongoingOrder?.length + AllInvoice?.successOrder?.length + AllInvoice?.cancleOrder?.length}</p>

          <h1 className="text-xl text-white">Total Order</h1>

        </NavLink>


        <NavLink to={"/all-orders"} className="h-30  bg-green-500 rounded-lg shadow-xl flex flex-col items-center justify-center">


          <p className="text-5xl font-bold text-white">{AllInvoice?.ongoingOrder?.length}</p>

          <h1 className="text-xl text-white">New Order</h1>
        </NavLink>


        <NavLink to={"/all-orders"} className="h-30  bg-yellow-200 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-4xl font-bold text-green-600">{AllInvoice?.successOrder?.length}</p>

          <h1 className="text-xl">Success Order</h1>

        </NavLink>


        <NavLink to={"/all-orders"} className="h-30  bg-red-300 border-3 border-red-600 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-4xl font-bold">{AllInvoice?.cancleOrder?.length}</p>

          <h1 className="text-xl">Cancle Order</h1>

        </NavLink>




        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">  {Number(AllInvoice?.receivedPayment || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}TK</p>


          <h1 className="text-lg">Payment Received</h1>

        </div>


        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <div className="flex gap-2">
            <p className="text-3xl font-bold">  {Number(AllInvoice?.receivedPayment || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}</p>
            <p className="text-3xl font-bold">TK</p>
          </div>


          <h1 className="text-lg">Payment Deu</h1>

        </div>



        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">{totalProduct}</p>


          <h1 className="text-lg">Total Product</h1>

        </div>




        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-4xl font-bold">{userData.length}</p>

          <h1 className="text-xl">Total User</h1>

        </div>



        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">{totalCategory}</p>


          <h1 className="text-lg">Total Category</h1>

        </div>




        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">{totalBrand}</p>


          <h1 className="text-lg">Total Brand</h1>

        </div>



        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">{successRate.toFixed(2)}%</p>


          <h1 className="text-lg">Order Success Rate</h1>

        </div>



        <div className="h-30  bg-white border-3 border-green-800 rounded-lg shadow-xl flex flex-col items-center justify-center">

          <p className="text-3xl font-bold">{totalItemsSold}</p>


          <h1 className="text-lg">Total Items Sold</h1>

        </div>


      </div>

    </div>
  )
}

export default Dashboard