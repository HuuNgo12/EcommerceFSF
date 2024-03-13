import axios from "axios";

//list
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);
//single category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
// removing category
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: { authtoken },
  });
//update category
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: { authtoken },
  });

//create category
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: { authtoken },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
