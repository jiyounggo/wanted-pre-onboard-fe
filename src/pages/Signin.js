import React from "react";
import { useState } from "react";
import { signIn } from "../apis/auth";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";

function Signin() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    signinId: "",
    signinPw: "",
  });

  const { signinId, signinPw } = input;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  //로그인 요청
  const submitsignin = async (e) => {
    const data = {
      email: input.signinId,
      password: input.signinPw,
    };
    e.preventDefault();
    signIn(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/todo");
      })
      .catch((error) => {
        if (error.request.status === 404) {
          alert("유효하지 않는 사용자 입니다.");
        } else if (error.request.status === 401) {
          alert("사용자 정보가 일치하지 않습니다.");
        } else {
          alert("다시 확인해 주세요.");
        }
      });
  };

  return (
    <SignIn>
      <div className="content">
        <div className="top">
          <h2>Sign In</h2>
          <input
            name="signinId"
            type="text"
            onChange={onChangeInput}
            placeholder="e-mail"
            value={signinId}
          />
          <input
            name="signinPw"
            type="password"
            onChange={onChangeInput}
            placeholder="password"
            value={signinPw}
          />
        </div>
        <div className="signBtn">
          <button onClick={submitsignin}>로그인</button>
        </div>
        <Link to="/signup">
          <p className="bottom">회원가입 하러 가기</p>
        </Link>
      </div>
    </SignIn>
  );
}

const SignIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  flex-direction: column;
  min-height: 100vh;
  background: #c1efff;

  .content {
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
    background: white;
    padding: 40px;
  }
  .signBtn button {
    background-color: pink;
    cursor: pointer;
    border: none;
    padding: 5px;
    margin-top: 25px;
    width: 60px;
    border-radius: 10px;
  }
  .bottom {
    font-size: 13px;
  }
`;

export default Signin;
