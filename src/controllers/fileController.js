import path from "path";
import fs from "fs"
import fileModel from "../models/fileModel.js";
import { fileURLToPath } from "url";


// Upload file

const fileUpload = async (req, res)=>{
    try {

        const {filename} = req.file;



        const data = await fileModel.create({filename});
        res.status(200).json({
            success:true,
            message:"file upload successfully",
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


// Get All file

const allFile = async (req, res)=>{
    try {

        const per_page = Number(req.params.per_page);
        const page_no = Number(req.params.page_no);
        const skiprow = (page_no - 1) * per_page;
        const sortStage = {createdAt:-1};


        const facetStage = {
            $facet:{
                totalCount : [{$count:"count"}],
                files: [
                    {$sort:sortStage},
                    {$skip:skiprow},
                    {$limit:per_page},
                    {
                        $project: { updatedAt:0}
                    },
                ]
            }
        };

        const data = await fileModel.aggregate([facetStage]);
        res.status(200).json({
            success:true,
            message:"All file fatched successfully",
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


// Remove file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeFile = async (req, res)=>{
    try {
        
        const _id = req.body._id;
        const filename = req.body.filename;

        const filePath = path.join(__dirname, `../../src/uploads/${filename}`);
        fs.unlink(filePath, (err)=>{
            if(err){
                console.log(err);
            }
        });

        const data = await fileModel.deleteOne({_id,filename});

        res.status(200).json({
            success:true,
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



const fileController = {fileUpload, allFile, removeFile};
export default fileController;