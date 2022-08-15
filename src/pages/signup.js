import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../api";
import styled from "@emotion/styled";

function SignUp() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    signupId: "",
    signupPw: "",
  });

  const { signupId, signupPw } = input;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  //ID,PW 유효성 검사
  const loginValid = input.signupId.includes("@") && input.signupPw.length >= 8;
  const emailValid = input.signupId.includes("@");
  const pwValud = input.signupPw.length >= 8;

  //회원가입 요청
  const submitsignup = async (e) => {
    const data = {
      email: input.signupId,
      password: input.signupPw,
    };
    e.preventDefault();
    signUp(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/signin");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <Signup>
      <div className="top">
        <h2>sign in</h2>
        <input
          name="signupId"
          type="text"
          onChange={onChangeInput}
          placeholder="e-mail"
          value={signupId}
        />
        <input
          name="signupPw"
          type="password"
          onChange={onChangeInput}
          placeholder="password"
          value={signupPw}
        />
      </div>
      <div className="middle">
        {!emailValid ? (
          <p>이메일은 @ 가 포함되어야 합니다</p>
        ) : !pwValud ? (
          <p>비밀번호는 8글자 이상 이여야 합니다</p>
        ) : (
          <p></p>
        )}
      </div>
      <div className="signBtn">
        <button
          className={loginValid ? "onClick" : "unClick"}
          onClick={submitsignup}
        >
          가입하기
        </button>
      </div>

      <Link to="/signin">
        <p className="bottom">로그인 하러 가기</p>
      </Link>
    </Signup>
  );
}

const Signup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  flex-direction: column;
  .top {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .middle {
    height: 50px;
    p {
      font-size: 5px;
      color: red;
    }
  }

  .onClick {
    background-color: pink;
    cursor: pointer;
    border: 1px solid white;
    padding: 5px;
  }
  .unClick {
    pointer-events: none;
    boder: 1px solid black;
  }
  .bottom {
    font-size: 13px;
  }
`;

export default SignUp;
