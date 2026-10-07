import orderModel from "../models/orderModel.js";


const generateOrderId = async () => {

    let orderId;
    let exists = true;

    while (exists) {

        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let randomText = "";

        for (let i = 0; i < 5; i++) {

            randomText += characters.charAt(
                Math.floor(
                    Math.random() *
                    characters.length
                )
            );
        }

        const randomNumber =
            Math.floor(
                10000 +
                Math.random() * 90000
            );

        orderId =
            `ORDER-${randomText}-${randomNumber}`;


        // Check duplicate
        exists = await orderModel.exists({
            order_id: orderId,
        });
    }

    return orderId;
};


/* =========================
        CREATE ORDER
========================= */

const createOrder = async (req, res) => {

    try {

        const data = req.body.data;


        /* =========================
            VALIDATION
        ========================= */

        if (!data) {

            return res.status(400).json({
                success: false,
                message: "Order data is required",
            });
        }


        if (
            !data.items ||
            data.items.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }


        if (!data.phone) {

            return res.status(400).json({
                success: false,
                message:
                    "Phone number is required",
            });
        }


        if (
            !data.shipping_address?.address
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Shipping address is required",
            });
        }


        /* =========================
            GENERATE ORDER ID
        ========================= */

        const orderId =
            await generateOrderId();


        /* =========================
            USER / GUEST
        ========================= */

        const userId =
            req.user?._id || null;

        const guestId =
            userId
                ? null
                : data.guest_id || null;


        /* =========================
            CREATE ORDER
        ========================= */

        const order =
            await orderModel.create({

                order_id: orderId,

                user_id: userId,

                guest_id: guestId,


                /* CUSTOMER */

                email:
                    data.email || "",

                phone:
                    data.phone,


                /* ITEMS */

                items:
                    data.items,


                /* SHIPPING */

                shipping_address:
                    data.shipping_address,


                /* BILLING */

                billing_address:
                    data.billing_address || null,

                billing_same_as_shipping:
                    data.billing_same_as_shipping ??
                    true,


                /* PRICE */

                subtotal:
                    Number(
                        data.subtotal || 0
                    ),

                shipping_rate:
                    Number(
                        data.shipping_rate || 0
                    ),

                discount:
                    Number(
                        data.discount || 0
                    ),

                total:
                    Number(
                        data.total || 0
                    ),


                /* SHIPPING METHOD */

                shipping_method:
                    data.shipping_method ||
                    "outside",


                /* PAYMENT */

                payment_method:
                    data.payment_method ||
                    "cod",

                payment_status:
                    "pending",


                /* ORDER STATUS */

                order_status:
                    "pending",


                /* NOTE */

                order_note:
                    data.order_note || "",
            });


        /* =========================
            SUCCESS RESPONSE
        ========================= */

        return res.status(201).json({

            success: true,

            message:
                "Order Complete successfully",

            data: {

                _id:
                    order._id,

                order_id:
                    order.order_id,

                user_id:
                    order.user_id,

                guest_id:
                    order.guest_id,

                total:
                    order.total,

                payment_method:
                    order.payment_method,

                payment_status:
                    order.payment_status,

                order_status:
                    order.order_status,

                createdAt:
                    order.createdAt,
            },
        });


    } catch (error) {

        console.error(
            "CREATE ORDER ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to create order",

            error:
                error.message,
        });
    }
};




// get single order


const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });

    } catch (error) {

        console.error("GET SINGLE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get order",
            error: error.message,
        });
    }
};






const getAllOrders = async (req, res) => {
    try {
        const page_no = Math.max(
            Number(req.params.page_no) || 1,
            1
        );

        const per_page = Math.max(
            Number(req.params.per_page) || 10,
            1
        );

        const skip = (page_no - 1) * per_page;

        // Database এ মোট কয়টা order আছে
        const totalOrders = await orderModel.countDocuments({});

        // Current page এর orders
        const orders = await orderModel
            .find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(per_page);

        // Total pages
        const totalPages = Math.ceil(
            totalOrders / per_page
        );

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",

            // Current page এর orders
            data: orders,

            // Database এ মোট order
            total_order: totalOrders,

            pagination: {
                page_no: page_no,
                per_page: per_page,

                total_orders: totalOrders,
                total_pages: totalPages,

                next_page:
                    page_no < totalPages
                        ? page_no + 1
                        : null,

                previous_page:
                    page_no > 1
                        ? page_no - 1
                        : null,
            },
        });

    } catch (error) {

        console.log(
            "Get All Orders Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get orders",
            error: error.message,
        });
    }
};




const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_status } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        const allowedStatus = [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
        ];

        if (!allowedStatus.includes(order_status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await orderModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    order_status: order_status,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: {
                _id: order._id,
                order_id: order.order_id,
                order_status: order.order_status,
            },
        });

    } catch (error) {
        console.error(
            "UPDATE ORDER STATUS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
    }
};




const orderController = { createOrder, getSingleOrder, getAllOrders, updateOrderStatus }

export default orderController;