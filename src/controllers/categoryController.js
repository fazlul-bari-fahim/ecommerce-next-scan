import categoryModel from "../models/categoryModel.js";
import productsModel from "../models/productModel.js";


// Create Category 

const create = async (req, res)=>{
    try {

        const {category_name} = req.body;
        const category_image = req.file?.filename;
    
       
     

        const data = await categoryModel.create({category_name, category_image});
        res.status(201).json({
            success:true,
            message:"Category created successfully",
            Data: data,
        });
        
    } catch (error) {
        console.log("Back Err",error);
       
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};

// Get All Category 

const getAllCategory = async (req,res)=>{
    try {
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);

        const skipRow = (page_no - 1 ) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = {createdAt: -1};

        const joinWithProduct = {
            $lookup: {
                from: "products",
                localField:"_id",
                foreignField:"category_id",
                as: "products",
            },
        };

        const addProductCount = {
            $addFields: {
                totalProduct: {$size: "$products"},
            },
        };

        const facetStage = {
            $facet: {
                totalCount : [ { $count: "count"}],
                categories : [
                    {$sort: sortStage},
                    {$skip: skipRow},
                    {$limit: per_page},
                    joinWithProduct,
                    addProductCount,
                    {
                        $project: {
                            updatedAt: 0,
                            products: 0,
                        }
                    }
                ]
            }
        };

        const categories = await categoryModel.aggregate([facetStage])
        res.status(200).json({
            success:true,
            message: "Categories fatched successfully",
            data: categories[0],
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};


// Get Single Category 

const getSingleCategory  = async (req, res)=>{
    try {

        const {id} = req.params;
        const data = await categoryModel.findById(id);
        

        res.status(200).json({
            success:true,
            message:"Category fatched successfully",
            Data:data,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went worng",
            error:error.toString(),
        })
        
    }
};

// Update Category 

const updateCategory = async (req, res)=>{
    try {

        const {id} = req.params;
        const {category_name, } = req.body;
        const category_image = req.file?.filename;
        console.log(id,category_name, category_image);
   

        const data = await categoryModel.findByIdAndUpdate(id,{
            category_name,
            category_image
        },{
            new:true,
        });

        res.status(200).json({
            success:true,
            message:"Category update successfully",
            Data:data,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
};

// Delete Category

const deleteCategory = async (req, res)=>{
    try {

        const {id} = req.params;

        const product = await productsModel.find({category_id: id});
        if(product.length > 0){
            return res.status(200).json({
                success:false,
                message:"Please delete all poduct in this category before deleting this category"
            })
        }

        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Category deleted successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
            
        })
        
    }
}
const categoryController = {create, getAllCategory, getSingleCategory, updateCategory, deleteCategory};
export default categoryController;