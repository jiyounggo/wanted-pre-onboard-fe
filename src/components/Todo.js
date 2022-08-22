import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import TodoList from "./TodoLists";
import { getTodos, createTodo } from "../apis/todo";
function Todo() {
  const [value, setValue] = useState([]);
  const [listVal, setListVal] = useState("");
  const [word, setWord] = useState(true);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const inputRef = useRef();

  //로그인 유무 리다이렉트
  useEffect(() => {
    inputRef.current.focus();
    if (!token) {
      navigate("/");
    }
  }, []);

  const inputTest = (e) => {
    setListVal(e.target.value);
  };

  //로그아웃
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  //get 요청
  useEffect(() => {
    getTodos().then((res) => {
      setValue(res.data);
    });
  }, [word]);

  //post 요청
  const onSubmit = (e) => {
    inputRef.current.focus();
    e.preventDefault();

    const data = {
      todo: listVal,
    };
    createTodo(data).then((res) => {
      setWord(!word);
      setListVal("");
    });
  };

  return (
    <Todolist>
      <div className="list">
        <Header>
          {token ? (
            <button className="logOutBtn" onClick={logout}>
              logout
            </button>
          ) : (
            <button className="logInBtn">login</button>
          )}
        </Header>
        <div className="top">
          <h2>Todolist</h2>
          <form onChange={inputTest}>
            <input
              onChange={inputTest}
              className="search"
              ref={inputRef}
              value={listVal}
            ></input>
            <button className="submitBtn" onClick={onSubmit}>
              추가
            </button>
          </form>
        </div>
        <div className="itemList">
          {value.map((list) => (
            <TodoList key={list.id} list={list} />
          ))}
        </div>
      </div>
    </Todolist>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  .logInBtn,
  .logOutBtn {
    border: 1px solid white;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;
const Todolist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background: #c1efff;
  .list {
    overflow-y: auto;
    width: 770px;
    height: 600px;
    font-size: 2rem;
    padding: 2.5rem;
    border-radius: 10px;
    background: white;
    padding: 30px;
  }
  .itemList {
    padding: 20px 32px 48px;
  }
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .search {
    width: 400px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
  }
  .submitBtn {
    margin-left: 15px;
    border: 1px solid transparent;
    border-radius: 10px;
    font-weight: 600;
    color: white;
    background: #ffb3b3;
    padding: 10px;
    box-shadow: 1px 2px 5px grey;
    cursor: pointer;
  }
`;

export default Todo;
