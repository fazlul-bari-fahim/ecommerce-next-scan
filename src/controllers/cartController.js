import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
import crypto from "crypto"
const ObjectId = mongoose.Types.ObjectId;


// Create Cart 

// const createCart = async (req, res) => {

//     try {
//         const user_id = req.headers._id;
//         let { product_id, title, big_image, color, size, qty, regular_price, discount_price } = req.body;
//         console.log(product_id, title, big_image, color, size, qty, regular_price, discount_price);

//         qty = parseInt(qty);            // String convert to Intiger

//         // ✅ find product
//         const product = await productsModel.findById(product_id);



//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }

//         // ✅ find existing cart (NO qty & price in query)
//         const existingCart = await cartModel.findOne({
//             user_id,
//             product_id,
//             color,
//             size,
//         });


//         // ✅ total qty for THIS USER ONLY
//         const userCarts = await cartModel.find({
//             user_id,
//             product_id
//         }).select("qty");  // user এই product কতবার cart-এ add করেছে (সব record বের করবে)

//         const totalQty = userCarts.reduce((sum, item) => sum + item.qty, 0);        // sum = আগের total , item = array-এর current object


//         // ✅ stock check
//         if (product.stock < totalQty + qty) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Stock limit exceeded",
//             });
//         }

//         // =========================
//         // ✅ UPDATE EXISTING CART
//         // =========================
//         if (existingCart) {
//             const updatedCart = await cartModel.updateOne(
//                 { _id: existingCart._id },
//                 { $inc: { qty: qty } }  // increment (বাড়ানো)
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: "Cart updated successfully",
//                 data: updatedCart,
//             });
//         }

//         // =========================
//         // ✅ CREATE NEW CART
//         // =========================
//         const data = await cartModel.create({
//             user_id,
//             product_id,
//             title,
//             big_image,
//             color,
//             size,
//             qty,
//             regular_price,
//             discount_price
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Product added to cart",
//             data: data,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.toString(),
//         });
//     }
// };


// const readCart = async (req, res) => {
//     try {

//         const user_id = new ObjectId(req.headers._id);
//         const matchStage = { $match: { user_id } };


//         const joinWithProduct = {
//             $lookup: {
//                 from: "products",
//                 localField: "product_id",
//                 foreignField: "_id",
//                 as: "product",

//             }
//         };

//         const unwindProductStage = { $unwind: "$product" };


//         const joinWithBrands = {
//             $lookup: {
//                 from: "brands",
//                 localField: "product.brand_id",
//                 foreignField: "_id",
//                 as: "brand",

//             }
//         };

//         const unwindBrandStage = { $unwind: "$brand" };

//         const joinWithCategory = {
//             $lookup: {
//                 from: "categories",
//                 localField: "product.category_id",
//                 foreignField: "_id",
//                 as: "category",

//             }
//         };

//         const unwindCategoryStage = { $unwind: "$category" };

//         const projectionStage = {
//             $facet: {
//                 totalCount: [{ $count: "count" }],
//                 product: [{
//                     $project: {

//                         _id: 1,
//                         user_id: 0,
//                         "product._id": 0,
//                         "product.catgory_id": 0,
//                         "product.brand_id": 0,
//                         "product.createdAt": 0,
//                         "product.updatedAt": 0,
//                         "product.description": 0,
//                         "brand.createdAt": 0,
//                         "brand.updatedAt": 0,
//                         "category._id": 0,
//                         "category.createdAt": 0,
//                         "category.updatedAt": 0,

//                         category_id: 0,
//                         brand_id: 0,
//                         createdAt: 0,
//                         updatedAt: 0,
//                     }

//                 }]
//             }
//         };

//         const data = await cartModel.aggregate([
//             matchStage,
//             joinWithProduct,
//             unwindProductStage,
//             joinWithCategory,
//             unwindCategoryStage,
//             joinWithBrands,
//             unwindBrandStage,
//             projectionStage,


//         ]);

//         res.status(200).json({
//             success: true,
//             message: "Cart fatched Successfully",
//             Data: data,
//         })


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.toString(),
//         })

//     }
// }



// const updateCart = async (req, res) => {


//     try {
//         const { product_id, inc } = req.body;
//         console.log("redest", product_id, inc)

//         const user_id = new mongoose.Types.ObjectId(req.headers._id);
//         const cart_id = new mongoose.Types.ObjectId(req.params.cart_id);

//         // Find product
//         const product = await productsModel.findById(product_id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }

//         // Find current user's cart
//         const cart = await cartModel.findOne({
//             _id: cart_id,
//             user_id,
//         });

//         if (!cart) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Cart not found",
//             });
//         }

//         let newQty = cart.qty;

//         // Increase
//         if (inc) {

//             // Total quantity of this product in all carts
//             const carts = await cartModel.find({ product_id }).select("qty");

//             const totalQty = carts.reduce((sum, item) => sum + item.qty, 0);

//             if (totalQty >= product.stock) {
//                 console.log("hilu")
//                 return res.status(400).json({
//                     success: false,
//                     message: "All stock has already been added to carts.",
//                 });
//             }

//             newQty = cart.qty + 1;
//         }

//         // Decrease
//         else {

//             if (cart.qty <= 1) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Quantity cannot be less than 1.",
//                 });
//             }

//             newQty = cart.qty - 1;
//         }

//         // Update cart
//         await cartModel.updateOne(
//             {
//                 _id: cart_id,
//                 user_id,
//             },
//             {
//                 $set: {
//                     qty: newQty,
//                 },
//             }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Cart updated successfully.",
//             qty: newQty,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong.",
//             error: error.message,
//         });
//     }
// };

// const cartDelete = async (req, res) => {
//     try {

//         const cart_id = req.params.cart_id;
//         await cartModel.findByIdAndDelete(cart_id);
//         res.status(200).json({
//             success: true,
//             message: "Cart deleted successfully"
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.toString(),
//         })
//     }
// }





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

















// new model





const generateGuestId = () => {
    return crypto.randomUUID();
};



const addToCart = async (req, res) => {
    try {

        const {
            product_id,
            quantity,
            size,
            price,
            image,
        } = req.body.data;



        // =========================
        // VALIDATION
        // =========================

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }


        if (price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "Product price is required",
            });
        }


        // Size না থাকলে "No" হবে
        const cartSize = size || "No";


        let cart;


        // =========================
        // LOGGED IN USER
        // =========================

        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            });


            // User-এর cart না থাকলে নতুন cart create
            if (!cart) {

                cart = await cartModel.create({
                    user_id: req.user._id,
                    guest_id: null,
                    items: [],
                });

            }

        }


        // =========================
        // GUEST USER
        // =========================

        else {

            let guestId = req.cookies?.guest_id;


            // Guest ID না থাকলে নতুন ID তৈরি
            if (!guestId) {

                guestId = generateGuestId();


                res.cookie("guest_id", guestId, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });

            }


            // Guest cart খুঁজবে
            cart = await cartModel.findOne({
                guest_id: guestId,
            });


            // Guest cart না থাকলে নতুন cart create
            if (!cart) {

                cart = await cartModel.create({
                    user_id: null,
                    guest_id: guestId,
                    items: [],
                });

            }

        }


        // =========================
        // CHECK EXISTING PRODUCT
        // =========================

        const existingItem = cart.items.find(
            (item) =>
                item.product_id.toString() === product_id &&
                item.size === cartSize
        );


        // =========================
        // PRODUCT ALREADY EXISTS
        // =========================

        if (existingItem) {

            existingItem.quantity += Number(quantity) || 1;

        }


        // =========================
        // NEW PRODUCT
        // =========================

        else {

            cart.items.push({
                product_id: product_id,
                quantity: Number(quantity) || 1,
                size: cartSize,
                price: Number(price),
                image: image || "",
            });

        }


        // =========================
        // SAVE CART
        // =========================

        await cart.save();


        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart,
        });


    } catch (error) {

        console.log("ADD CART ERROR:", error);


        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });

    }
};



const getCartItem = async (req, res) => {
    try {

        let cart;


        // =========================
        // LOGGED IN USER
        // =========================

        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            }).populate("items.product_id");
        }


        // =========================
        // GUEST USER
        // =========================

        else {

            const guestId = req.cookies?.guest_id;


            if (!guestId) {
                return res.status(200).json({
                    success: true,
                    message: "Cart is empty",
                    cart: null,
                });
            }


            cart = await cartModel.findOne({
                guest_id: guestId,
            }).populate("items.product_id");
        }


        return res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {

        console.log("GET CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


const getAllCart = async (req, res) => {
    try {

        let cart;


        // =========================
        // LOGGED IN USER
        // =========================

        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            })
        }


        // =========================
        // GUEST USER
        // =========================

        else {

            const guestId = req.cookies?.guest_id;


            if (!guestId) {
                return res.status(200).json({
                    success: true,
                    message: "Cart is empty",
                    cart: null,
                });
            }


            cart = await cartModel.findOne({
                guest_id: guestId,
            })
        }


        return res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {

        console.log("GET CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};





const removeCartItem = async (req, res) => {
    try {

        const { cart_id } = req.params;

        let cart;


        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            });

        } else {

            const guestId = req.cookies?.guest_id;

            if (!guestId) {
                return res.status(404).json({
                    success: false,
                    message: "Cart not found",
                });
            }

            cart = await cartModel.findOne({
                guest_id: guestId,
            });
        }


        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }


        cart.items = cart.items.filter(
            (item) => item._id.toString() !== cart_id
        );


        await cart.save();


        return res.status(200).json({
            success: true,
            message: "Cart item removed successfully",
            cart,
        });

    } catch (error) {

        console.log("REMOVE CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};


const deleteCart = async (req, res) => {
    try {

        const { cart_id } = req.params;
        console.log("cart id", cart_id)

        let cart;


        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            });

        } else {

            const guestId = req.cookies?.guest_id;

            if (!guestId) {
                return res.status(404).json({
                    success: false,
                    message: "Guest not found",
                });
            }

            cart = await cartModel.findOne({
                guest_id: guestId,
            });
        }


        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        await cartModel.findByIdAndDelete(cart_id)

        return res.status(200).json({
            success: true,
            message: "Cart Delete successfully",
        });

    } catch (error) {

        console.log("REMOVE CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};










const updateCartQuantity = async (req, res) => {
    try {

        const { item_id } = req.params;
        const { quantity } = req.body;
        console.log("data", item_id, quantity)


        if (Number(quantity) < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }


        let cart;


        if (req.user?._id) {

            cart = await cartModel.findOne({
                user_id: req.user._id,
            });

        } else {

            const guestId = req.cookies?.guest_id;

            if (!guestId) {
                return res.status(404).json({
                    success: false,
                    message: "Cart not found",
                });
            }

            cart = await cartModel.findOne({
                guest_id: guestId,
            });
        }


        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }


        const item = cart.items.id(item_id);


        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }


        item.quantity = Number(quantity);


        await cart.save();


        return res.status(200).json({
            success: true,
            message: "Quantity updated successfully",
            cart,
        });

    } catch (error) {

        console.log("UPDATE CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};





// const mergeGuestCart = async (req, res) => {
//     try {

//         const userId = req.user?._id;
//         const guestId = req.cookies?.guest_id;


//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User is not authenticated",
//             });
//         }


//         if (!guestId) {
//             return res.status(200).json({
//                 success: true,
//                 message: "No guest cart found",
//             });
//         }


//         const guestCart = await Cart.findOne({
//             guest_id: guestId,
//         });


//         if (!guestCart || guestCart.items.length === 0) {

//             res.clearCookie("guest_id");

//             return res.status(200).json({
//                 success: true,
//                 message: "No guest cart found",
//             });
//         }


//         let userCart = await Cart.findOne({
//             user_id: userId,
//         });


//         if (!userCart) {

//             userCart = await Cart.create({
//                 user_id: userId,
//                 guest_id: null,
//                 items: [],
//             });
//         }


//         // Guest items user cart-এ add
//         guestCart.items.forEach((guestItem) => {

//             const existingItem = userCart.items.find(
//                 (item) =>
//                     item.product_id.toString() ===
//                     guestItem.product_id.toString() &&
//                     item.size === guestItem.size &&
//                     item.color === guestItem.color
//             );


//             if (existingItem) {

//                 existingItem.quantity += guestItem.quantity;

//             } else {

//                 userCart.items.push({
//                     product_id: guestItem.product_id,
//                     quantity: guestItem.quantity,
//                     size: guestItem.size,
//                     color: guestItem.color,
//                     price: guestItem.price,
//                     image: guestItem.image,
//                 });
//             }

//         });


//         await userCart.save();


//         // Guest cart delete
//         await Cart.findByIdAndDelete(guestCart._id);


//         // Guest cookie remove
//         res.clearCookie("guest_id");


//         return res.status(200).json({
//             success: true,
//             message: "Guest cart merged successfully",
//             cart: userCart,
//         });

//     } catch (error) {

//         console.log("MERGE CART ERROR:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.message,
//         });
//     }
// };

// const cartController = { createCart, readCart, updateCart, cartDelete };






const cartController = { addToCart, getCartItem, getAllCart, updateCartQuantity, removeCartItem, deleteCart };
export default cartController;