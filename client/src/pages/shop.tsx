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
    "http://localhost:8080/api/products/category/" + category
  );

  // const matchWithQuery = (item: Product): boolean =>
  //   item.name.toLowerCase().includes(query.trim().toLowerCase());

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
