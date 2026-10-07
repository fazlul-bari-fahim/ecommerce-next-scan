import contactModel from "../models/contactMode.js";


// Create contact
const create = async (req, res) => {
    try {

        const { first_name, last_name, phone, email, message, subject } = req.body;



        const data = await contactModel.create({ first_name, last_name, phone, email, message, subject });
        res.status(201).json({
            success: true,
            message: "Send Message to Support",
            Data: data,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Somethng went wrong",
            error: error.toString(),
        })

    }
};

// Get all brand 

const getAllContact = async (req, res) => {
    try {
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);


        const skipRow = (page_no - 1) * per_page;   // Ex: page_no = 5 , per_page = 10 , before 4 page * total product 10 = skip = 40 product
        const sortStage = { createdAt: -1 };



        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                contact: [
                    { $sort: sortStage },
                    { $skip: skipRow },
                    { $limit: per_page },
                    {
                        $project: {
                            updatedAt: 0,
                            contacts: 0,
                        }
                    }
                ]
            }
        };

        const contact = await contactModel.aggregate([facetStage])
        res.status(200).json({
            success: true,
            message: "Contact fatched successfully",
            data: contact,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};







// Delete Brand 

const deleteContact = async (req, res) => {
    try {

        const { id } = req.params;


        await contactModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Message deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
}


const contactController = { create, getAllContact, deleteContact };
export default contactController;