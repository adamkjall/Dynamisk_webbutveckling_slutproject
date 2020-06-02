import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "grommet";

import useFetch from "../hooks/useFetch";
import Item from "../components/item";

import { Product } from "../shop.data";

interface IProps {
  query: string;
}

const Shop: FC<IProps> = ({ query }) => {
  // const [products, setProducts] = useState<Product[]>(null);
  const { category } = useParams();
  const { loading, data: products } = useFetch(
    // "http://localhost:8080/api/products/category/" + category
    "http://localhost:8080/api/products/"
  );

  console.log("prod", products);

  // const matchWithQuery = (item: Product): boolean =>
  //   item.name.toLowerCase().includes(query.trim().toLowerCase());

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
      {/* // category === "search" && query
      //   ? collections.map((collection: Collection) =>
      //       collection.items
      //         .filter(matchWithQuery)
      //         .map((item: Product) => <Item key={item.id} item={item} />)
      //     )
      //   : */}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        products &&
        products.map((item: Product) => <Item key={item._id} item={item} />)
      )}
    </Box>
  );
};

export default Shop;
