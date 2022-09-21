import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading.js";
import Message from "../LoadingError/Error.js";
import Product from "../Product.js";
import { useParams } from "react-router-dom";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const [items, setItems] = useState([]);
  const [byCategory, setByCategory] = useState(false);
  const dispatch = useDispatch();
  const { category } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    if (category === "" || category === "All" || category === undefined) {
      setByCategory(false);
      dispatch(listProduct(keyword, pagenumber));
    } else {
      setByCategory(true);
      dispatch(listProduct(keyword, pagenumber));
      const items = products.filter((item) => item.category === category);
      setItems(items);
    }
  }, [dispatch, keyword, pagenumber, category]);

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
                ) : byCategory ? (
                  <>
                    {items.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                  </>
                ) : (
                  <>
                    {products.map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
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
