// import React, { useContext } from "react";
// import "./ProductCard.css";
// import config from "../../config.json"

// import star from "../../assets/white-star.png";
// import basket from "../../assets/basket.png";
// import { NavLink } from "react-router-dom";
// import CartContext from "../../context/CartContext";
// import UserContext from "../../context/UserContext";

// const ProductCard = ({
//   product,
//   // id,
//   // image,
//   // price,
//   // title,
//   // rating,
//   // ratingCounts,
//   // stock,
// }) => {
//   const { addToCart } = useContext(CartContext);
//   const user = useContext(UserContext)
//   return (
//     <article className="product_card">
//       <div className="product_image">
//         <NavLink to={`/product/${product?._id}`}>
//           <img
//             src={`${config.backendURL}/products/${product?.images[0]}`}
//             alt="product image"
//           />
//         </NavLink>
//       </div>

//       <div className="product_details">
//         <h3 className="product_price">${product?.price}</h3>
//         <p className="product_title">{product?.title}</p>
//         <footer className="align_center product_info_footer">
//           <div className="align_center">
//             <p className="align_center product_rating">
//               <img src={star} alt="star" />
//               {product?.reviews.rate}
//             </p>
//             <p className="product_review_count">{product?.reviews.counts}</p>
//           </div>
//           {product?.stock > 0 && user && (
//             <button
//               className="add_to_cart"
//               onClick={() => addToCart(product, 1)}
//             >
//               <img src={basket} alt="basket button" />
//             </button>
//           )}
//         </footer>
//       </div>
//     </article>
//   );
// };

// export default ProductCard;


import React, { useContext } from "react";
import "./ProductCard.css";
import config from "../../config.json";

import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  // ✅ Check if product exists before accessing its properties
  if (!product) {
    return <div className="error">Product data is missing</div>;
  }

  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product._id || ""}`}>
          <img
            src={
              product.images?.length
                ? `${config.backendURL}/products/${product.images[0]}`
                : "fallback-image.jpg" // ✅ Use a fallback image
            }
            alt={product.title || "Product"}
          />
        </NavLink>
      </div>

      <div className="product_details">
        <h3 className="product_price">${product.price ?? "N/A"}</h3>
        <p className="product_title">{product.title || "No title available"}</p>
        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" />
              {product.reviews?.rate ?? "No rating"} {/* ✅ Safe access */}
            </p>
            <p className="product_review_count">
              {product.reviews?.counts ?? "No reviews"}
            </p>
          </div>
          {product.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;

