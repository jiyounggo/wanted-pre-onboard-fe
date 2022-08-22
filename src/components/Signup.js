import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../apis/auth";
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
  const loginValid = signupId.includes("@") && signupPw.length >= 8;
  const emailValid = signupId.includes("@");
  const pwValud = signupPw.length >= 8;

  //회원가입 요청
  const submitsignup = async (e) => {
    const data = {
      email: signupId,
      password: signupPw,
    };
    e.preventDefault();
    signUp(data).then((res) => {
      localStorage.setItem("accessToken", res.data.access_token);
      navigate("/todo");
    });
  };

  return (
    <Signup>
      <div className="content">
        <div className="top">
          <h2>Signd Up</h2>
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
          {(() => {
            if (signupId.length < 1 && signupPw.length < 1) {
              return null;
            } else if (!emailValid) {
              return <p>이메일은 @ 가 포함되어야 합니다</p>;
            } else if (!pwValud) {
              return <p>비밀번호는 8글자 이상 이여야 합니다</p>;
            } else {
              <p></p>;
            }
          })()}
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
      </div>
    </Signup>
  );
}

const Signup = styled.div`
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
    border: none;
    padding: 5px 55px;
    border-radius: 10px;
  }
  .unClick {
    pointer-events: none;
    border: none;
    padding: 5px 55px;
    border-radius: 10px;
  }
  .bottom {
    font-size: 13px;
  }
`;

export default SignUp;
