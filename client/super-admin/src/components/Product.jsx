import image from "../assets/image.png"


const Product = () => {
  return (

    <div className="bg-[#e4e4e4] w-auto h-370 flex  justify-center">
            
            
            <div className="grid grid-cols-1 px-5">
    
              {/* 1 card */}
              <div className="bg-white w-150 h-150 rounded-2xl shadow shadow-black/30 my-20 py-10 px-10">
            <form>
        
              {/* 1st section */}
              <div className="flex flex-row gap-2 w-130 justify-center">
                {/* Img section */}
                  <div className="w-70">
        
                    {/* long img */}
                    <div>
                      <img className="h-35 w-35" src={image}></img>
        
                    </div>
        
                    {/* Short img */}
                    <div className="flex flex-row gap-2 py-10">
        
                      <img className="h-8 w-8" src={image}></img>
                      <img className="h-8 w-8" src={image}></img>
                      <img className="h-8 w-8" src={image}></img>
                      <img className="h-8 w-8" src={image}></img>
                      
        
                    </div>
                <div className=" flex flex-col gap-3">
                    {/* stock */}
       
                     <div className="flex flex-row gap-2">
                      <h3>Stock:</h3>
                      <h3>30</h3>
                    </div>
         
               
        
                  {/* Discount */}
        
                   <div className="flex flex-row gap-3">
                      <h3>Is Discount:</h3>
                      <h3>Yes</h3>
                     
                      
                     
                    </div>
              </div>
        
                  </div>
        
        
                  {/* Info section */}
        
                  <div className="flex flex-col gap-5 w-80">
                      {/* Title */}
                    <div className="flex flex-col gap-1">
                      <h1 className="text-md font-bold">Premium Wireless Bluetooth Headphones</h1>
                      <h3 className="text-[10px]">Premium Sound Quality for Everyday Listening</h3>
                      
                    </div>
                      
                   
        
                    {/* Brand & Category */}
                    <div className="flex flex-row gap-3">
        
                      {/* Brand */}
                      <div className="flex flex-col gap-2">
        
                        <h1 className="font-bold text-black/70 text-[10px]">A&S Fashion</h1>
        
                      </div>
        
                      {/* Category */}
                      <div className="flex flex-col gap-2 ">
        
                        <h3 className="font-bold text-black/40 text-[10px]">Gadget</h3>
        
                      </div>
        
        
                    </div>
        
                    {/* Short Description */}
                    <div className="felx text-[12px]">
                      <p>Experience crystal-clear sound, deep bass, and all-day comfort with our premium wireless Bluetooth headphones. Perfect for music, gaming, calls, and daily use.</p>
                    </div>
        
                    {/* Price */}
                    <div className="flex flex-col ">
        
                      <div className="flex gap-2">
                        <strike className="font-bold  text-md text-red-700 strike">599</strike>
                      </div>
        
                      <div className="flex gap-2">
                        <h3 className="text-xl text-green-500 font-bold">499</h3>
                      </div>
        
                    </div>
        
                    {/* Size */}
                     <div className=" flex flex-row gap-3">
    
                      
                      <h3 className="bg-pink-300 h-5 w-5 text-[10px] font-bold rounded-md flex justify-center items-center">S</h3>
                      <h3 className="bg-pink-300 h-5 w-5 text-[10px] font-bold rounded-md flex justify-center items-center">M</h3>
                      <h3 className="bg-pink-300 h-5 w-5 text-[10px] font-bold rounded-md flex justify-center items-center">L</h3>
                      <h3 className="bg-pink-300 h-5 w-5 text-[10px] font-bold rounded-md flex justify-center items-center">XL</h3>
    
                     </div>
       
        
                    {/* Color */}
                   <div className="flex flex-row  gap-3">
                    <h3 className="text-md">Color:</h3>
                    <div className="bg-red-500 h-5 w-5 border"></div>
                    <div className="bg-green-500 h-5 w-5 border"></div>
                    <div className="bg-white-500 h-5 w-5 border"></div>
                   </div>
                    
                  {/* Button */}
                      <div className="flex gap-5">   
                        <button type="submint" className="bg-[#ff8618] h-8 w-40 rounded-md text-white shadow shadow-black hover:cursor-pointer">Update Product</button>
                    <button type="submint" className="bg-red-700 h-8 w-40 rounded-md text-white shadow shadow-black hover:cursor-pointer">Delete Product</button>
                      </div>
                  </div>
        
              </div>
        
              {/* 2nd section */}
              <div className="pt-10 flex flex-col gap-3">
        
                
                <p className="text-gray-700 text-[12px] text-justify">Experience premium sound quality with these stylish and comfortable headphones designed for everyday use. Enjoy crystal-clear audio, deep bass, and immersive stereo sound whether you are listening to music, watching movies, gaming, or taking calls. The ergonomic and lightweight design ensures maximum comfort even during long hours of use. Built with durable materials and modern technology, these headphones deliver reliable performance and a smooth listening experience. Perfect for travel, work, study, and entertainment, they are the ideal choice for anyone who loves high-quality sound and modern style.</p>
        
              </div>
        
            </form>
        
            </div>
    
        
    
    
    
    
    
            </div>
        
      
    
    
      
           </div>
    




  )
}

export default Product