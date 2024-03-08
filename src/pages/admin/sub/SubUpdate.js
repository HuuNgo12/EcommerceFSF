import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories } from "../../../functions/category";
import { getSub, updateSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  let navigate = useNavigate();

  let { slug } = useParams();

  const user = useSelector((state) => state.user);
  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });
  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
      console.log(parent);
    });
  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
            <h4>Update Sub Category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    // selected={category._id === parent}
                  >
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
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
