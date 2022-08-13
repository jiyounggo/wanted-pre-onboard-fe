import axios from "axios";
import { useEffect, useState } from "react";

function SingIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    email: id,
    password: password,
  });
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
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup",
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
      })
      .catch((Error) => {
        console.log(Error);
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

export default SingIn;
