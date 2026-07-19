import brandModel from "../models/brandModel.js"
import productsModel from "../models/productModel.js";


// Create Brand
const create = async(req, res)=>{
    try {

        const {brand_name} =req.body;
        const brand_image = req.file?.filename;
       
        const data =  await brandModel.create({brand_name, brand_image});
        res.status(201).json({
            success:true,
            message:"Brand created successfully",
            Data: data,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Somethng went wrong",
            error:error.toString(),
        })
        
    }
};

// Get all brand 

const getAllBrand = async (req,res)=>{
    try {
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);

        const skipRow = (page_no - 1 ) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = {createdAt: -1};

        const joinWithProduct = {
            $lookup: {
                from: "products",
                localField:"_id",
                foreignField:"brand_id",
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
                brand : [
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

        const categories = await brandModel.aggregate([facetStage])
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


// Get single brand

const getSingleBrand = async (req, res)=>{
    try {

        const {id}= req.params;
        const data = await brandModel.findById(id);
        res.status(200).json({
            success:true,
            message:"Brand fatched successfully",
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

// Update Brand 

const updateBrand = async (req, res)=>{
    try {

        const {id} = req.params;
        const {brand_name}=req.body;
        const brand_image = req.file?.filename;

        const data = await brandModel.findByIdAndUpdate(id,{
            brand_name, brand_image
        },{
            returnDocument: 'after',
        });

        res.status(200).json({
            success:true,
            message:"Brand Updated Successfully",
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


// Delete Brand 

const deleteBrand = async (req, res)=>{
    try {

        const {id} = req.params;
        const product = await productsModel.find({brand_id:id});
        if(product.length > 0){
            return res.status(200).json({
                success:false,
                message:"Please delete all poduct in this brand before deleting this brand",
            })
        }
        await brandModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Brand deleted successfully",
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.toString(),
        })
        
    }
}


const brandController = {create, getAllBrand, getSingleBrand, updateBrand, deleteBrand};
export default brandController;