import React, { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Grid, Box, ResponsiveContext } from "grommet";
import Directory from "../components/directory";
import Item from "../components/item";

import { Collection, CollectionItem } from "../shop.data";

interface IProps {}

const Shop: FC<IProps> = () => {
  const [collections, setCollection] = useState<Collection[]>([]);

  const { category, query = "" } = useParams();

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

  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";

  const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"]
  };

  const rows = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"]
  };

  const areas = {
    small: [{ name: "main", start: [0, 0], end: [0, 0] }],
    medium: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ],
    large: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ],
    xlarge: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ]
  };
  const main = (
    <Box
      key="0"
      style={{
        gridArea: "main",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "small",
        justifyContent: "center",
        overflowY: "scroll"
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
  const directory = <Directory key="1" />;

  const components = {
    small: [main],
    medium: [main, directory],
    large: [main, directory],
    xlarge: [main, directory]
  };
  return (
    <Grid
      fill
      responsive={true}
      areas={areas[size]}
      columns={columns[size]}
      rows={rows[size]}
      gap="small"
    >
      {components[size]}
    </Grid>
  );
};

export default Shop;
