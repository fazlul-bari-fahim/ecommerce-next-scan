import mongoose from "mongoose";
import productsModel from "../models/productModel.js";
import HotDealModel from "../models/hotDealModel.js";


const ObjectId = mongoose.Types.ObjectId;


// Create Products
const createProduct = async (req, res) => {


    try {

        const {
            title,
            sub_title,
            service_we_provide,
            features,
            short_description,
            regular_price,
            is_discount,
            discount_price,
            remark,
            stock,
            color,
            size,
            description,
            category_id,
            brand_id,

        } = req.body;





        const big_image = req.files?.big_image?.[0]?.filename;
        const image1 = req.files?.image1?.[0]?.filename;
        const image2 = req.files?.image2?.[0]?.filename;
        const image3 = req.files?.image3?.[0]?.filename;
        const image4 = req.files?.image4?.[0]?.filename;



        if (Number(discount_price) > Number(regular_price)) {
            return res.status(200).json({
                success: false,
                message: "Discount price must be smaller then regular price"
            })
        } else {

            const data = await productsModel.create({

                title,
                sub_title,
                service_we_provide,
                features,
                short_description,
                regular_price,
                is_discount,
                discount_price,
                remark,
                stock,
                color,
                size,
                description,
                category_id,
                brand_id,
                big_image,
                image1,
                image2,
                image3,
                image4




            });
            console.log("Data", data);
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                Data: data,
            })

        }
        ;



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};

// Get All Products


const allProducts = async (req, res) => {
    try {
        const {
            category_id,
            brand_id,
            remark,
            keyword,
            per_page,
            page_no
        } = req.params;








        let matchStage = {};

        // category filter
        if (category_id !== "0" && mongoose.Types.ObjectId.isValid(category_id)) {
            matchStage.category_id = new mongoose.Types.ObjectId(category_id);
        }

        // brand filter
        if (brand_id !== "0" && mongoose.Types.ObjectId.isValid(brand_id)) {
            matchStage.brand_id = new mongoose.Types.ObjectId(brand_id);
        }

        // remark filter
        if (remark !== "0") {
            matchStage.remark = remark;
        }

        // keyword search
        if (keyword !== "0") {
            matchStage.title = { $regex: keyword, $options: "i" };

        }


        const skipRow = (page_no - 1) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = { createdAt: -1 };




        // const facetStage = {
        //     $facet: {
        //         totalCount: [{ $count: "count" }],
        //         products: [

        //             // Category
        //             {
        //                 $lookup: {
        //                     from: "categories",
        //                     localField: "category_id",
        //                     foreignField: "_id",
        //                     as: "category",
        //                 },
        //             },
        //             // Brand
        //             {
        //                 $lookup: {
        //                     from: "brands",
        //                     localField: "brand_id",
        //                     foreignField: "_id",
        //                     as: "brand",
        //                 },

        //             },
        //             {
        //                 $unwind: {
        //                     path: "$category",
        //                     preserveNullAndEmptyArrays: true
        //                 }
        //             },
        //             {
        //                 $unwind: {
        //                     path: "$brand",
        //                     preserveNullAndEmptyArrays: true
        //                 }
        //             },
        //             { $sort: sortStage },
        //             { $skip: skipRow },
        //             { $limit: Number(per_page) },
        //             {
        //                 $project: {
        //                     updatedAt: 0,
        //                     products: 0,
        //                 }
        //             }
        //         ]
        //     }
        // };



        // find(matchStage).skip(skip).limit(limit)



        const pipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand",
                },
            },
            {
                $unwind: {
                    path: "$brand",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    ...(category_id !== "0" &&
                        mongoose.Types.ObjectId.isValid(category_id) && {
                        category_id: new mongoose.Types.ObjectId(category_id),
                    }),

                    ...(brand_id !== "0" &&
                        mongoose.Types.ObjectId.isValid(brand_id) && {
                        brand_id: new mongoose.Types.ObjectId(brand_id),
                    }),

                    ...(remark !== "0" && { remark }),

                    ...(keyword !== "0" && {
                        $or: [
                            { title: { $regex: keyword, $options: "i" } },
                            { sub_title: { $regex: keyword, $options: "i" } },
                            { short_description: { $regex: keyword, $options: "i" } },
                            { description: { $regex: keyword, $options: "i" } },
                            { "brand.brand_name": { $regex: keyword, $options: "i" } },
                            { "category.category_name": { $regex: keyword, $options: "i" } },
                        ],
                    }),
                },
            },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    products: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skipRow },
                        { $limit: Number(per_page) },
                        {
                            $project: {
                                updatedAt: 0,
                            },
                        },
                    ],
                },
            },
        ];


        const data = await productsModel.aggregate(pipeline);

        return res.status(200).json({
            success: true,
            data: data,
            message: "Data Fatched Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString()
        });
    }
};


// search suggestion

const searchSuggestion = async (req, res) => {
    try {
        const { keyword } = req.params;

        if (!keyword || keyword === "0") {
            return res.json({
                success: true,
                data: [],
            });
        }

        const products = await productsModel
            .find({
                title: {
                    $regex: keyword,
                    $options: "i",
                },
            })
            .select("title big_image regular_price discount_price")
            .limit(8);

        res.json({
            success: true,
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Single Products

const singleProducts = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        const matchStage = {
            $match: { _id: id },
        };

        const joinWithCategory = {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
            },
        };


        const joinWithBrand = {
            $lookup: {
                from: "brands",
                localField: "brand_id",
                foreignField: "_id",
                as: "brand",
            },
        };

        const data = await productsModel.aggregate([matchStage, joinWithBrand, joinWithCategory]);

        res.status(200).json({
            success: true,
            message: "Product fatched successfully",
            data: data,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};



// Get Category products

const categoryProducts = async (req, res) => {
    try {
        const id = req.params.id;



        const data = await productsModel.find({ category_id: id });

        res.status(200).json({
            success: true,
            message: "Category Product fatched successfully",
            data: data,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};





// Update Products

const updateProducts = async (req, res) => {


    try {
        const { id } = req.params;


        const {
            title,
            sub_title,
            service_we_provide,
            features,
            category_id,
            brand_id,
            short_description,
            regular_price,
            discount_price,
            size,
            color,
            is_discount,
            remark,
            stock,
            description,

        } = req.body;







        const big_image = req.files?.big_image?.[0]?.filename;
        const image1 = req.files?.image1?.[0]?.filename;
        const image2 = req.files?.image2?.[0]?.filename;
        const image3 = req.files?.image3?.[0]?.filename;
        const image4 = req.files?.image4?.[0]?.filename;


        const product = await productsModel.findById(id);



        const updateData = {
            title,
            sub_title,
            service_we_provide,
            features,
            category_id,
            brand_id,
            short_description,
            regular_price,
            discount_price,
            size,
            color,
            is_discount,
            remark,
            stock,
            description,

            // image 
            big_image: big_image || product.big_image,
            image1: image1 || product.image1,
            image2: image2 || product.image2,
            image3: image3 || product.image3,
            image4: image4 || product.image4,



        };



        if (Number(discount_price) > Number(regular_price)) {
            return res.status(500).json({
                success: false,
                message: "Discount price must be smaller then main price",
            })
        } else {
            const data = await productsModel.findByIdAndUpdate(
                id,
                updateData,
                {
                    returnDocument: "after",
                });
            res.status(200).json({
                success: true,
                message: "Data Updated Successfully",
                NewData: data,
            })
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
}


// Delete Products

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;


        const IshotDeal = await HotDealModel.findOne({ product_id: id });



        // Condtion 
        if (IshotDeal) {

            return res.status(400).json({
                success: false,
                message: "Remove from Hot Deal before deleting"
            })



        }

        await productsModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product Delete Successfully"
        })






    } catch (error) {


        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })
    }
}

const productController = { createProduct, allProducts, searchSuggestion, singleProducts, updateProducts, deleteProduct, categoryProducts };
export default productController;