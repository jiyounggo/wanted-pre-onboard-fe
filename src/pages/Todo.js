import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import TodoList from "./TodoLists";
import { getTodos, createTodo } from "../api";
function Todo() {
  const [value, setValue] = useState([]);
  const [listVal, setListVal] = useState();
  const [word, setWord] = useState(true);

  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //리다이렉트
  if (localStorage.getItem("accessToken") == null) {
    alert("로그인 해주세요!");
    navigate("/");
  }

  const inputTest = (e) => {
    setListVal(e.target.value);
  };

  //get 요청
  useEffect(() => {
    getTodos()
      .then((res) => {
        setValue(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [word]);

  //post 요청
  const onSubmit = (e) => {
    inputRef.current.focus();
    e.preventDefault();
    setListVal("");
    const data = {
      todo: listVal,
    };
    e.preventDefault();
    createTodo(data)
      .then((res) => {
        setWord(!word);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Todolist>
      <div className="list">
        <div className="top">
          <h2>Todolist</h2>
          <form onChange={inputTest}>
            <input ref={inputRef} value={listVal}></input>
            <button onClick={onSubmit}>추가</button>
          </form>
        </div>

        <table>
          <tbody>
            {value.map((list) => (
              <TodoList list={list} />
            ))}
          </tbody>
        </table>
      </div>
    </Todolist>
  );
}
const Todolist = styled.div`
  .list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    min-height: 90vh;
  }
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    input {
      width: 400px;
      height: 32px;
      font-size: 15px;
      border: 0;
      border-radius: 15px;
      outline: none;
      padding-left: 10px;
      background-color: rgb(233, 233, 233);
    }
    button {
      margin-left: 15px;
      border: 1px solid grey;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      font-weight: 600;
      color: pink;
      padding: 10px;
    }
  }
  table {
    margin: 0 auto;
    border: 0.5px solid pink;
    border-collapse: collapse;
  }
`;

export default Todo;
