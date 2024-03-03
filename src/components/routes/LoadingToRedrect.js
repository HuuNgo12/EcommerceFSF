import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedrect = () => {
  const [count, setCount] = useState(5);
  let Navigate = useNavigate();
  useEffect(() => {
    const intervel = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect when count =0
    count === 0 && Navigate("/");
    //clean intervel
    return () => clearInterval(intervel);
  }, [count]);
  return (
    <div className="container p-5 text-center">
      Redirecting you in {count} seconds
    </div>
  );
};

export default LoadingToRedrect;
