import mongoose from "mongoose";
import productsModel from "../models/productModel.js";


const ObjectId = mongoose.Types.ObjectId;


// Create Products
const createProduct = async (req, res) => {
    try {

        let {
            pro_title,
            pro_sub_title,
            pro_details,
            pro_parent_category_id,
            pro_child_category_id,
            pro_stock,
            pro_color,
            pro_image_type,
            group_images_price,
            pro_price_type,
            pro_size,
            regular_price,
            offer_price,
            group_prices,
            support_services,
            terms_conditions,
            shipping,




        } = req.body;


        const product_images = req?.files?.product_images || [];
        const imageNames = product_images.map((image) => image.filename);


        const group_images = req?.files?.group_images || [];
        const groupimageNames = group_images.map((image) => image.filename);


        // images group price parseing
        if (typeof group_images_price === "string") {
            try {
                group_images_price = JSON.parse(group_images_price);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group_images_price format",
                });
            }
        }

        if (Array.isArray(group_images_price)) {
            group_images_price = group_images_price.map(
                (item) => item.price
            );
        }


        // group price parsing

        if (typeof group_prices === "string") {
            try {
                group_prices = JSON.parse(group_prices);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group_prices format",
                });
            }
        }


        if (Array.isArray(group_prices)) {
            group_prices = group_prices.map((item) => ({
                size: item.size,
                price: Number(item.price),
            }));
        }


        if (Number(regular_price) < Number(offer_price)) {
            return res.status(500).json({
                success: false,
                message: "Offer price must be less than or equal to the regular price.",

            })
        }




        const data = await productsModel.create({

            pro_title,
            pro_sub_title,
            pro_details,
            pro_parent_category_id,
            pro_child_category_id,
            pro_stock,
            pro_color,
            pro_image_type,
            product_images,
            product_images: imageNames,
            group_images: groupimageNames,
            group_images_price,
            pro_price_type,
            pro_size,
            regular_price,
            offer_price,
            group_prices,
            support_services,
            terms_conditions,
            shipping


        });


        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            Data: data,
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// Get All Products


// =====================================================
// GET ALL PRODUCTS
// =====================================================

const allProducts = async (req, res) => {
    try {
        const {
            category_id,
            remark,
            keyword,
            per_page,
            page_no,
            from_price,
            to_price,
        } = req.params;

        // =====================================================
        // PAGINATION
        // =====================================================

        const limit = Math.max(Number(per_page) || 16, 1);
        const page = Math.max(Number(page_no) || 1, 1);
        const skip = (page - 1) * limit;

        // =====================================================
        // PRICE FILTER
        // =====================================================

        const fromPrice = Number(from_price) || 0;
        const toPrice = Number(to_price) || 0;

        // =====================================================
        // MATCH CONDITION
        // =====================================================

        const matchStage = {};

        // =====================================================
        // CATEGORY FILTER
        // =====================================================

        if (
            category_id &&
            category_id !== "0" &&
            mongoose.Types.ObjectId.isValid(category_id)
        ) {
            const categoryId = new mongoose.Types.ObjectId(category_id);

            matchStage.$or = [
                {
                    pro_parent_category_id: categoryId,
                },
                {
                    pro_child_category_id: categoryId,
                },
            ];
        }

        // =====================================================
        // REMARK FILTER
        // =====================================================

        if (remark && remark !== "0") {
            matchStage.remark = remark;
        }

        // =====================================================
        // KEYWORD FILTER
        // =====================================================

        if (keyword && keyword !== "0") {
            matchStage.$and = [
                {
                    $or: [
                        {
                            pro_title: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                        {
                            pro_sub_title: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                        {
                            pro_details: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                        {
                            support_services: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                        {
                            terms_conditions: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                        {
                            shipping: {
                                $regex: keyword,
                                $options: "i",
                            },
                        },
                    ],
                },
            ];
        }

        // =====================================================
        // PRICE MATCH
        // =====================================================

        const priceMatch = {};

        if (fromPrice > 0) {
            priceMatch.$gte = fromPrice;
        }

        if (toPrice > 0) {
            priceMatch.$lte = toPrice;
        }

        // =====================================================
        // BASE PIPELINE
        // =====================================================

        const basePipeline = [
            {
                $match: matchStage,
            },

            // =================================================
            // EFFECTIVE PRICE
            // =================================================

            {
                $addFields: {
                    effectivePrice: {
                        $cond: [
                            {
                                $eq: [
                                    "$pro_price_type",
                                    "single",
                                ],
                            },

                            // Single price
                            {
                                $ifNull: [
                                    "$offer_price",
                                    0,
                                ],
                            },

                            // Group price
                            // এখানে group-এর lowest price
                            {
                                $ifNull: [
                                    {
                                        $min: "$group_prices.price",
                                    },
                                    0,
                                ],
                            },
                        ],
                    },
                },
            },
        ];

        // =====================================================
        // PRODUCT PIPELINE
        // =====================================================

        const productPipeline = [
            ...basePipeline,

            // =================================================
            // PRICE FILTER
            // =================================================

            ...(Object.keys(priceMatch).length > 0
                ? [
                    {
                        $match: {
                            effectivePrice: priceMatch,
                        },
                    },
                ]
                : []),

            // =================================================
            // PARENT CATEGORY
            // =================================================

            {
                $lookup: {
                    from: "parentcategories",
                    localField: "pro_parent_category_id",
                    foreignField: "_id",
                    as: "parentcategory",
                },
            },

            {
                $unwind: {
                    path: "$parentcategory",
                    preserveNullAndEmptyArrays: true,
                },
            },

            // =================================================
            // CHILD CATEGORY
            // =================================================

            {
                $lookup: {
                    from: "childcategories",
                    localField: "pro_child_category_id",
                    foreignField: "_id",
                    as: "childcategory",
                },
            },

            {
                $unwind: {
                    path: "$childcategory",
                    preserveNullAndEmptyArrays: true,
                },
            },

            // =================================================
            // PAGINATION
            // =================================================

            {
                $sort: {
                    createdAt: -1,
                },
            },

            {
                $skip: skip,
            },

            {
                $limit: limit,
            },

            {
                $project: {
                    updatedAt: 0,
                },
            },
        ];

        // =====================================================
        // HIGHEST PRICE PIPELINE
        // =====================================================
        // এখানে from_price / to_price apply হবে না।
        //
        // তাই user price filter করলেও
        // highestPrice সবসময় সব product-এর maximum price হবে।
        // =====================================================

        const highestPricePipeline = [
            ...basePipeline,

            {
                $group: {
                    _id: null,

                    maxPrice: {
                        $max: "$effectivePrice",
                    },
                },
            },
        ];

        // =====================================================
        // DATABASE
        // =====================================================

        const [products, highestPriceResult] =
            await Promise.all([
                productsModel.aggregate(productPipeline),

                productsModel.aggregate(
                    highestPricePipeline
                ),
            ]);

        // =====================================================
        // TOTAL COUNT
        // =====================================================

        const countPipeline = [
            ...basePipeline,

            ...(Object.keys(priceMatch).length > 0
                ? [
                    {
                        $match: {
                            effectivePrice: priceMatch,
                        },
                    },
                ]
                : []),

            {
                $count: "count",
            },
        ];

        const countResult =
            await productsModel.aggregate(countPipeline);

        const totalProducts =
            countResult?.[0]?.count || 0;

        // =====================================================
        // HIGHEST PRICE
        // =====================================================

        const highestPrice =
            highestPriceResult?.[0]?.maxPrice || 0;

        // =====================================================
        // TOTAL PAGES
        // =====================================================

        const totalPages =
            Math.ceil(totalProducts / limit);

        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(200).json({
            success: true,

            message: "Data Fetched Successfully",

            data: {
                products,

                totalProducts,

                currentPage: page,

                perPage: limit,

                totalPages,

                // সব product থেকে highest price
                highestPrice,

                // বর্তমানে applied filter
                fromPrice,

                toPrice,

                hasNextPage:
                    page < totalPages,

                hasPreviousPage:
                    page > 1,
            },
        });

    } catch (error) {
        console.log(
            "All Products Error:",
            error
        );

        return res.status(500).json({
            success: false,

            message: "Something went wrong",

            error: error.message,
        });
    }
};

// get by category


// Get Category Products
const categoryProducts = async (req, res) => {
    try {

        const { id } = req.params;

        // ObjectId validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id",
            });
        }

        const categoryId = new mongoose.Types.ObjectId(id);

        const data = await productsModel.find({
            $or: [
                {
                    pro_parent_category_id: categoryId
                },
                {
                    pro_child_category_id: categoryId
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Category products fetched successfully",
            data: data,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        });
    }
};


// =====================================================
// SEARCH SUGGESTION
// =====================================================

const searchSuggestion = async (req, res) => {
    try {
        const { keyword } = req.params;

        // Empty keyword check
        if (!keyword || keyword === "0" || !keyword.trim()) {
            return res.status(200).json({
                success: true,
                data: [],
            });
        }

        // Escape special regex characters
        const escapedKeyword = keyword.trim().replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        // Search products
        const products = await productsModel
            .find({
                $or: [
                    {
                        pro_title: {
                            $regex: escapedKeyword,
                            $options: "i",
                        },
                    },
                    {
                        pro_sub_title: {
                            $regex: escapedKeyword,
                            $options: "i",
                        },
                    },
                ],
            })
            .select(
                "pro_title pro_sub_title pro_image_type product_images group_images regular_price offer_price pro_price_type group_prices group_images_price"
            )
            .limit(8)
            .lean();



        // Prepare suggestion data
        const suggestions = products.map((item) => {
            let image = "";
            let price = 0;

            // Group image
            if (item.pro_image_type === "group") {
                image = item.group_images?.[0] || "";
                price = item.group_images_price?.[0] || 0;
            }

            // Normal image
            else if (item.pro_image_type === "normal") {
                image = item.product_images?.[0] || "";

                // Single price
                if (item.pro_price_type === "single") {
                    price = item.offer_price || 0;
                }

                // Group price
                else if (item.pro_price_type === "group") {
                    price = item.group_prices?.[0]?.price || 0;
                }
            }

            return {
                ...item,
                image,
                price,
            };
        });

        return res.status(200).json({
            success: true,
            data: suggestions,
        });

    } catch (error) {
        console.log("Search Suggestion Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
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

        const joinWithParentCategory = {
            $lookup: {
                from: "parentcategories",
                localField: "pro_parent_category_id",
                foreignField: "_id",
                as: "parentCategory",
            },
        };


        const joinWithChildCategory = {
            $lookup: {
                from: "childcategories",
                localField: "pro_child_category_id",
                foreignField: "_id",
                as: "childCategory",
            },
        };



        const data = await productsModel.aggregate([matchStage, joinWithParentCategory, joinWithChildCategory]);

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

const parentCategoryProducts = async (req, res) => {
    try {
        const id = req.params.id;



        const data = await productsModel.find({ pro_parent_category_id: id });

        res.status(200).json({
            success: true,
            message: "Parent Category Product fatched successfully",
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



        let {
            pro_title,
            pro_sub_title,
            pro_details,
            pro_parent_category_id,
            pro_child_category_id,
            pro_stock,
            pro_color,
            pro_image_type,
            group_images_price,
            pro_price_type,
            pro_size,
            regular_price,
            offer_price,
            group_prices,
            support_services,
            terms_conditions,
            shipping,


            // extra
            product_images_string,
            group_images_string
        } = req.body;


        // single image convert
        if (typeof product_images_string === "string") {
            try {
                product_images_string = JSON.parse(product_images_string);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product_images_string format",
                });
            }
        }






        // group image convert
        let group_images_data = [];

        if (typeof group_images_string === "string") {
            try {
                group_images_string = JSON.parse(group_images_string);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group_images_string format",
                });
            }
        }

        if (Array.isArray(group_images_string)) {
            group_images_data = group_images_string.map(
                (item) => item.image
            );
        }



        const product_images = req?.files?.product_images || [];
        const imageNames = product_images.map((image) => image.filename);


        const group_images = req?.files?.group_images || [];
        const groupimageNames = group_images.map((image) => image.filename);








        // images group price parseing
        if (typeof group_images_price === "string") {
            try {
                group_images_price = JSON.parse(group_images_price);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group_images_price format",
                });
            }
        }

        if (Array.isArray(group_images_price)) {
            group_images_price = group_images_price.map(
                (item) => item.price
            );
        }


        // group price parsing

        if (typeof group_prices === "string") {
            try {
                group_prices = JSON.parse(group_prices);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid group_prices format",
                });
            }
        }


        if (Array.isArray(group_prices)) {
            group_prices = group_prices.map((item) => ({
                size: item.size,
                price: Number(item.price),
            }));
        }


        if (Number(regular_price) < Number(offer_price)) {
            return res.status(400).json({
                success: false,
                message: "Offer price must be less than or equal to the regular price.",
            });
        }




        // const product = await productsModel.findById(id);




        const updateData = {


            pro_title,
            pro_sub_title,
            pro_details,
            pro_parent_category_id,
            pro_child_category_id,
            pro_stock,
            pro_color,
            pro_image_type,
            product_images,
            product_images: imageNames.length > 0 ? imageNames : product_images_string,
            group_images: groupimageNames.length > 0 ? groupimageNames : group_images_data,
            group_images_price,
            pro_price_type,
            pro_size,
            regular_price,
            offer_price,
            group_prices,
            support_services,
            terms_conditions,
            shipping




        };




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


        // const IshotDeal = await HotDealModel.findOne({ product_id: id });



        // Condtion 
        // if (IshotDeal) {

        //     return res.status(400).json({
        //         success: false,
        //         message: "Remove from Hot Deal before deleting"
        //     })



        // }

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

const productController = { createProduct, allProducts, categoryProducts, searchSuggestion, singleProducts, updateProducts, deleteProduct, parentCategoryProducts };
export default productController;