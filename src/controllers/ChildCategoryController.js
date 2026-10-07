import mongoose from "mongoose";
import childcategoryModel from "../models/ChildcategoryModel.js";
import ParentcategoryModel from "../models/ParentcategoryModel.js";



// Create Category 


const create = async (req, res) => {
    try {


        const { childcategory_name, parentcategory_id } = req.body;
        const childcategory_image = req.file?.filename;

        // console.log(childcategory_name, parentcategory_id, childcategory_image)


        const isCategory = await childcategoryModel.find({ childcategory_name });

        if (isCategory.length > 0) {
            return res.status(500).json({
                success: false,
                message: "Child category already exists."
            })
        };





        const data = await childcategoryModel.create({ childcategory_name, childcategory_image, parentcategory_id });
        res.status(201).json({
            success: true,
            message: "Child Category created successfully",
            Data: data,
        });

    } catch (error) {
        console.log("Back Err", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};

// Get All Category 

const getAllCategory = async (req, res) => {
    try {
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);

        const skipRow = (page_no - 1) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = { createdAt: -1 };





        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                childcategories: [
                    { $sort: sortStage },
                    { $skip: skipRow },
                    { $limit: per_page },
                    {
                        $project: {
                            updatedAt: 0,
                            products: 0,
                        }
                    }
                ]
            }
        };






        const categories = await childcategoryModel.aggregate([facetStage]);


        // const categories = await childcategoryModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Parent Categories fatched successfully",
            data: categories,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};





// Get Single Category 

const getSingleCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const data = await childcategoryModel.findById(id);


        res.status(200).json({
            success: true,
            message: "Child Category fatched successfully",
            Data: data,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went worng",
            error: error.toString(),
        })

    }
};


// Get Single Category 
const getSingleCategorybyParent = async (req, res) => {
    try {

        const { id } = req.params;
        const data = await childcategoryModel.find({ parentcategory_id: id });


        res.status(200).json({
            success: true,
            message: "Child Category fatched successfully",
            Data: data,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went worng",
            error: error.toString(),
        })

    }
};





// Update Category 

const updateCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const { childcategory_name, parentcategory_id } = req.body;
        const childcategory_image = req.file?.filename;





        const data = await childcategoryModel.findByIdAndUpdate(id, {
            childcategory_name,
            childcategory_image,
            parentcategory_id
        }, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: "Child Category update successfully",
            Data: data,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};




// Delete Category

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;


        // const product = await productsModel.find({ parentcategory_id: id });
        // if (product.length > 0) {
        //     return res.status(200).json({
        //         success: false,
        //         message: "Please delete all poduct in this category before deleting this category"
        //     })
        // }

        await childcategoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Child Category deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),

        })

    }
}
const childCategoryController = { create, getAllCategory, getSingleCategory, getSingleCategorybyParent, updateCategory, deleteCategory };
export default childCategoryController;