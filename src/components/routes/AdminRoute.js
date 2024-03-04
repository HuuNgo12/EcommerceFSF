import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedrect from "./LoadingToRedrect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ Component }) => {
  const user = useSelector((state) => state.user);

  const [ok, setOke] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current admin", res);
          setOke(true);
        })
        .catch((err) => {
          console.log("ADMIN route error", err);
          setOke(false);
        });
    }
  }, [user]);

  return ok ? <Component /> : <LoadingToRedrect />;
};

export default AdminRoute;
