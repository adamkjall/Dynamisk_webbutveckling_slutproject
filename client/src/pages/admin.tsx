import React, { useEffect, useState } from "react";

import {
  Main,
  Text,
  Heading,
  Box,
  Image,
  Button,
  Layer,
  Form,
  TextArea,
  CheckBox,
} from "grommet";
import { AddCircle, SubtractCircle, FormEdit } from "grommet-icons";

import useFetch from "../hooks/useFetch";
import { IProduct } from "../components/product";
import FormFieldLabel from "../components/form-field-label";

// import { Collection, Product } from "../shop.data";

const initialInputs = {
  title: "",
  image: "",
  price: "",
  size: [""],
  desc: "",
};

const Admin = () => {
  const [collections, setCollections] = useState<[IProduct[]]>(null);
  const [open, setOpen] = useState(false);
  // const [category, setCategory] = useState("none");
  // const [itemToEdit, setItemToEdit] = useState<Product>();
  // const [inputs, setInputs] = useState(initialInputs);
  // const [editOrAdd, setEditOrAdd] = useState<"edit" | "add">("add");

  const { response: products, error, loading } = useFetch(
    "http://localhost:8080/api/products",
    {},
    []
  );
  console.log("prod", products);

  useEffect(() => {
    if (!products) return;
    const collectionsObj = {};
    products.forEach((product: IProduct) => {
      if (!collectionsObj[product.category]) {
        collectionsObj[product.category] = [product];
      } else {
        collectionsObj[product.category] = [
          ...collectionsObj[product.category],
          product,
        ];
      }
    });
    const collectionsMatrix = Object.values(collectionsObj) as [IProduct[]];
    setCollections(collectionsMatrix);

    const toCollectionsMatrix = products.reduce((matrix, product) => {}, []);
  }, [products]);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  useEffect(() => {}, []);

  // const addToCollection = () => {
  //   const item: Product = {
  //     id: calculateNextItemId(),
  //     title: inputs.title,
  //     image: inputs.image,
  //     price: Number(inputs.price),
  //     size: inputs.size,
  //     desc: inputs.desc,
  //   };

  //   const updatedCollections = collections.map((collection) => {
  //     if (collection.routeName === category) {
  //       return {
  //         ...collection,
  //         items: [...collection.items, item],
  //       };
  //     } else {
  //       return { ...collection };
  //     }
  //   });

  //   setCollections(updatedCollections);
  //   localStorage.setItem("collection", JSON.stringify(updatedCollections));
  //   onClose();
  // };

  // const removeFromCollection = (itemId: string) => {
  //   const updatedCollections = collections.map((collection) => ({
  //     ...collection,
  //     items: collection.items.filter((item) => item._id !== itemId),
  //   }));

  //   setCollections(updatedCollections);
  //   localStorage.setItem("collection", JSON.stringify(updatedCollections));
  // };

  // const editItem = () => {
  //   const updatedCollections = collections.map((collection) => {
  //     if (itemToEdit !== undefined) {
  //       let itemIndex = collection.items.findIndex(
  //         (item) => item._id === itemToEdit._id
  //       );

  //       if (itemIndex !== -1) {
  //         // if we found the index of the item
  //         collection.items[itemIndex] = {
  //           ...itemToEdit,
  //           title: inputs.title,
  //           image: inputs.image,
  //           price: Number(inputs.price),
  //           sizes: [
  //             {
  //               size: "small",
  //               stock: 1,
  //             },
  //           ],
  //           desc: inputs.desc,
  //         };
  //       }
  //     }
  //     return collection;
  //   });

  //   setCollections(updatedCollections);
  //   localStorage.setItem("collection", JSON.stringify(updatedCollections));
  //   onClose();
  // };

  // const calculateNextItemId = () => {
  //   let highestId =
  //     collections
  //       .map((collection) => collection.items.map((item) => item._id))
  //       .flat()
  //       .sort((a, b) => a - b)
  //       .pop() || 0;

  //   return highestId + 1;
  // };

  // const handleInputs = (name: string, value: string) => {
  //   setInputs((prev) => ({ ...prev, [name]: value }));
  // };

  // const setInputsToItemData = (item: Product) => {
  //   setInputs({
  //     name: item.title,
  //     imageUrl: item.image,
  //     price: item.price + "",
  //     size: item.size,
  //     // season: item.season,
  //     description: item.desc,
  //   });
  // };

  return (
    <Main>
      <Box direction="row" justify="evenly">
        {!error &&
          collections &&
          collections.map((collection, index) => (
            <Box key={index}>
              <Heading size="small">
                {collection[0].category}
                <Button
                  icon={
                    <AddCircle
                      onClick={() => {
                        // setEditOrAdd("add");
                        // setCategory(collection.routeName);
                        // setInputs(initialInputs);
                        // onOpen();
                      }}
                    />
                  }
                />
              </Heading>

              {!error &&
                products &&
                collection.map((product: IProduct) => (
                  <Box key={product._id}>
                    <Box direction="row" align="center">
                      <Button
                        icon={<SubtractCircle />}
                        // onClick={() => removeFromCollection(product._id)}
                      />
                      <Button
                        icon={<FormEdit />}
                        onClick={() => {
                          // setEditOrAdd("edit");
                          // setInputsToItemData(product);
                          // setItemToEdit(product);
                          onOpen();
                        }}
                      />

                      <Image
                        src={product.imageURL}
                        style={{ width: "3rem", marginTop: "1rem" }}
                      ></Image>
                      <Text weight="bold" margin={{ left: "small" }}>
                        {product.title}
                      </Text>
                    </Box>
                  </Box>
                ))}
            </Box>
          ))}
        {/* </Box> */}
        {open && (
          <Layer position="center" onClickOutside={onClose}>
            <Box width="large" height="large">
              <Form validate="blur">
                <Box
                  background="light-3"
                  width="large"
                  pad="medium"
                  justify="between"
                  height="large"
                >
                  {/* <Heading size="xsmall">{category}</Heading> */}
                  {/* <Text>ID: {calculateNextItemId()}</Text> */}
                  <FormFieldLabel
                    name="ProductName"
                    label="Product name"
                    required
                    type="text"
                    // value={inputs.name}
                    // onChange={(e) => handleInputs("name", e.target.value)}
                  />
                  <FormFieldLabel
                    name="Price"
                    label="Price"
                    required
                    type="text"
                    // value={inputs.price}
                    // onChange={(e) => handleInputs("price", e.target.value)}
                  />
                  <FormFieldLabel
                    name="ImageUrl"
                    label="Image URL"
                    required
                    type="text"
                    // value={inputs.imageUrl}
                    // onChange={(e) => handleInputs("imageUrl", e.target.value)}
                  />
                  <Text>Sizes</Text>
                  <Box direction="row">
                    <CheckBox label="small" />
                    <CheckBox label="medium" onChange={() => {}} />
                    <CheckBox label="large" onChange={() => {}} />
                    <CheckBox label="xlarge" onChange={() => {}} />
                  </Box>
                  <Text>Seasons</Text>
                  <Box direction="row">
                    <CheckBox label="spring" onChange={() => {}} />
                    <CheckBox label="summer" onChange={() => {}} />
                    <CheckBox label="autumn" onChange={() => {}} />
                    <CheckBox label="winter" onChange={() => {}} />
                  </Box>
                  <Text>Description</Text>
                  <TextArea
                    // value={inputs.description}
                    name="Description"
                    required
                    // onChange={(e) => handleInputs("description", e.target.value)}
                  />
                  {/* {editOrAdd === "add" ? (
                  <Button onClick={addToCollection} label="Add to collection" />
                ) : (
                  <Button onClick={editItem} label="Submit edit" />
                )} */}
                </Box>
              </Form>
            </Box>
          </Layer>
        )}
      </Box>
    </Main>
  );
};

export default Admin;
