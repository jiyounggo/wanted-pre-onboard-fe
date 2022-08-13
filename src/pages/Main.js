import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      navigate("/todo");
    } else if (!window.localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div>메인임</div>
    </div>
  );
}

export default Main;
