import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Product = ({ product, getProducts }) => {
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        toast.success("Deleted a product successfully");
        getProducts();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={product.image} alt="" className="w-full h-28 object-cover" />
      <div className="px-4 pt-2 pb-4">
        <h2 className=" text font-semibold"> {product.name}</h2>
        <div className=" text-sm">Quantity: {product.quantity}</div>
        <div className=" text-sm">Price ${product.price}</div>

        <div className="mt-2 flex gap-4">
          <Link
            className=" inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
            to={`/edit/${product._id}`}
          >
            Edit
          </Link>
        </div>

        <div className="mt-2 flex gap-4">
          <button
            className=" inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
