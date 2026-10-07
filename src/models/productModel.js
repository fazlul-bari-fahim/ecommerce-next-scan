import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema(
    {
        pro_title: {
            type: String,
            required: true,
        },

        pro_sub_title: {
            type: String,
            required: true,
        },

        pro_details: {
            type: String,
            required: true,
        },

        pro_parent_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        pro_child_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        pro_stock: {
            type: Number,
            required: true,
        },

        pro_color: {
            type: [String],
            default: [""],
        },

        // // =====================================================
        // // IMAGE TYPE
        // // =====================================================

        pro_image_type: {
            type: String,
            enum: ["normal", "group"],
            default: "normal",
            required: true,
        },

        // Normal images
        product_images: {
            type: [String],
            default: [],
            validate: {
                validator: function (value) {
                    return value.length <= 5;
                },
                message: "Maximum 5 product images are allowed",
            },
        },

        // // Group images
        group_images: {
            type: [
                {


                    type: String,
                    default: null,

                },
            ],

            default: [],

            validate: {
                validator: function (value) {
                    return value.length <= 5;
                },
                message: "Maximum 5 group images are allowed",
            },
        },

        group_images_price: {
            type: [
                {


                    type: String,
                    default: "",

                },
            ],

            default: [],

            validate: {
                validator: function (value) {
                    return value.length <= 5;
                },
                message: "Maximum 5 group Prices are allowed",
            },
        },

        // // =====================================================
        // // PRICE TYPE
        // // =====================================================

        pro_price_type: {
            type: String,
            enum: ["single", "group"],
            default: "single",
            required: true,
        },

        // single price size
        pro_size: {
            type: [String],
            default: ["No"],
        },

        // // Single price
        regular_price: {
            type: Number,
            default: 0,
        },

        offer_price: {
            type: Number,
            default: 0,
        },

        // // Group price
        group_prices: {
            type: [
                {
                    size: {
                        type: String,
                        required: true,

                    },

                    price: {
                        type: Number,
                        required: true,
                    },
                },
            ],

            default: [],
        },

        // // =====================================================
        // // OTHER
        // // =====================================================

        support_services: {
            type: String,
            required: true,
        },

        terms_conditions: {
            type: String,
            required: true,
        },

        shipping: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);



const productsModel = mongoose.model(
    "Product",
    productModelSchema
);

export default productsModel;
