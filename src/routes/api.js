
import express from "express";
const router = express.Router()
import adminController from "../controllers/adminController.js";
import authVerificationAdmin from "../middlewares/authVerificationAdmin.js";
import userController from "../controllers/userController.js";
import authVerificationUser from "../middlewares/authVerificationUser.js";
import productController from "../controllers/productController.js";
import categoryController from "../controllers/categoryController.js";
import brandController from "../controllers/brandController.js";
import reviewController from "../controllers/reviewController.js";
import cartController from "../controllers/cartController.js";
import invoiceController from "../controllers/invoiceController.js";
import upload from "../middlewares/fileUpload.js";
import fileController from "../controllers/fileController.js";
import dashboardController from "../controllers/dashboardControllerSummary.js";
import { DownloadInvoice } from "../controllers/InvoiceDownload.js";
import HotDealController from "../controllers/HotDealController.js";



// Admin Route
router.post("/admin-register", adminController.register);
router.post("/admin-login", adminController.login);
router.get("/admin", authVerificationAdmin, adminController.admin);
router.get("/admin-verify", authVerificationAdmin, adminController.adminVerify);
router.get("/admin-logout", authVerificationAdmin, adminController.logOut);
router.put("/admin-update", authVerificationAdmin, adminController.update);




// User Route
router.post("/user-register", userController.register);
router.post("/user-login", userController.login);
router.get("/user", authVerificationUser, userController.user);
router.get("/user-verify", authVerificationUser, userController.userVerify);
router.get("/user-logout", authVerificationUser, userController.logout);
router.put("/user-update", authVerificationUser, userController.update);
router.get("/all-user", authVerificationAdmin, userController.Alluser);


// Products Route
router.post("/product-create", authVerificationAdmin, upload.fields(
    [
        { name: "big_image", maxCount: 1 },
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]
), productController.createProduct);
router.get("/all-products/:category_id/:brand_id/:remark/:keyword/:per_page/:page_no", upload.fields(
    [
        { name: "big_image", maxCount: 1 },
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]
), productController.allProducts);
router.get("/single-products/:id", productController.singleProducts);
router.get("/category-products/:id", productController.categoryProducts);
router.put("/update-products/:id", authVerificationAdmin, upload.fields(
    [
        { name: "big_image", maxCount: 1 },
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]
), productController.updateProducts);
router.delete("/delete-products/:id", authVerificationAdmin, productController.deleteProduct);
router.get("/search-suggestion/:keyword", productController.searchSuggestion);



// Category Route
router.post("/category-create", authVerificationAdmin, upload.single("category_image"), categoryController.create);
router.get("/all-category/:per_page/:page_no", categoryController.getAllCategory);
router.get("/single-category/:id", categoryController.getSingleCategory);
router.put("/update-category/:id", authVerificationAdmin, upload.single("category_image"), categoryController.updateCategory);
router.delete("/delete-category/:id", authVerificationAdmin, categoryController.deleteCategory);


// Brand Route 
router.post("/brand-create", authVerificationAdmin, upload.single("brand_image"), brandController.create);
router.get("/all-brand/:per_page/:page_no", upload.single("brand_image"), brandController.getAllBrand);
router.get("/single-brand/:id", brandController.getSingleBrand);
router.put("/update-brand/:id", upload.single("brand_image"), brandController.updateBrand);
router.delete("/delete-brand/:id", brandController.deleteBrand);


// Review Route
router.post("/review-create", authVerificationUser, reviewController.create);
router.get("/all-review/:per_page/:page_no", reviewController.getAllReview);
router.get("/all-review-by-product/:product_id", reviewController.getAllReviewByProduct);


// Cart Route
router.post("/create-cart", authVerificationUser, upload.fields([{ name: "big_image", maxCount: 1 }]), cartController.createCart);
router.get("/read-cart", authVerificationUser, upload.fields([{ name: "big_image", maxCount: 1 }]), cartController.readCart);
router.put("/update-cart/:cart_id", authVerificationUser, cartController.updateCart);
router.delete("/delete-cart/:cart_id", authVerificationUser, cartController.cartDelete);



// for user


// Invoice route
router.post("/create-invoice", authVerificationUser, invoiceController.createInvoice);
router.get("/read-all-invoice-single-user/:per_page/:page_no", authVerificationUser, invoiceController.redAllInvoice);
router.get("/read-single-invoice-single-user/:invoice_id", authVerificationUser, invoiceController.redAllSingleInvoice);
router.get("/read-invoice-product-list-single-user/:per_page/:page_no", authVerificationUser, invoiceController.readInvoiceProductListSingleUser);

//Order for Non payment route
router.post("/create-order", authVerificationUser, invoiceController.createOrder);
router.get("/getsingle-order/:_id", invoiceController.getSingleOrder);

//  Update Order
router.put("/update-order/:_id", authVerificationAdmin, invoiceController.updateOrder);

// for user
router.get("/getall-order", authVerificationUser, invoiceController.getAllOrder);

// for admin
router.get("/get-all-order", authVerificationAdmin, invoiceController.fecthAllOrder);


// Payment route

router.post("/payment-success", invoiceController.successPayment);
router.post("/payment-cancle", invoiceController.cancelPayment);
router.post("/payment-fail", invoiceController.failPayment);

// for Admin

router.get("/all-order-list/:per_page/:page_no", authVerificationAdmin, invoiceController.allOrder)

// /all-order-list/20/1?from=2026-04-05&to=2026-04-09

router.get("/export-csv", authVerificationAdmin, invoiceController.exportCsv);
router.put("/update-invoice", authVerificationAdmin, invoiceController.updateInvoice);



// file upload router
router.post("/file-upload", authVerificationAdmin, upload.single("file"), fileController.fileUpload);
router.get("/all-file/:per_page/:page_no", fileController.allFile);
router.post("/remove-file", authVerificationAdmin, fileController.removeFile);

// Dashboard
router.get("/dashboard-summary", dashboardController);


// Invoice

router.get("/invoice/:id", authVerificationUser, DownloadInvoice);



// Hot Deal

router.post("/hotdeal-create", authVerificationAdmin, HotDealController.create);
router.get("/hotdeal-get", HotDealController.get);
router.delete("/hotdeal-delete/:id", authVerificationAdmin, HotDealController.HotDealdelete);




export default router;