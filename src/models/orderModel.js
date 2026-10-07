import mongoose from "mongoose";

/* =========================
        ORDER ITEM
========================= */

const orderItemSchema = new mongoose.Schema(
    {



        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        product_title: {
            type: String,
            default: "",
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        size: {
            type: String,
            default: "No",
        },

        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },
    },
    {
        _id: true,
    }
);


/* =========================
        ADDRESS
========================= */

const addressSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            default: "",
        },

        last_name: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            required: true,
        },

        apartment: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        district: {
            type: String,
            required: true,
        },

        postal_code: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
    }
);


/* =========================
        ORDER SCHEMA
========================= */

const orderSchema = new mongoose.Schema(
    {

        // Customer visible unique order ID
        // Example: ORDER-FAHRJ-18926
        order_id: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        // Logged in user
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // Guest user
        guest_id: {
            type: String,
            default: null,
            index: true,
        },


        /* =========================
            CUSTOMER CONTACT
        ========================= */

        email: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            required: true,
        },


        /* =========================
            ORDER ITEMS
        ========================= */

        items: {
            type: [orderItemSchema],
            required: true,
            default: [],
        },


        /* =========================
            SHIPPING ADDRESS
        ========================= */

        shipping_address: {
            type: addressSchema,
            required: true,
        },


        /* =========================
            BILLING ADDRESS
        ========================= */

        billing_address: {
            type: addressSchema,
            default: null,
        },

        billing_same_as_shipping: {
            type: Boolean,
            default: true,
        },


        /* =========================
            PRICE
        ========================= */

        subtotal: {
            type: Number,
            required: true,
            default: 0,
        },

        shipping_rate: {
            type: Number,
            required: true,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        total: {
            type: Number,
            required: true,
            default: 0,
        },


        /* =========================
            SHIPPING
        ========================= */

        shipping_method: {
            type: String,
            enum: ["inside", "outside"],
            default: "outside",
        },


        /* =========================
            PAYMENT
        ========================= */

        payment_method: {
            type: String,
            enum: ["cod", "ssl"],
            default: "cod",
        },

        payment_status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "cancelled",
            ],
            default: "pending",
        },


        /* =========================
            ORDER STATUS
        ========================= */

        order_status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },


        /* =========================
            ORDER NOTE
        ========================= */

        order_note: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true,
    }
);


const orderModel = mongoose.model(
    "Order",
    orderSchema
);

export default orderModel;