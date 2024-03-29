import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { getCategories } from "../../../functions/category";
import { getSubs, removeSub, createSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subs, setSubs] = useState([]);
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);
  // step 1 - search
  const [keyword, setKeyword] = useState("");
  //
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });
  const loadSubs = () =>
    getSubs().then((c) => {
      setSubs(c.data);
    });
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
        navigate("/admin/sub");
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
            <h4>Create Sub Category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
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
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                className="btn btn-sm float-sm-end"
                onClick={() => handleRemove(s.slug)}
              >
                {<DeleteOutlined className="text-danger" />}
              </span>
              <Link
                to={`/admin/sub/${s.slug}`}
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

export default SubCreate;
