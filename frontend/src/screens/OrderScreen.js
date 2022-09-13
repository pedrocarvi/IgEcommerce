import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
// import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading> </Loading>
        ) : error ? (
          <Message variant="alert-danger"> {error} </Message>
        ) : (
          <>
            <div className="row  order-detail">
              {/* 1 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  {/* 1 */}
                  <div className="col-md-8 center">
                    <h5>
                      <strong> Cliente </strong>
                    </h5>
                    <p> {order.user.name} </p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {" "}
                        {order.user.email}{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="col-md-8 center">
                    <h5>
                      <strong> Estado de Envio </strong>
                    </h5>
                    <p>
                      Direccion: {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                    </p>

                    {order.isDelivered ? (
                      <div className="bg-info p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Enviado {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          No enviado
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-2 col-6">
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className="col-md-3 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6> {item.name} </h6>
                          </Link>
                        </div>

                        <div className="mt-3 mt-md-0 col-md-2 col-6 d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6> {item.qty} </h6>
                        </div>

                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4> PRECIO </h4>
                          <h6> {item.price} </h6>
                        </div>

                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>SUBTOTAL</h4>
                          <h6> {item.price * item.qty} </h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>${order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${order.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
