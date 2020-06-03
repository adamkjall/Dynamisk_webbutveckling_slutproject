import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import { Box } from "grommet";
import Product, { IProduct } from "../components/product";

const Shop = () => {
  const { category, query } = useParams();
  const {
    response: products,
    loading,
  } = useFetch(
    `http://localhost:8080/api/products/${
      category !== "search" ? "category/" + category : ""
    }`,
    {},
    [category]
  );

  console.log("prod", products);

  const matchWithQuery = (product: IProduct): boolean => {
    if (category === "search") {
      return product.title
        .trim()
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    }
    return true;
  };

  return (
    <Box
      key="0"
      pad={{ top: "medium", bottom: "medium" }}
      style={{
        gridArea: "main",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "small",
        justifyContent: "center",
        overflowY: "scroll",
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : (
        products &&
        products
          .filter(matchWithQuery)
          .map((product: IProduct) => (
            <Product key={product._id} product={product} />
          ))
      )}
    </Box>
  );
};

export default Shop;

//******** Perhaps useful code so saving it here ************/

// useEffect(() => {
//   if (!products) return;

//   products.forEach((item) => {
//     fetch(item.image)
//       .then((res) => res.blob())
//       .then((blob) => {
//         const formData = new FormData();
//         formData.append("type", "file");
//         formData.append("image", blob);
//         formData.append("id", item._id);
//         return formData;
//       })
//       .then((data) => {
//         fetch("http://localhost:8080/api/files", {
//           method: "POST",
//           body: data,
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             const updatedItem = {
//               title: item.title,
//               image: data.id,
//               price: item.price,
//               sizes: item.sizes,
//               category: item.category,
//               desc: item.desc,
//             };
//             fetch("http://localhost:8080/api/products/" + item._id, {
//               method: "PUT",
//               headers: {
//                 "Content-type": "application/json",
//               },
//               body: JSON.stringify(updatedItem),
//             });
//           });
//       });
//   });
// }, [products]);
