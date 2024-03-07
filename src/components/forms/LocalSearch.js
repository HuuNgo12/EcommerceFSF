import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    //step 2
    <div className="container pt-2 pb-2">
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleChangeSearch}
        className="form-control mb-2"
      />
    </div>
  );
};

export default LocalSearch;
