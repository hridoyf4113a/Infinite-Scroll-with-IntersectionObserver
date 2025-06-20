import React from "react";

function Products({ products }) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="w-[40%] flex p-6 bg-gray-900 rounded-md m-2 ">
          <div className=" h-80 w-[50%] rounded-md bg-gray-800 overflow-hidden ">
            <img
              className="object-cover w-full h-full rounded-md"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="w-[50%] h-80 px-6 rounded-md ">
            <h2 className="text-2xl font-bold">{product.title}!</h2>
            <p className="text-md leading-5 mt-2">
              {product.description}
            </p>
            <p className="mt-4 text-md font-bold">
              Category : <span className="text-gray-300">{product.category}</span>
            </p>
            <p className=" text-md font-bold">
              Price : <span className="text-gray-300">{product.price}</span>
            </p>
            <a href="#" className="underline text-sky-800">
              see customer's review
            </a>
            <div className="w-full mt-4 flex gap-2">
              <button className=" px-4 py-2 text-lg active:scale-98 cursor-pointer font-extrabold rounded-md bg-green-700 text-black">
                Add To Cart!
              </button>
              <button className="py-2 px-4 text-lg active:scale-98 cursor-pointer font-extrabold rounded-md text-black bg-red-700">
                Buy Now!
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Products;
