import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
        autoFocus
        required
      />

      <button className="btn btn-outline-primary mt-2">Save</button>
    </div>
  </form>
);

export default CategoryForm;
