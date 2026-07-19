import brandModel from "../models/brandModel.js";
import categoryModel from "../models/categoryModel.js";
import paymentModel from "../models/invoiceModel.js";
import invoiceModel from "../models/invoiceProuctModel.js";
import productsModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js"

const dashboardController = async (req, res)=>{
    try {
        // Count Documents
        const totalUser = await userModel.countDocuments();
        const totalOrder = await paymentModel.countDocuments();
        const totalProduct = await productsModel.countDocuments();
        const totalBrand = await brandModel.countDocuments();
        const totalCategory = await categoryModel.countDocuments();
        const totalReview = await reviewModel.countDocuments();


        // Filtered Counts
        const pendingDeliver = await paymentModel.countDocuments({
            deliver_status:"pending",
        });
        const deliveredOrders = await paymentModel.countDocuments({
            deliver_status:"delivered",
        });
        const canceledOrders = await paymentModel.countDocuments({
            deliver_status:"cancle",
        });

        // total income from successfull payments
        const totalIncomeAgg = await paymentModel.aggregate([
            {$match:{payment_status:"success"}},
            {$group:{_id:null, total:{$sum:"$payable"}}},
        ]);

        const totalIncome = totalIncomeAgg.length > 0 ? totalIncomeAgg[0].total:0;

        res.status(200).json({
            success:true,
            message:"Dashboard summay fatched successfully",
            data:{
                totalUser,
                totalProduct,
                totalOrder,
                totalIncome,
                pendingDeliver,
                deliveredOrders,
                canceledOrders,
                totalBrand,
                totalCategory,
                totalReview,

            }
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};


export default dashboardController;