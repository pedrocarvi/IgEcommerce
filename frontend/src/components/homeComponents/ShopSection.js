import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  listProductsByCategory,
} from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading.js";
import Message from "../LoadingError/Error.js";
import Product from "../Product.js";
import { useParams } from "react-router-dom";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const { category, pageNumber } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productListByCategory = useSelector(
    (state) => state.productListByCategory
  );
  const { pagesByCategory } = productListByCategory;

  useEffect(() => {
    if (category === "" || category === "All" || category === undefined) {
      dispatch(listProduct(keyword, pagenumber));
    } else {
      dispatch(listProductsByCategory(keyword, pageNumber, category));
    }
  }, [dispatch, keyword, pagenumber, category, pageNumber]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={category ? pagesByCategory : pages}
                  page={category ? pagesByCategory : page}
                  keyword={keyword ? keyword : ""}
                  category={category ? category : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
