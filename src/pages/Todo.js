import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import TodoList from "./TodoLists";
function Todo() {
  const [isShow, setShow] = useState([]);
  const [day, setday] = useState([]);
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);
  const [inputVal, setinputVal] = useState("");
  const [listVal, setListVal] = useState("");

  useEffect(() => {
    axios
      .get(
        " https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setday(res.data);
        console.log(day);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const inputTest = (e) => {
    setListVal(e.target.value);
    console.log(listVal);
  };
  const onSubmit = async (e) => {
    const form = {
      todo: listVal,
    };
    e.preventDefault();
    await axios
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
              {day.map((list, i) => (
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
