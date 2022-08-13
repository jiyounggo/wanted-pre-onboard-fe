import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const inputId = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const submitsignin = async (e) => {
    const form = {
      email: id,
      password: password,
    };
    e.preventDefault();
    await axios
      .post(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/todo");
      })
      .catch((error) => {
        if (error.request.status === 404) {
          alert("유효하지 않는 사용자 입니다.");
        } else if (error.request.status === 401) {
          alert("사용자 정보가 일치하지 않습니다.");
        }
      });
  };

  return (
    <div>
      <input type="text" onChange={inputId} placeholder="e-mail" />
      <input type="password" onChange={inputPassword} placeholder="password" />
      <button onClick={submitsignin}>가입하기</button>
    </div>
  );
}

export default Signin;
