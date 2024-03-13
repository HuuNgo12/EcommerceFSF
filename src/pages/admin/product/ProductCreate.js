import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/nav/AdminNav";

import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

import { getCategories, getCategorySubs } from "../../../functions/category";
const initState = {
  title: "Acer Nitro 5",
  description: "This is the best Acer product",
  price: "20000000",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "20",
  images: [],
  colors: ["Black", "Brown", "Sliver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const user = useSelector((state) => state.user);
  //category
  const loadCategories = () =>
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  useEffect(() => {
    loadCategories();
  }, []);

  // console.log(user);
  const handleSubmit = (e) => {
    //
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        // toast.success(`${res.data.name} is created`);
        window.alert(`'${res.data.title}' is created`);
        window.location.reload();
      })
      .catch((err) => {
        // if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };
  const handleChange = (e) => {
    //
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, "---------", e.target.value);
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log(res);
      setSubOptions(res.data);
    });
    setShowSubs(true);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product</h4>
          <hr />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSubs={showSubs}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
