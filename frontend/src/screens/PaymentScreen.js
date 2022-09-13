// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANTE LEER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// ESTA PAGINA NO ESTA SUBIDA. ESTA PAGINA SIRVE PARA ELEGIR UN METODO DE PAGO PARA LA COMPRA. 
// INVOLUCRA ESTE ARCHIVO, CARTREDUCERS.JS , CARTCONSTANTS.JS , CARTACTIONS.JS Y SHIPPINGSCREEN.JS
// PARA VOLVER A PONERLA EN FUNCIONAMIENTO HAY QUE:
// - DESCOMENTAR ESTE ARCHIVO
// - DESCOMENTAR LA RUTA (HISTORY.PUSH) DE SHIPPINGSCREEN.JS
// - DESCOMENTAR CART_SAVE_PAYMENT_METHOD EN CARTREDUCERS.JS
// - DESCOMENTAR CART_SAVE_PAYMENT_METHOD EN CARTCONSTANTS.JS
// - DESCOMENTAR CART_SAVE_PAYMENT_METHOD EN CARTACTION.JS
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIN DEL COMENTARIO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { savePaymentMethod } from "../Redux/Actions/cartActions";
// import Header from "./../components/Header";

// const PaymentScreen = ({history}) => {
//   window.scrollTo(0, 0);

//   const cart = useSelector((state) => state.cart)
//   const {shippingAddress} = cart;

//   if (!shippingAddress) {
//     history.push('/shipping')
//   }

//   const [paymentMethod, setPaymentMethod] = useState("Efectivo");

//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod))
//     history.push("/placeorder")
//   };

//   return (
//     <>
//       <Header />
//       <div className="container d-flex justify-content-center align-items-center login-center">
//         <form
//           className="Login2 col-md-8 col-lg-4 col-11"
//           onSubmit={submitHandler}
//         >
//           <h6>SELECT PAYMENT METHOD</h6>
          
//           <select 
//             name="select"
//             required
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="Efectivo"> Efectivo </option>
//             <option value="Transferencia"> Transferencia </option>

//           </select>

//           <button type="submit">
//               Continue 
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PaymentScreen;
