import axios from "axios";

//list
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);
//single sub
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
// removing sub
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: { authtoken },
  });
//update sub
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: { authtoken },
  });

//create sub
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: { authtoken },
  });
