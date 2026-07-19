import HotDealModel from "../models/hotDealModel.js";
import productsModel from "../models/productModel.js";



const create = async (req, res) => {
    try {

        // Check total hot deals
        const totalHotDeals = await HotDealModel.countDocuments();

        const product_id = req.body.data;


        console.log(totalHotDeals);
        if (totalHotDeals <= 3) {


            const data = await HotDealModel.create({ product_id });


            return res.status(200).json({
                success: true,
                message: "Product Add to Hot Deal",
                Data: data,
            })

        } else {
            return res.status(400).json({
                success: false,
                message: "Maximum 4 products are allowed"
            })
        }



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });



    }

};



const get = async (req, res) => {

    try {

        const data = await HotDealModel.find();



        // Product ID
        const firstproductId = data?.[0]?.product_id;
        const secondproductId = data?.[1]?.product_id;
        const thirdproductId = data?.[2]?.product_id;
        const fourthproductId = data?.[3]?.product_id;


        // Products
        const firstproduct = await productsModel.find({ _id: firstproductId });
        const secondeproduct = await productsModel.find({ _id: secondproductId });
        const thirdproduct = await productsModel.find({ _id: thirdproductId });
        const forthproduct = await productsModel.find({ _id: fourthproductId });




        return res.status(200).json({
            success: true,
            message: "Hot Deal Fatched",
            Data: data,
            AllData: [
                firstproduct,
                secondeproduct,
                thirdproduct,
                forthproduct


            ]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });


    }

};





const HotDealdelete = async (req, res) => {

    try {
        const productid = req.params.id;




        const Data = await HotDealModel.find({ product_id: productid });
        const hotDealId = Data?.[0]?._id.toString();

        const data = await HotDealModel.findByIdAndDelete(hotDealId);



        return res.status(200).json({
            success: true,
            message: "Hot Deal Removed",
            Data: data,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });


    }

}



const HotDealController = { create, get, HotDealdelete };
export default HotDealController;