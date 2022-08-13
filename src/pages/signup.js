import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
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

  const loginValid = id.includes("@") && password.length >= 8;

  const submitsignup = async (e) => {
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
        navigate("/signin");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <div>
      <input type="text" onChange={inputId} placeholder="e-mail" />
      <input type="password" onChange={inputPassword} placeholder="password" />
      {loginValid ? <button onClick={submitsignup}>가입하기</button> : null}
    </div>
  );
}

export default SignUp;
