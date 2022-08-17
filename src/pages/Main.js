import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
    } else if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <Wrapper>
      <div className="content">
        <h2 className="welcome">WELCOME</h2>
        <div className="welcomTxt">
          <span>Welcome to the todo-list</span>
        </div>
        <div>
          <Link to="/signin">
            <button className="loginBtn">Login</button>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <button className="regBtn">Register</button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #c1efff;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-family: system-ui, serif;
    font-size: 2rem;
    padding: 2.5rem;
    border-radius: 10px;
    background: white;
  }
  .welcome {
    color: #ffb3b3;
    margin: 0;
  }

  .welcomTxt {
    font-size: 20px;
    margin: 20px 0;
  }
  .loginBtn,
  .regBtn {
    border: none;
    border-radius: 20px;
    width: 200px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  .loginBtn {
    background-color: #ffdba4;
  }
  .regBtn {
    background-color: #ffe9ae;
  }
`;

export default Main;
