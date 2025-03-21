// import React, { useState, useEffect, useContext } from "react";
// import "./CartPage.css";
// import config from "../../config.json"
// import UserContext from "../../context/UserContext";
// import Table from "../Common/Table";
// import QuantityInput from "../SingleProduct/QuantityInput";
// import remove from "../../assets/remove.png";
// import CartContext from "../../context/CartContext";
// import { checkoutAPI } from "../../Services/orderServices";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const [subTotal, setSubTotal] = useState(0);
//   const user = useContext(UserContext);
//   const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

//   useEffect(() => {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.product.price * item.quantity;
//     });

//     setSubTotal(total);
//   }, [cart]);

//   const checkout = () => {
//     const oldCart =[...cart]
//     setCart([]);
//     checkoutAPI().then(() => {
//       toast.success("Order placed successfully!");
//     }).catch(() => {
//       toast.error("Something went wrong!")
//       setCart(oldCart)
//     })
//   };

//   return (
//     <section className="align_center cart_page">
//       <div className="align_center user_info">
//         <img
//           src={`${config.backendURL}/profile/${user?.profilePic}`}
//           alt="user profile"
//         />
//       </div>
//       <div>
//         <p className="user_name">Name: {user?.name}</p>
//         <p className="user_email">Email: {user?.email}</p>
//       </div>

//       {/* {Cart Table} */}
//       <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
//         <tbody>
//           {cart.map(({ product, quantity }) => (
//             <tr key={product._id}>
//               <td>{product.title}</td>
//               <td>${product.price}</td>
//               <td className="align_center table_quantity_input">
//                 <QuantityInput
//                   quantity={quantity}
//                   stock={product.stock}
//                   setQuantity={updateCart}
//                   cartPage={true}
//                   productId={product._id}
//                 />
//               </td>
//               <td>${quantity * product.price}</td>
//               <td>
//                 <img
//                   src={remove}
//                   alt="remove icon"
//                   className="cart_remove_icon"
//                   onClick={() => removeFromCart(product._id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* {cart_bill tabel} */}

//       <table className="cart_bill">
//         <tbody>
//           <tr>
//             <td>Subtotal</td>
//             <td>${subTotal}</td>
//           </tr>
//           <tr>
//             <td>Shipping Charge</td>
//             <td>$10</td>
//           </tr>
//           <tr className="cart_bill_final">
//             <td>Total</td>
//             <td>${subTotal + 10}</td>
//           </tr>
//         </tbody>
//       </table>
//       <button className="search_button checkout_button" onClick={checkout}>
//         Checkout
//       </button>
//     </section>
//   );
// };

// export default CartPage;


import React, { useState, useEffect, useContext } from "react";
import "./CartPage.css";
import config from "../../config.json";
import UserContext from "../../context/UserContext";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import CartContext from "../../context/CartContext";
import { checkoutAPI } from "../../Services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  // Debugging: Log cart data
  // console.log("Cart Data:", cart);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      if (item.product) {
        total += item.product.price * item.quantity;
      }
    });

    setSubTotal(total);
  }, [cart]);

  const checkout = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }

    const oldCart = [...cart];
    setCart([]);

    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
      </div>
      <div>
        <p className="user_name">Name: {user?.name || "Guest"}</p>
        <p className="user_email">Email: {user?.email || "Not Available"}</p>
      </div>

      {/* Cart Table */}
      {cart.length === 0 ? (
        <p className="empty_cart_message">Your cart is empty!</p>
      ) : (
        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
          <tbody>
            {cart.map(({ product, quantity }) => {
              if (!product) return null; // Skip rendering if product is null

              return (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td className="align_center table_quantity_input">
                    <QuantityInput
                      quantity={quantity}
                      stock={product.stock}
                      setQuantity={updateCart}
                      cartPage={true}
                      productId={product._id}
                    />
                  </td>
                  <td>${quantity * product.price}</td>
                  <td>
                    <img
                      src={remove}
                      alt="remove icon"
                      className="cart_remove_icon"
                      onClick={() => removeFromCart(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* Cart Summary Table */}
      {cart.length > 0 && (
        <table className="cart_bill">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${subTotal}</td>
            </tr>
            <tr>
              <td>Shipping Charge</td>
              <td>$10</td>
            </tr>
            <tr className="cart_bill_final">
              <td>Total</td>
              <td>${subTotal + 10}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <button className="search_button checkout_button" onClick={checkout}>
          Checkout
        </button>
      )}
    </section>
  );
};

export default CartPage;
