import React, { useEffect, useState } from "react";

import {
  Text,
  Heading,
  Box,
  Image,
  Button,
  Layer,
  Form,
  FormField,
  TextArea,
  CheckBox,
} from "grommet";
import { AddCircle, Close, SubtractCircle, FormEdit } from "grommet-icons";
import styled from "styled-components";

import Loader from "react-loader-spinner";

import useFetch from "../hooks/useFetch";
import { IProduct } from "../components/product";
import HomeCollection from "../components/home-boxes/home-collection";
import { relative } from "path";

const StyledCheckBox = styled(Box)`
  background-color: lightgray;
  margin: 0.2rem 0.5rem;
  width: 6rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  & > label {
    width: 100%;
    height: 100%;
    padding: 0 0.2rem 0 0.1rem;
    & > div {
      margin-right: 0.6rem;
      width: 18px;
      height: 18px;
    }
    & > span {
      font-size: 1rem;
    }
  }
`;

const AddCategoryButton = styled(Button)`
  position: absolute;
  top: 2.2rem;
  right: 0;
`;

const initialInputs = {
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
  // const [collections, setCollections] = useState<IProduct[][]>(null);
  const [inputs, setInputs] = useState(initialInputs);
  const [allProducts, setAllProducts] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOrAdd, setEditOrAdd] = useState<"edit" | "add">("add");
  const [itemToEdit, setItemToEdit] = useState<IProduct>(null);
  const [allCategories, setAllCategories] = useState([]);
  const [editCategories, setEditCategories] = useState(null);
  const [validNewCategory, setValidNewCategory] = useState(true)
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
          setInputs((prev) => ({ ...prev, image: data.id }));
        }
      })
      .catch(console.log);
  }, [file]);

  // sets all current categories into state
  useEffect(() => {
    if (!products) return;
    let categories = [];
    for (const product of products) {
      for (const category of product.category) {
        const existing = categories.find((c) => c === category);
        if (!existing) categories.push(category);
      }
    }
    // console.log(categories);
    // console.log(editCategories);
    setAllCategories(categories);
    setAllProducts(products);
    console.log("hello");

    // const collectionsObj = {};

    // products.forEach((product: IProduct) => {
    //   if (!collectionsObj[product.category]) {
    //     collectionsObj[product.category] = [product];
    //   } else {
    //     collectionsObj[product.category] = [
    //       ...collectionsObj[product.category],
    //       product,
    //     ];
    //   }
    // });

    // const collectionsMatrix = Object.values(collectionsObj) as [IProduct[]];
    // console.log(collectionsMatrix);

    // setCollections(collectionsMatrix);
  }, [products]);

  // transforms inputs to an IProduct
  const transformInputsToProduct = () => {
    const transformedSizes = Object.entries(sizes)
      .map((entry) => ({
        size: entry[0],
        stock: entry[1],
      }))
      .filter((sizeObj) => sizeObj.stock !== 0);

    const transformedCategories = Object.entries(editCategories)
      .map((category) => {
        if (category[1]["active"]) return category[0];
      })
      .filter((categories) => categories != undefined);

    const completeProduct: IProduct = {
      ...inputs,
      category: transformedCategories,
      sizes: transformedSizes,
    };
    return completeProduct;
  };
  // requests api to add new product to database and adds new product to the collection matrix
  // const addToCollection = async () => {
  //   const product = transformInputsToProduct();

  //   const options: RequestInit = {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product),
  //   };

  //   const res = await fetch(API_PRODUCTS_URL, options);
  //   const data = await res.json();

  //   const updatedCollections = collections.map((collection) => {
  //     if (collection[0].category === data.category) {
  //       return [...collection, data];
  //     }
  //     return collection;
  //   });
  //   setCollections(updatedCollections);
  //   setOpen(false);
  //   setFile(null);
  // };

  //  requests api to edit a product in the database and updated the edited product in the collection matrix
  const editItem = async () => {
    const product = transformInputsToProduct();
    const options: RequestInit = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    const res = await fetch(API_PRODUCTS_URL + "/" + itemToEdit._id, options);
    const data = await res.json();
    const tempArray = [...allProducts]
    const productIndex = tempArray.findIndex((p) => p._id === data._id);
    if (productIndex != -1) {
      tempArray.splice(productIndex, 1, data);
      setAllProducts(tempArray);
    }
    // const updatedCollections = collections.map((collection) => {
    //   if (collection[0].category === data.category) {
    //     return collection.map((item) =>
    //       item._id === itemToEdit._id ? product : item
    //     );
    //   }
    //   return collection;
    // });
    // setCollections(updatedCollections);
    setOpen(false);
    setFile(null);
  };

  //  requests api to remove a product in the database and updates the collection matrix
  const removeFromCollection = (productToRemove: IProduct) => {
    const tempArray = [...allProducts]
    const productIndex = tempArray.findIndex(
      (p) => p._id === productToRemove._id
    );
    if (productIndex != -1) {
      tempArray.splice(productIndex, 1);
      setAllProducts(tempArray);
      const options: RequestInit = {
        method: "DELETE",
        credentials: "include",
      };
      fetch(API_PRODUCTS_URL + "/" + productToRemove._id, options)
        .then((res) => res.json)
        .then(console.log);
    }
  };

  const handleInputs = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validateCategories = () => {
    for (const category of allCategories) {
      if (editCategories[category].active) {
        return true;
      }
    }
    return false;
  };

  const validateInputs =
    inputs.title.length >= 2 &&
    inputs.price > 0 &&
    validateCategories() &&
    (editOrAdd === "add" ? file : true);

  // takes the product data and sets the input state
  const setInputsToItemData = (product) => {
    const productCopy = Object.assign({}, product);
    productCopy.category = "";

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

  const handleCategories = (product: IProduct) => {
    let tempObj = {};
    for (const category of allCategories) {
      if (product.category.find((el) => el === category)) {
        tempObj = {
          ...tempObj,
          [category]: {
            title: category,
            active: true,
          },
        };
      } else {
        tempObj = {
          ...tempObj,
          [category]: {
            title: category,
            active: false,
          },
        };
      }
    }
    console.log(tempObj);
    setEditCategories(tempObj);
  };

  const handleCategoryCheck = (category) => {
    setEditCategories({
      ...editCategories,
      [category]: {
        ...editCategories[category],
        active: !editCategories[category].active,
      },
    });
  };

  const addNewCategory = () => {
    if (inputs.category.length > 3 && inputs.category.length < 9) {
      setAllCategories([...allCategories, inputs.category]);
      setEditCategories({
        ...editCategories,
        [inputs.category]: {
          title: inputs.category,
          active: true,
        },
      });
      setValidNewCategory(true)
    } else {
      setValidNewCategory(false)
      console.log("validation failed: less than 3 or more than 8 chars");
    }
  };

  const closeModal = () => {
    setFile(null);
    setOpen(false);
  };

  return (
    <Box
      pad={{ horizontal: ".8rem" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading>Edit Products</Heading>
      <div style = {{width: '100%', display:'flex', justifyContent: 'center', marginBottom: '2rem'}}>
        <Button
          primary
          label = 'Add New Product'
          icon={<AddCircle/>}
          onClick={() => {
            setEditOrAdd("add");
            setItemToEdit(null);
                setInputs({
              ...initialInputs
            });

            setOpen(true);
          }}
        />
      </div>
      <Box
        direction="row"
        // justify="center"
        // wrap
        style={{
          minHeight: "unset",
          maxWidth: "60rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
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
          allProducts &&
          allProducts.map((product, index) => (
            <Box key={index} width="large" style={{ minHeight: "unset" }}>
              <Box
                key={product._id}
                style={{
                  borderBottom: "1px solid gray",
                  padding: "0.8rem 0",
                }}
              >
                <Box
                  direction="row"
                  align="center"
                  alignContent="between"
                  fill="vertical"
                >
                  <Image
                    src={product.imageURL}
                    style={{
                      width: "3rem",
                      height: "4rem",
                      objectFit: "cover",
                    }}
                  ></Image>
                  <Text
                    weight="bold"
                    margin={{ left: "small" }}
                    style={{ minWidth: "45%" }}
                  >
                    {product.title}
                  </Text>

                  <Box
                    direction="row"
                    align="center"
                    justify="end"
                    fill="horizontal"
                  >
                    <Button
                      icon={<SubtractCircle />}
                      onClick={() => removeFromCollection(product)}
                      style={{ padding: "0.4rem" }}
                    />
                    <Button
                      icon={<FormEdit />}
                      onClick={() => {
                        setEditOrAdd("edit");
                        handleCategories(product);
                        setItemToEdit(product);
                        setInputsToItemData(product);
                        setOpen(true);
                      }}
                      style={{ padding: "0.4rem" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}

        {open && (
          <Layer
            style={{ overflow: "auto" }}
            position="center"
            onClickOutside={closeModal}
          >
            <Box>
              <Form validate="blur" style={{ overflowY: "scroll" }}>
                <Box
                  background="light-3"
                  width="large"
                  pad="medium"
                  justify="between"
                >
                  <Button
                    alignSelf="end"
                    icon={<Close />}
                    onClick={closeModal}
                  />
                  <FormField
                    name="title"
                    label={
                      <Box direction="row">
                        <Heading level="3" style = {{margin: 0}}>Product name <span style = {{color: 'red'}}>*</span></Heading>
                      </Box>
                    }
                    required
                    type="text"
                    value={inputs.title}
                    onChange={handleInputs}
                  />
                  <div style = {{margin:'2rem 0'}}>
                    <Box
                      style={{
                        position: "relative",
                      }}
                    >
                    <FormField
                      name="category"
                      label={
                        <Box direction="row">
                        <Heading level="3" style = {{margin: 0}}>Category <span style = {{color: 'red'}}>*</span></Heading>
                      </Box>
                      }
                      type="text"
                      placeholder = "Add new category"
                      value={inputs.category}
                      onChange={handleInputs}
                    />
                    <AddCategoryButton
                      icon={
                        <AddCircle
                          onClick={() => {
                            addNewCategory();
                          }}
                        />
                      }
                    />
                    {validNewCategory? null : <p style = {{color: 'red', margin: '0 0 0.5rem 0'}}>4-8 characters</p>}
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        marginBottom: "1rem",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                    {editCategories &&
                      allCategories &&
                      allCategories.map((category) => (
                        <StyledCheckBox key={`checkbox-${category}`}>
                          <CheckBox
                            checked={editCategories[category].active}
                            label={editCategories[category].title}
                            onChange={() => handleCategoryCheck(category)}
                          />
                        </StyledCheckBox>
                      ))}
                    </Box>
                  </div>
                  <FormField
                    name="price"
                    label={
                      <Box direction="row">
                      <Box direction="row">
                        <Heading level="3" style = {{margin: 0}}>Price <span style = {{color: 'red'}}>*</span></Heading>
                      </Box>
                      </Box>
                    }
                    required
                    type="number"
                    min="1"
                    value={inputs.price.toString()}
                    onChange={handleInputs}
                  />
                  {inputs.price <= 0 ? (
                    <p style={{ color: "red" }}>Price can't be 0 or negative</p>
                  ) : null}
                  <div style = {{margin: '2rem 0', display: 'flex', flexDirection: 'column'}}>
                    <Heading level="3">
                      Image
                      {editOrAdd === "add" ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : null}{" "}
                    </Heading>
                    <label
                      htmlFor="imageUpload"
                      style={{ width: "4rem", cursor: "pointer" }}
                    >
                      <Image
                        margin={{ bottom: "small" }}
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : itemToEdit
                            ? itemToEdit.imageURL
                            : ""
                        }
                        alt=""
                        style={{ width: "4rem" }}
                      />
                    </label>
                    <input
                      id="imageUpload"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <Heading level="3">Sizes</Heading>
                  <Box direction="row" align="center">
                    <Box direction="column">
                      <label className="size-label" htmlFor="small">
                        Small
                      </label>
                      <FormField
                        name="small"
                        placeholder="stock"
                        type="number"
                        min="0"
                        value={sizes.small}
                        onChange={(event) =>
                          setSizes({
                            ...sizes,
                            small: parseInt(event.target.value),
                          })
                        }
                        style={{
                          border: "0.5px solid black",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </Box>
                    <Box direction="column" style={{ margin: "1rem" }}>
                      <label className="size-label" htmlFor="medium">
                        Medium
                      </label>
                      <FormField
                        name="medium"
                        placeholder="stock"
                        type="number"
                        min="0"
                        value={sizes.medium}
                        onChange={(event) =>
                          setSizes({
                            ...sizes,
                            medium: parseInt(event.target.value),
                          })
                        }
                        style={{
                          border: "0.5px solid black",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </Box>
                    <Box direction="column">
                      <label className="size-label" htmlFor="large">
                        Large
                      </label>
                      <FormField
                        name="large"
                        placeholder="stock"
                        type="number"
                        min="0"
                        value={sizes.large}
                        onChange={(event) =>
                          setSizes({
                            ...sizes,
                            large: parseInt(event.target.value),
                          })
                        }
                        style={{
                          border: "0.5px solid black",
                          borderRadius: "0.25rem",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box pad={{ bottom: "medium" }}>
                    <Heading level="3">Description</Heading>
                    <TextArea
                      name="desc"
                      required
                      value={inputs.desc}
                      rows={10}
                      onChange={handleInputs}
                    />
                  </Box>
                  {validateInputs ? null : (
                    <p style={{ alignSelf: "center" }}>
                      Remember to fill all{" "}
                      <span style={{ color: "red" }}>required* </span>fields
                    </p>
                  )}
                  {editOrAdd === "add" ? (
                    <Button
                      primary
                      disabled={validateInputs ? false : true}
                      //onClick={() => addToCollection()}
                      label="Add to collection"
                    />
                  ) : (
                    <Button
                      primary
                      disabled={validateInputs ? false : true}
                      onClick={() => editItem()}
                      label="Submit edit"
                    />
                  )}
                </Box>
              </Form>
            </Box>
          </Layer>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
