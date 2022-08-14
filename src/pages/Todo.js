import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import TodoList from "./TodoLists";
function Todo() {
  const [value, setValue] = useState([]);
  const [listVal, setListVal] = useState();
  const [word, setWord] = useState(true);

  const inputTest = (e) => {
    setListVal(e.target.value);
  };
  useEffect(() => {
    axios
      .get(
        " https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setValue(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [word]);

  const onSubmit = (e) => {
    const form = {
      todo: listVal,
    };
    e.preventDefault();
    axios
      .post(
        "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        form,
        {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setWord(!word);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <>
        <h2>Todolist</h2>
        <list>
          <input onChange={inputTest}></input>
          <button onClick={onSubmit}>+</button>
          <table>
            <tbody>
              {value.map((list) => (
                <TodoList list={list} />
              ))}
            </tbody>
          </table>
        </list>
      </>
    </div>
  );
}

export default Todo;
