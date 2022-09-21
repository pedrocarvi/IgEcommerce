import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = (props) => {
  const { product } = props;

  return (
    <>
      <div className="shop col-lg-4 col-md-6 col-sm-6" key={product._id}>
        <div className="border-product">
          <Link to={`/products/${product._id}`}>
            <div className="shopBack">
              <img src={product.image} alt={product.name} />
            </div>
          </Link>

          <div className="shoptext">
            <p>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </p>

            <h3>${product.price}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
