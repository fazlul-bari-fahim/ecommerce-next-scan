import SingleProduct from "../Components/SingleProduct"

import { useEffect } from "react";
import { useParams } from "react-router-dom"
import productStore from "../Store/ProductStore";


const CategoryProductPage = () => {

    const _id = useParams();
    const id = _id?.id;



    const { categoryProduct, categoryProductRequest } = productStore();

    useEffect(() => {
        const fetchData = async () => {


            await categoryProductRequest({ id });


        }; fetchData();
    }, [id])



    return (
        <div className=" my-10 mx-20 grid grid-cols-3 max-[801px]:grid-cols-2 max-[426px]:grid-cols-1 gap-y-10">

            {/* product card */}



            {
                categoryProduct?.map((item) => (
                    <SingleProduct key={item?._id} product={item} />
                ))
            }





        </div>




    )
}

export default CategoryProductPage