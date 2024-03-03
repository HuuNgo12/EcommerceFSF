import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedrect from "./LoadingToRedrect";

const UserRoute = ({ Component }) => {
  const { user } = useSelector((state) => state);
  return user && user.token ? <Component /> : <LoadingToRedrect />;
};

export default UserRoute;
