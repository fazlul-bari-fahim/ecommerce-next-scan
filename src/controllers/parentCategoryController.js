import childcategoryModel from "../models/ChildcategoryModel.js";
import ParentcategoryModel from "../models/ParentcategoryModel.js";



// Create Category 


const create = async (req, res) => {
    try {

        const { parentcategory_name } = req.body;
        const parentcategory_image = req.file?.filename;


        const isCategory = await ParentcategoryModel.find({ parentcategory_name });

        if (isCategory.length > 0) {
            return res.status(500).json({
                success: false,
                message: "Parent category already exists."
            })
        };





        const data = await ParentcategoryModel.create({ parentcategory_name, parentcategory_image });
        res.status(201).json({
            success: true,
            message: "Parent Category created successfully",
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
        const sortStage = { createdAt: 1 };





        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                categories: [
                    { $sort: sortStage },
                    { $skip: skipRow },
                    { $limit: per_page },
                    // $lookup ব্যবহার করে Child Category যোগ করা হলো
                    {
                        $lookup: {
                            from: "childcategories",
                            let: { parentId: "$_id" },

                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$parentcategory_id", "$$parentId"]
                                        }
                                    }
                                },
                                {
                                    $sort: {
                                        createdAt: -1
                                    }
                                }
                            ],

                            as: "child_categories"
                        }
                    },
                    {
                        $project: {
                            updatedAt: 0,
                            products: 0,
                        }
                    }
                ]
            }
        };

        const categories = await ParentcategoryModel.aggregate([facetStage]);
        res.status(200).json({
            success: true,
            message: "Parent Categories fatched successfully",
            data: categories[0],
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
        const data = await ParentcategoryModel.findById(id);


        res.status(200).json({
            success: true,
            message: "Category fatched successfully",
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
        const { parentcategory_name } = req.body;
        const parentcategory_image = req.file?.filename;




        const data = await ParentcategoryModel.findByIdAndUpdate(id, {
            parentcategory_name,
            parentcategory_image
        }, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: "Parent Category update successfully",
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
        console.log(id)

        const childCategory = await childcategoryModel.find({ parentcategory_id: id });
        if (childCategory.length > 0) {
            return res.status(200).json({
                success: false,
                message: "Please delete all Child Category in this category before deleting this Parent category"
            })
        }

        await ParentcategoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Parent Category deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),

        })

    }
}
const ParentcategoryController = { create, getAllCategory, getSingleCategory, updateCategory, deleteCategory };
export default ParentcategoryController;