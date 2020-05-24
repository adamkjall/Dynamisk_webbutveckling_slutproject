import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "grommet";

import Item from "../components/item";

import { Collection, CollectionItem } from "../shop.data";

interface IProps {
  query: string;
}

const Shop: FC<IProps> = ({ query }) => {
  const [collections, setCollection] = useState<Collection[]>([]);
  const { category } = useParams();

  useEffect(() => {
    const localStorageCollections = localStorage.getItem("collection");
    if (localStorageCollections) {
      setCollection(JSON.parse(localStorageCollections));
    }
  }, []);

  const getCurrentCollectionItems = (): CollectionItem[] => {
    if (collections.length) {
      const col = collections.find(
        (collection: Collection) => collection.routeName === category
      );
      if (col) return col.items;
    }
    return [];
  };

  const matchWithQuery = (item: CollectionItem): boolean =>
    item.name.toLowerCase().includes(query.trim().toLowerCase());

  return (
    <Box
      key="0"
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
      {category === "search" && query
        ? collections.map((collection: Collection) =>
            collection.items
              .filter(matchWithQuery)
              .map((item: CollectionItem) => <Item key={item.id} item={item} />)
          )
        : getCurrentCollectionItems().map((item: CollectionItem) => (
            <Item key={item.id} item={item} />
          ))}
    </Box>
  );
};

export default Shop;
