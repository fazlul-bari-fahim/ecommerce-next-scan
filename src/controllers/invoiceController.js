import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import paymentModel from "../models/invoiceModel.js";
import invoiceModel from "../models/invoiceProuctModel.js";
import productsModel from "../models/productModel.js";
import FormData from "form-data";
import { Parser } from "json2csv";
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import generateOrderNumber from "../utility/generateOrderNumber .js";
import Admin from "../models/adminModel.js";
const ObjectId = mongoose.Types.ObjectId;



// Create Invoice
const createInvoice = async (req, res) => {
    try {

        const user_id = new ObjectId(req.headers._id);
        const email = req.headers.email;

        // Step -1  calculate toatal amount and vat


        const matchStage = { $match: { user_id } };
        const joinWithProduct = {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product",

            }
        };


        const unwindProductStage = { $unwind: "$product" };        // convert array to object


        const cartProduct = await cartModel.aggregate([matchStage, joinWithProduct, unwindProductStage])

        // Total Amount Count

        if (cartProduct.length > 0) {
            let totalamount = 0;
            cartProduct.forEach((item) => {
                let price;

                if (item?.product?.is_discount === true) {
                    price = parseFloat(item?.product?.discount_price)
                } else {
                    price = parseFloat(item?.product?.price);
                };

                totalamount = totalamount + parseInt(item?.qty) * price;
            });

            const vat = totalamount * 0.15;
            const shipping = 75;
            const payable = totalamount + shipping + vat;



            // Step-2       prepare customer details and shipping details
            const user = await userModel.findById(user_id);
            if ([user.address,
            user.city,
            user.country,
            user.first_name,
            user.last_name,
            user.phone,
            user.post_Code,
            user.state].every((v) => v === undefined)) {
                return res.status(200).json({
                    success: false,
                    message: "Please go to dashboard and complete your profile information data",
                });

            };
            const cus_details = {
                Name: user?.cus_name,
                Email: user?.cus_email,
                Address: user?.cus_add,
                phone: user?.cus_phone,
            };

            const ship_detailes = {
                Name: user?.ship_name,
                City: user?.ship_city,
                Address: user?.ship_add,
                Phone: user?.ship_phone,
            };

            // step-3 Transition & other's Id

            const tran_id = "tra-" + Date.now() + Math.floor(Math.random() + 90000000);
            const val_id = "val-" + Date.now() + Math.floor(Math.random() + 90000000);

            // step-4: Create Invoice

            const createInvoice = await paymentModel.create({
                user_id: user_id,
                payable: parseFloat(payable).toFixed(2),         //Convert 35.3333 = 35.33
                cus_detailes: cus_details,
                ship_details: ship_detailes,
                tran_id: tran_id,
                val_id: val_id,
                vat: vat,
                total: payable,
                payment_status: "pending",
            });


            // Step - 5 : Create Invoice Product

            const invoice_id = createInvoice._id;
            cartProduct.forEach(async (item) => {
                await invoiceModel.create({
                    user_id: user_id,
                    product_name: item?.product_name,
                    product_id: item?.product_id,
                    invoice_id: invoice_id,
                    qty: item?.qty,
                    price: item.product.is_discount === true
                        ? item?.product?.discount_price
                        : item?.product?.price,
                    color: item?.color,
                    size: item?.size,

                })
            });


            // step-6: Stock Remove

            for (const item of cartProduct) {
                await productsModel.updateOne(
                    { _id: item.product_id },
                    { $inc: { stock: -item.qty } }
                );
            };

            // step-7: Remove Carts

            await cartModel.deleteMany({ user_id: user_id });


            // Step-8: Prepare SSL Payment

            const paymentSettings = {
                store_id: process.env.SSLCZ_STORE_ID,
                store_password: process.env.SSLCZ_STORE_PASSWORD,
                currency: process.env.SSLCZ_CURRENCY,
                success_url: process.env.SSLCZ_SUCCESS_URL,
                fail_url: process.env.SSLCZ_FAIL_URL,
                cancel_url: process.env.SSLCZ_CANCEL_URL,
                ipn_url: process.env.SSLCZ_IPN_URL,
                init_url: process.env.SSLCZ_INIT_URL,
            };

            // Request Parameters

            const form = new FormData();

            // Required
            form.append("store_id", paymentSettings.store_id);
            form.append("store_passwd", paymentSettings.store_password);
            form.append("total_amount", payable.toString());
            form.append("currency", paymentSettings.currency);
            form.append("tran_id", tran_id);



            // URLs
            form.append("success_url", paymentSettings.success_url);
            form.append("fail_url", paymentSettings.fail_url);
            form.append("cancel_url", paymentSettings.cancel_url);
            form.append("ipn_url", paymentSettings.ipn_url);

            // Customer (MINIMUM)
            form.append("cus_name", user?.cus_name || "Test User");
            form.append("cus_email", user?.cus_email || "test@gmail.com");
            form.append("cus_add1", "Dhaka");
            form.append("cus_city", "Dhaka");
            form.append("cus_country", "Bangladesh");
            form.append("cus_phone", "01700000000");

            // Product (VALID VALUES ONLY)
            form.append("product_name", "Test Product");
            form.append("product_category", "General");
            form.append("product_profile", "general");


            try {
                const SSLRes = await axios.post(paymentSettings.init_url, form,
                    {
                        headers: {
                            ...form.getHeaders(),
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                return res.status(200).json({
                    success: true,
                    message: "Payment initiated successfully",
                    Data: SSLRes.data
                });

            } catch (err) {


                return res.status(500).json({
                    success: false,
                    message: "SSL Payment Failed",
                    error: err.response?.data || err.message
                });
            }



        } else {

            return res.status(200).json({
                success: false,
                message: "Cart empty!",
            });

        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};



// Create Invoice for non payment

const createOrder = async (req, res) => {



    try {

        const user_id = new ObjectId(req.headers._id);
        const { cus_detailes, ship_details, product_details, deliver_status, payment_status, payable, discount, vat, shipping, subtotal } = req.body.data;

        const product_id = product_details?.map(item => item?.product_id);

        const order_number = generateOrderNumber();











        if (cus_detailes.FirstName.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "First Name is required"
            })

        } else if (cus_detailes.LastName.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Last Name is required"
            });

        } else if (cus_detailes.Email.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });

        } else if (cus_detailes.Phone.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Phone is required"
            });

        } else if (cus_detailes.Address.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });

        } else if (cus_detailes.Division.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Division is required"
            });

        } else if (cus_detailes.City.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });

        } else if (cus_detailes.City.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });

        } else if (cus_detailes.Zip.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Zip is required"
            });

            // for shipping loop

        } else if (ship_details?.shipping === "shipping on billing information") {

            if (payment_status.length <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Please Select Delivery Method"
                });

            } else {


                for (const item of product_details) {
                    const product_id = item?.product_id;

                    const product = await productsModel.findById(product_id);
                    const Stock = product?.stock;
                    const cartQty = item?.qty


                    if (Stock < cartQty) {
                        return res.status(400).json({
                            success: false,
                            message: `${product.title} has only ${product.stock} items left`
                        });

                    } else {

                        const result = await productsModel.updateOne(
                            { _id: product_id },
                            {
                                $inc: { stock: -cartQty }
                            }

                        );




                    }

                };


                const createInvoice = await paymentModel.create({
                    user_id,
                    order_number: order_number,
                    cus_detailes,
                    ship_details,
                    product_details,
                    deliver_status,
                    payment_status,
                    payable,
                    discount,
                    vat,
                    shipping,
                    subtotal

                });



                for (const item of product_details) {
                    const cart_id = item?._id;
                    const removeCart = await cartModel.findByIdAndDelete(cart_id);

                }

                return res.status(200).json({
                    success: true,
                    message: "Order Placed Successfully",
                    Data: createInvoice,


                })





                return res.status(200).json({
                    success: true,
                    message: "Successfully place your order"
                })
            }


        } else if (ship_details.BillFirstName.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "First Name is required"
            });
        } else if (ship_details.BillLastName.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Last Name is required"
            });
        } else if (ship_details.BillPhone.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Phone  is required"
            });
        } else if (ship_details.BillAddress.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Address  is required"
            });
        } else if (ship_details.BillDivision.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Division  is required"
            });
        } else if (ship_details.BillCity.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "City  is required"
            });
        } else if (ship_details.BillZip.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Zip Code  is required"
            });
        } else if (payment_status.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please Select Delivery Method"
            });

        } else {


            for (const item of product_details) {
                const product_id = item?.product_id;

                const product = await productsModel.findById(product_id);
                const Stock = product?.stock;
                const cartQty = item?.qty


                if (Stock < cartQty) {
                    return res.status(400).json({
                        success: false,
                        message: `${product.title} has only ${product.stock} items left`
                    });

                } else {

                    const result = await productsModel.updateOne(
                        { _id: product_id },
                        {
                            $inc: { stock: -cartQty }
                        }

                    );




                }

            };




            const createInvoice = await paymentModel.create({
                user_id,
                order_number: order_number,
                cus_detailes,
                ship_details,
                product_details,
                deliver_status,
                payment_status,
                payable,
                discount,
                vat,
                shipping,
                subtotal

            });

            for (const item of product_details) {
                const cart_id = item?._id;
                const removeCart = await cartModel.findByIdAndDelete(cart_id);
            }



            return res.status(200).json({
                success: true,
                message: "Order Placed Successfully",
                Data: createInvoice,

            })





            return res.status(200).json({
                success: true,
                message: "Successfully place your order"
            })
        }






    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
};



//  Update Invoice

const updateOrder = async (req, res) => {

    const payment_status = req.body.payment_status;
    const deliver_status = req.body.deliver_status;
    const _id = req.params._id;



    try {
        const updateData = await paymentModel.findByIdAndUpdate(
            _id,
            {
                deliver_status,
                payment_status


            },
            {
                new: true,
            });


        return res.status(200).json({
            success: true,
            message: "Update Invoice Successfully",
            UpdateData: updateData,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        })

    }


}



// get single order 
const getSingleOrder = async (req, res) => {
    try {

        const orderId = req.params;
        const user_id = new ObjectId(req.headers._id);


        const user = await userModel.findById(user_id);



        const orderData = await paymentModel.findById(orderId);
        return res.status(200).json({
            success: true,
            message: "Order Fatched successfully",
            Data: orderData,
        })



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        })

    }
};


// get all order  for user
const getAllOrder = async (req, res) => {
    try {




        const user_id = new ObjectId(req.headers._id);


        const user = await userModel.findById(user_id);

        if (!user) {

            return res.status(400).json({
                succsee: false,
                message: "Data not found"
            })



        } else {


            const orderData = await paymentModel.find({ user_id });

            return res.status(200).json({
                success: true,
                message: "Order Fatched successfully",
                Data: orderData,
            })

        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        })

    }
};





// get all order  for admin
const fecthAllOrder = async (req, res) => {
    try {




        const admin_id = new ObjectId(req.headers._id);


        const admin = await Admin.findById(admin_id);

        if (!admin) {

            return res.status(400).json({
                succsee: false,
                message: "Admin not found"
            })



        } else {


            const ongoingOrder = await paymentModel.find({
                $or: [
                    { deliver_status: "pending" },
                    { payment_status: "cashon" }
                ]
            });


            const successOrder = await paymentModel.find({
                deliver_status: "delivered",
                payment_status: "success"

            });



            const cancleOrder = await paymentModel.find({
                $or: [
                    { deliver_status: "cancel" },
                    { payment_status: "cancel" }
                ]

            });


            const receivedPayment = successOrder.reduce((total, item) => {
                return total + Number(item.payable);
            }, 0);


            const paymentDeu = ongoingOrder.reduce((total, item) => {
                return total + Number(item.payable)
            }, 0);








            return res.status(200).json({
                success: true,
                message: "Order Fatched successfully",
                Data: {
                    ongoingOrder,
                    successOrder,
                    cancleOrder,
                    receivedPayment,
                    paymentDeu


                },
            })

        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        })

    }
};




// Read All Invoice
const redAllInvoice = async (req, res) => {
    console.log("hllo")
    try {

        const user_id = new ObjectId(req.headers._id);
        const per_page = Number(req.params.per_page);
        const page_no = Number(req.params.page_no);

        const skiprow = (page_no - 1) * per_page;
        const sortStage = { createdAt: -1 };

        const matchStage = {
            $match: { user_id: user_id }
        };

        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                data: [{ $sort: sortStage }, { $skip: skiprow }, { $limit: per_page }],
            },
        };

        const data = await paymentModel.aggregate([matchStage, facetStage]);

        res.status(200).json({
            success: true,
            message: "Invoice fatched successfully",
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


// Read All single 
const redAllSingleInvoice = async (req, res) => {
    try {

        const invoice_id = new ObjectId(req.params.invoice_id);

        const matchStage = {
            $match: { _id: invoice_id }
        };

        const joinWithInvoiceProduct = {
            $lookup: {
                from: "productinvoices",
                localField: "_id",
                foreignField: "invoice_id",
                as: "invoiceProducts",
            },
        };

        const data = await paymentModel.aggregate([matchStage, joinWithInvoiceProduct]);
        res.status(200).json({
            success: true,
            message: "Single Invoice fatched successfully",
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








// Read invoice product list single user

const readInvoiceProductListSingleUser = async (req, res) => {
    try {

        const user_id = new ObjectId(req.headers._id);
        const page_no = Number(req.params.page_no);
        const per_page = Number(req.params.per_page);

        const swiprow = (page_no - 1) * per_page;
        const sortStage = { createdAt: -1 };
        const matchStage = {
            $match: { user_id: user_id },
        };


        const joinWithInvoiceProduct = {
            $lookup: {
                from: "productinvoices",
                localField: "_id",
                foreignField: "invoice_id",
                as: "InvoiceProduct"
            }
        };

        const unwindInvoiceProductStage = { $unwind: "$InvoiceProduct" };

        const joinWithProduct = {
            $lookup: {
                from: "products",
                localField: "InvoiceProduct.product_id",
                foreignField: "_id",
                as: "product",
            }
        };

        const unwindstage = { $unwind: "$product" };

        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                products: [
                    { $skip: swiprow },
                    { $sort: sortStage },
                    { $limit: per_page },


                ]
            }
        };

        const product = await paymentModel.aggregate([matchStage, joinWithInvoiceProduct, unwindInvoiceProductStage, joinWithProduct, unwindstage, facetStage])
        res.status(200).json({
            success: true,
            message: "invoice fatched successfully",
            Data: product[0],
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};



// Payment success

const redirect_url = "/cart/thank-you";

const successPayment = async (req, res) => {
    try {

        const trx_id = req.body.tran_id;

        if (trx_id === false) {
            return res.status(200).json({
                success: false,
                message: "Transection ID Missing"
            })

        }

        await paymentModel.updateOne(
            { tran_id: trx_id },
            { payment_status: "success" }
        );
        res.redirect(redirect_url);


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};


// cancle Payment

const cancelPayment = async (req, res) => {
    try {

        const trx_id = req.body.tran_id;

        if (trx_id === false) {
            return res.status(200).json({
                success: false,
                message: "Transection ID Missing"
            })

        }

        await paymentModel.updateOne(
            { tran_id: trx_id },
            { payment_status: "canlce" }
        );



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};


// Fail Payment

const failPayment = async (req, res) => {
    try {

        const trx_id = req.body.tran_id;

        if (trx_id === false) {
            return res.status(200).json({
                success: false,
                message: "Transection ID Missing"
            })

        }

        await paymentModel.updateOne(
            { tran_id: trx_id },
            { payment_status: "fail" }
        );



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};

// ipn

const ipnPayment = async (req, res) => {
    try {

        const trx_id = req.body.tran_id;

        if (trx_id === false) {
            return res.status(200).json({
                success: false,
                message: "Transection ID Missing"
            })

        }

        //    You can do anything here


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};


// All Order

const allOrder = async (req, res) => {
    try {

        const per_page = Number(req.params.per_page);
        const page_no = Number(req.params.page_no);

        const skiprow = (page_no - 1) * per_page;

        const { from, to } = req.query;

        const fromData = from ? new Date(`${from}T00:00:00`) : new Date("1970-01-01T00:00:00");
        const toData = to ? new Date(`${to}T23:59:59.999`) : new Date();
        const matchStage = {
            createdAt: {
                $gte: fromData,
                $lte: toData,
            },
        };

        const joinWithProuct = {
            $lookup: {
                from: "productinvoices",
                localField: "_id",
                foreignField: "invoice_id",
                as: "products"
            }
        };

        const unwindProductStage = { $unwind: "$products" };

        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                products: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skiprow },
                    { $limit: per_page },
                    joinWithProuct,
                    unwindProductStage,

                ]
            }
        };

        const products = await paymentModel.aggregate([
            { $match: matchStage },
            facetStage,
        ]);

        res.status(200).json({
            success: true,
            message: "Order fatched successfully",
            Data: products[0],
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};



// Exort CSV

const exportCsv = async (req, res) => {
    try {

        const { from, to } = req.query;

        const fromDate = from ? new Date(`${from}T00:00:00`) : new Date("2000-01-01T00:00:00");
        const toDate = to ? new Date(`${to}T23:59:59.999`) : new Date();

        const matchStage = {
            createdAt: {
                $gte: fromDate,
                $lte: toDate,
            }
        };

        // get invoice

        const data = await paymentModel.find(matchStage).sort({ createdAt: -1 });

        // select colomns for CSV

        const fields = [
            "_id",
            "user_id",
            "payable",
            "delivery_status",
            "payment_status",
            "total",
            "vat",
            "createdAt",
        ];


        // Convert to CSV

        const parser = new Parser({ fields });
        const csv = parser.parse(data);

        // send file

        res.header("Content-Type", "text/csv");
        res.attachment("invoice.csv");
        res.send(csv)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })
    }
};


// Update Invoice 

const updateInvoice = async (req, res) => {
    try {

        const { _id, user_id, delivery_status } = req.body;

        // Step:1 find the invoice

        const checkInvoice = await paymentModel.findById(_id);

        if (checkInvoice === false) {
            return res.status(200).json({
                success: false,
                message: "Invoice not found",
            })
        };


        // step:2 prevent multipale updates

        if (delivery_status === "delivered") {
            return res.status(200).json({
                success: false,
                message: "Product already delivered",
            })
        };

        if (delivery_status === "cancel") {
            return res.status(200).json({
                success: false,
                message: "Product already cancled"
            })
        };


        // Step: 3 Handle logic based on payment_status

        const paymentStatus = checkInvoice.payment_status;

        if (paymentStatus === "success") {
            // payment successful: allow delivery or cancle

            if (delivery_status === "deliverd") {
                // Update invoice as delivered

                const data = await invoiceModel.findByIdAndUpdate(
                    { _id, user_id },
                    { delivery_status },
                    { new: true },
                )
                return res.status(200).json({
                    success: true,
                    message: "Product delivered successfully",
                    data,
                });
            };

            if (delivery_status === "cancle") {
                return res.status(200).json({
                    success: false,
                    message: "Payment is success. You can't cancle",
                    data,
                });
            };




        } else {
            // Payment not successfull: Allow only cancle

            if (delivery_status === "cancel") {
                const invoiceProducts = await invoiceProducts.find({
                    invoice_id: _id,
                });

                // Restock Each Products

                for (const item of invoiceProducts) {
                    await productsModel.updateOne(
                        { _id: item.product_id },
                        { $inc: { stock: item.qty } })
                };
            }


            // Update Invoice as canceled

            const data = await paymentModel.findByIdAndUpdate(
                { _id, user_id },
                { delivery_status },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                message: "Unpaid order canceled and stock restored",
                data,
            });
        }



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};


const invoiceController = {
    createInvoice, createOrder, getSingleOrder, getAllOrder, updateOrder, fecthAllOrder, redAllInvoice, redAllSingleInvoice,
    readInvoiceProductListSingleUser, successPayment, cancelPayment,
    failPayment, ipnPayment, allOrder, exportCsv, updateInvoice
};


export default invoiceController;