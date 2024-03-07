import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  getCategories,
  removeCategory,
  createCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  // step 1 - search
  const [keyword, setKeyword] = useState("");
  //
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });
  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    // let anwser = window.confirm("Delete?");
    // console.log(anwser, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);

          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };
  //step 3- search category

  //step 4-
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create category</h4>
          )}
          {
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          }
          <hr />

          {<LocalSearch keyword={keyword} setKeyword={setKeyword} />}

          <hr />
          {
            //step 5
          }
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                className="btn btn-sm float-sm-end"
                onClick={() => handleRemove(c.slug)}
              >
                {<DeleteOutlined className="text-danger" />}
              </span>
              <Link
                to={`/admin/category/${c.slug}`}
                className="btn btn-sm float-sm-end"
              >
                <span>{<EditOutlined className="text-warning" />}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
