


const cartCalculation = (allCart) => {

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
        vat = (afterDiscount * 15) / 100;



    });


    const shipping = 130;

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