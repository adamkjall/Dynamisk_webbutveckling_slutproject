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
  TextInput,
  CheckBox,
} from "grommet";
import { AddCircle, SubtractCircle, FormEdit } from "grommet-icons";

import Loader from "react-loader-spinner";

import useFetch from "../hooks/useFetch";
import { IProduct } from "../components/product";
import FormFieldLabel from "../components/form-field-label";

// import { Collection, Product } from "../shop.data";

const initialInputs: IProduct = {
  title: "",
  image: "",
  price: 0,
  sizes: [
    {
      size: "",
      stock: 0,
    },
  ],
  desc: "",
  category: "",
};

const API_PRODUCTS_URL = "http://localhost:8080/api/products";
const API_IMAGE_URL = "http://localhost:8080/api/files";

const Admin = () => {
  const [collections, setCollections] = useState<IProduct[][]>(null);
  const [inputs, setInputs] = useState(initialInputs);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState<"edit" | "add">("add");
  const [itemToEdit, setItemToEdit] = useState<IProduct>(null);
  const [category, setCategory] = useState(null);
  const [sizes, setSizes] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });

  const { response: products, error, loading } = useFetch(
    API_PRODUCTS_URL,
    {},
    []
  );
  console.log("itemToEdit", itemToEdit);
  console.log("prod", products);

  // post selected image and update inputs with imageId
  useEffect(() => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      body: formData,
    };

    fetch(API_IMAGE_URL, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message === "success") {
          setInputs({ ...inputs, image: data.id });
        }
      })
      .catch(console.log);
  }, [file]);

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
  }, [products]);

  const transformInputsToProduct = () => {
    const transformedSizes = Object.entries(sizes)
      .map((entry) => ({
        size: entry[0],
        stock: entry[1],
      }))
      .filter((sizeObj) => sizeObj.stock !== 0);

    const completeProduct: IProduct = {
      ...inputs,
      category: inputs.category.length ? inputs.category : category,
      sizes: transformedSizes,
    };
    return completeProduct;
  };

  const addToCollection = async () => {
    const product = transformInputsToProduct();

    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    const res = await fetch(API_PRODUCTS_URL, options);
    const data = await res.json();

    const updatedCollections = collections.map((collection) => {
      if (collection[0].category === data.category) {
        return [...collection, data];
      }
      return collection;
    });
    setCollections(updatedCollections);
    setOpen(false);
  };

  const removeFromCollection = (productToRemove: IProduct) => {
    const updatedCollection = collections.map((collection) =>
      collection.filter((product) => product._id !== productToRemove._id)
    );
    setCollections(updatedCollection);
    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };
    fetch(API_PRODUCTS_URL + "/" + productToRemove._id, options)
      .then((res) => res.json)
      .then(console.log);
  };

  const editItem = () => {
    const product = transformInputsToProduct();
    const options: RequestInit = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    fetch(API_PRODUCTS_URL + "/" + itemToEdit._id, options)
      .then((res) => res.json())
      .then(console.log);
    setOpen(false);
  };

  const handleInputs = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const setInputsToItemData = (product: IProduct) => {
    const productCopy = Object.assign({}, product);
    delete productCopy.imageURL;
    delete productCopy._id;
    setSizes({
      small: product.sizes.find((el) => el.size === "small")
        ? product.sizes.find((el) => el.size === "small").stock
        : 0,
      medium: product.sizes.find((el) => el.size === "medium")
        ? product.sizes.find((el) => el.size === "medium").stock
        : 0,
      large: product.sizes.find((el) => el.size === "large")
        ? product.sizes.find((el) => el.size === "large").stock
        : 0,
    });
    setInputs(productCopy);
  };
  console.log("inputs", inputs);

  return (
    <Main>
      <Box direction="row" justify="evenly" fill>
        {loading ? (
          <Loader
            className="loader"
            type="Oval"
            color="black"
            height={75}
            width={75}
            style={{ display: "grid", placeItems: "center", height: "100%" }}
          />
        ) : (
          !error &&
          collections &&
          collections.map((collection, index) => (
            <Box key={index}>
              <Heading size="small">
                {collection[0].category}
                <Button
                  icon={
                    <AddCircle
                      onClick={() => {
                        setEditOrAdd("add");
                        setCategory(collection[0].category);
                        setInputs(initialInputs);
                        setOpen(true);
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
                        onClick={() => removeFromCollection(product)}
                      />
                      <Button
                        icon={<FormEdit />}
                        onClick={() => {
                          setEditOrAdd("edit");
                          setCategory(collection[0].category);
                          setItemToEdit(product);
                          setInputsToItemData(product);
                          setOpen(true);
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
          ))
        )}

        {open && (
          <Layer position="center" onClickOutside={() => setOpen(false)}>
            <Box>
              <Form validate="blur">
                <Box
                  background="light-3"
                  width="large"
                  pad="medium"
                  justify="between"
                  height="large"
                >
                  <Heading size="xsmall">{category}</Heading>
                  <FormFieldLabel
                    name="title"
                    label="Product name"
                    required
                    type="text"
                    value={inputs.title}
                    onChange={handleInputs}
                  />
                  <FormFieldLabel
                    name="category"
                    label="Category"
                    required
                    type="text"
                    value={
                      inputs.category.length > 1 ? inputs.category : category
                    }
                    onChange={handleInputs}
                  />
                  <Image
                    src={file ? URL.createObjectURL(file) : ""}
                    alt=""
                    style={{ width: "5rem" }}
                  />
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <FormFieldLabel
                    name="price"
                    label="Price"
                    required
                    type="number"
                    value={inputs.price.toString()}
                    onChange={handleInputs}
                  />
                  <Text>Sizes</Text>
                  <Box direction="row">
                    <CheckBox label="small" />
                    <TextInput
                      placeholder="stock"
                      type="number"
                      value={sizes.small.toString()}
                      onChange={() =>
                        setSizes({ ...sizes, small: sizes.small + 1 })
                      }
                    />
                    <CheckBox label="medium" onChange={() => {}} />
                    <TextInput
                      placeholder="stock"
                      type="number"
                      value={sizes.medium.toString()}
                      onChange={() =>
                        setSizes({ ...sizes, medium: sizes.medium + 1 })
                      }
                    />
                    <CheckBox label="large" onChange={() => {}} />
                    <TextInput
                      placeholder="stock"
                      type="number"
                      value={sizes.large.toString()}
                      onChange={() =>
                        setSizes({ ...sizes, large: sizes.large + 1 })
                      }
                    />
                  </Box>
                  <Text>Description</Text>
                  <TextArea
                    name="desc"
                    required
                    value={inputs.desc}
                    rows={10}
                    onChange={handleInputs}
                  />
                  {editOrAdd === "add" ? (
                    <Button
                      onClick={() => addToCollection()}
                      label="Add to collection"
                    />
                  ) : (
                    <Button onClick={() => editItem()} label="Submit edit" />
                  )}
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
