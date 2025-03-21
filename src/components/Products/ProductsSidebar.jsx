import React from "react";
import config from "../../config.json"
import useData from "../../hooks/useData";
import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id} // ✅ Added a unique key here
              id={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`${config.backendURL}/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
