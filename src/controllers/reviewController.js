import reviewModel from "../models/reviewModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Create Review

const create = async (req, res)=>{
    try {

        const user_id = req.headers._id;
        const {product_id, invoice_id, des, rating} = req.body;

        const data = await reviewModel.updateOne(
            {user_id, product_id, invoice_id},
            {user_id, product_id, invoice_id, des, rating},
            {new:true, upsert:true}
        );
        res.status(200).json({
            success:true,
            message:"Review created successfully",
            Data:data,
        });
        
        
    } catch (error) {
        res.status(500).json({
            success:true,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};


// Get All Review

const getAllReview = async (req,res)=>{
    try {
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);

        const skipRow = (page_no - 1 ) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = {createdAt: -1};

        const joinStageWithUser = {
            $lookup: {
                from: "users",
                localField:"user_id",
                foreignField:"_id",
                as: "user",
            },
        };

         const joinStageWithProduct = {
            $lookup: {
                from: "products",
                localField:"product_id",
                foreignField:"_id",
                as: "product",
            },
        };

        const unwindStageUser = {$unwind: "$user"};         // $unwind array কে ভেঙে এক একটা item আলাদা document বানায়
        const unwindStageProduct = {$unwind: "$product"};


        const projectStage = {
            $project:{
                _id:1,
                invoice_id:1,
                product_id:1,
                user_id:1,
                createdAt:1,
                des:1,
                rating:1,
                "user.cus_name":1,
                "user.email":1,
                "product.title":1,
                "product.images":1,
            },
        };

        const facetStage = {
            $facet: {
                totalCount : [ { $count: "count"}],
                data : [
                    {$sort: sortStage},
                    {$skip: skipRow},
                    {$limit: per_page},
                    joinStageWithUser,
                    joinStageWithProduct,
                    unwindStageUser,
                    unwindStageProduct,
                ]
            }
        };

        const data = await reviewModel.aggregate([facetStage]);
        res.status(200).json({
            success:true,
            message: "Categories fatched successfully",
            Data: data[0],
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};

// Get All review by product

const getAllReviewByProduct = async (req, res)=>{
    try {

        const product_id = new ObjectId(req.params.product_id);
        const matchingStage = {
            $match:{
                product_id,
            }
        };

        const joinWithUser = {
            $lookup:{
                from:"users",
                localField:"user_id",
                foreignField:"_id",
                as:"user",
            },
        };

        const unwindUseStage = {$unwind:"$user"};
        const project = {
            $project:{
                createdAt:1,
                updatedAt:1,
                des:1,
                rating:1,
                "user.cus_name":1,
                "user.email":1,
            }
        };

        const data = await reviewModel.aggregate([
            matchingStage,
            joinWithUser,
            unwindUseStage,
            // project,
        ]);
        res.status(200).json({
            success:true,
            message:"Review fatched successfully",
            Data:data,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
}

const reviewController = {create, getAllReview, getAllReviewByProduct};
export default reviewController;