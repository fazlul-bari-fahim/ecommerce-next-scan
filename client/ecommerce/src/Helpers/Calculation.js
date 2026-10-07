


const cartCalculation = (allCart, city) => {


    let subtotal = 0;
    let discount = 0;
    let afterDiscount = 0;
    let vat = 0;


    allCart?.map((item) => {

        const regularPrice = item?.regular_price;
        const salePrice = item?.discount_price || regularPrice;

        subtotal += regularPrice * item?.qty;
        discount += (regularPrice - salePrice) * item?.qty;
        afterDiscount = subtotal - discount;
        vat = 0;



    });


    // Dhaka হলে 80, অন্য city হলে 120
    const shipping = city === "Dhaka" ? 80 : 120;

    const total = afterDiscount + vat + shipping;

    return {
        subtotal,
        discount,
        afterDiscount,
        vat,
        shipping,
        total


    }





};


export default cartCalculation;