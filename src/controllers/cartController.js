import cartModel from "../models/cartModel.js";
import productsModel from "../models/productModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


// Create Cart 

const createCart = async (req, res) => {

    try {
        const user_id = req.headers._id;
        let { product_id, title, big_image, color, size, qty, regular_price, discount_price } = req.body;
        console.log(product_id, title, big_image, color, size, qty, regular_price, discount_price);

        qty = parseInt(qty);            // String convert to Intiger

        // ✅ find product
        const product = await productsModel.findById(product_id);



        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // ✅ find existing cart (NO qty & price in query)
        const existingCart = await cartModel.findOne({
            user_id,
            product_id,
            color,
            size,
        });


        // ✅ total qty for THIS USER ONLY
        const userCarts = await cartModel.find({
            user_id,
            product_id
        }).select("qty");  // user এই product কতবার cart-এ add করেছে (সব record বের করবে)

        const totalQty = userCarts.reduce((sum, item) => sum + item.qty, 0);        // sum = আগের total , item = array-এর current object


        // ✅ stock check
        if (product.stock < totalQty + qty) {
            return res.status(200).json({
                success: false,
                message: "Stock limit exceeded",
            });
        }

        // =========================
        // ✅ UPDATE EXISTING CART
        // =========================
        if (existingCart) {
            const updatedCart = await cartModel.updateOne(
                { _id: existingCart._id },
                { $inc: { qty: qty } }  // increment (বাড়ানো)
            );

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart,
            });
        }

        // =========================
        // ✅ CREATE NEW CART
        // =========================
        const data = await cartModel.create({
            user_id,
            product_id,
            title,
            big_image,
            color,
            size,
            qty,
            regular_price,
            discount_price
        });

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: data,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        });
    }
};


const readCart = async (req, res) => {
    try {

        const user_id = new ObjectId(req.headers._id);
        const matchStage = { $match: { user_id } };


        const joinWithProduct = {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product",

            }
        };

        const unwindProductStage = { $unwind: "$product" };


        const joinWithBrands = {
            $lookup: {
                from: "brands",
                localField: "product.brand_id",
                foreignField: "_id",
                as: "brand",

            }
        };

        const unwindBrandStage = { $unwind: "$brand" };

        const joinWithCategory = {
            $lookup: {
                from: "categories",
                localField: "product.category_id",
                foreignField: "_id",
                as: "category",

            }
        };

        const unwindCategoryStage = { $unwind: "$category" };

        const projectionStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                product: [{
                    $project: {

                        _id: 1,
                        user_id: 0,
                        "product._id": 0,
                        "product.catgory_id": 0,
                        "product.brand_id": 0,
                        "product.createdAt": 0,
                        "product.updatedAt": 0,
                        "product.description": 0,
                        "brand.createdAt": 0,
                        "brand.updatedAt": 0,
                        "category._id": 0,
                        "category.createdAt": 0,
                        "category.updatedAt": 0,

                        category_id: 0,
                        brand_id: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    }

                }]
            }
        };

        const data = await cartModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProductStage,
            joinWithCategory,
            unwindCategoryStage,
            joinWithBrands,
            unwindBrandStage,
            projectionStage,


        ]);

        res.status(200).json({
            success: true,
            message: "Cart fatched Successfully",
            Data: data,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
}



const updateCart = async (req, res) => {


    try {
        const { product_id, inc } = req.body;
        console.log("redest", product_id, inc)

        const user_id = new mongoose.Types.ObjectId(req.headers._id);
        const cart_id = new mongoose.Types.ObjectId(req.params.cart_id);

        // Find product
        const product = await productsModel.findById(product_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Find current user's cart
        const cart = await cartModel.findOne({
            _id: cart_id,
            user_id,
        });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        let newQty = cart.qty;

        // Increase
        if (inc) {

            // Total quantity of this product in all carts
            const carts = await cartModel.find({ product_id }).select("qty");

            const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);

            if (totalQty >= product.stock) {
                console.log("hilu")
                return res.status(400).json({
                    success: false,
                    message: "All stock has already been added to carts.",
                });
            }

            newQty = cart.qty + 1;
        }

        // Decrease
        else {

            if (cart.qty <= 1) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity cannot be less than 1.",
                });
            }

            newQty = cart.qty - 1;
        }

        // Update cart
        await cartModel.updateOne(
            {
                _id: cart_id,
                user_id,
            },
            {
                $set: {
                    qty: newQty,
                },
            }
        );

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully.",
            qty: newQty,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: error.message,
        });
    }
};

const cartDelete = async (req, res) => {
    try {

        const cart_id = req.params.cart_id;
        await cartModel.findByIdAndDelete(cart_id);
        res.status(200).json({
            success: true,
            message: "Cart deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })
    }
}





// const createCart = async(req, res)=>{
//     try {

//         const user_id = req.headers._id;
//         const {product_id, product_name, color, size, qty, price} = req.body;

//         // find stock products
//         const product = await productsModel.findById(product_id);
//         // find existing cart 
//         const existingCart = await cartModel.findOne({
//             user_id,
//             product_id,
//             product_name,
//             color,
//             size,
//             qty,
//             price


//         });

//         if(!! existingCart === true){
//             // For existing products

//             const newReqBody ={
//                 user_id,
//                 product_id,
//                 product_name,
//                 color,
//                 size,
//                 qty:parseInt(existingCart.qty) + parseInt(qty),
//             };

//             const carts = await cartModel.find({product_id}).select("qty");
//             const totalQty = carts.reduce((sum, item)=> sum + item.qty,0);

//             if(product?.stock < totalQty + qty){
//                 return res.status(200).json({
//                     success:false,
//                     message:"You have added all the products in stock",

//                 });
//             }else{
//                 // For new products

//                 const carts = await cartModel.find({product_id}).select("qty");
//                 const totalQty = carts.reduce((sum, item)=> sum + item.qty,0);

//                 if(product?.stock < totalQty + qty){
//                     return res.status(200).json({
//                         success:false,
//                         message:"You have added all the product in stock",
//                     });
//                 }

//                 const data = await cartModel.create({
//                     user_id,
//                     product_id,
//                     product_name,
//                     color,
//                     qty,
//                     size,
//                 });
//                 res.status(200).json({
//                     success:true,
//                     message:"Prodct add to cart successfully",
//                     Data:data,
//                 })
//             }

//             const updateData = await cartModel.updateOne({

//                 _id: existingCart._id,
//                 user_id:existingCart.user_id,
//             },{$set: newReqBody}
//         );
//         res.status(200).json({
//             success:true,
//             message:"Cart Update",
//             updateData,
//         })
//         }


//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:"Something went wrong",
//             error:error.toString(),
//         })

//     }
// };

const cartController = { createCart, readCart, updateCart, cartDelete };
export default cartController;