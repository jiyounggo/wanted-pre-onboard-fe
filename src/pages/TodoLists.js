import React, { useState } from "react";
import styled from "@emotion/styled";
import { updataTodo, deleteTodo } from "../api";

function TodoList({ list }) {
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);
  const [BtnValue, setBtnValue] = useState(true);
  const [editVal, setEditVal] = useState("");
  const [word, setWord] = useState(list);
  const [listitem, setlist] = useState(list.todo);
  const [inputVal, setinputVal] = useState(list.isCompleted);

  const formEdit = () => {
    setinputVal(!inputVal);
  };
  const inputTxt = (e) => {
    setEditVal(e.target.value);
  };

  //취소버튼 숨기기
  const cancle = () => {
    setBtnValue(true);
    setisDone(!isDone);
    setSwitchValue([false]);
  };

  //수정
  const onEdit = async (e) => {
    const data = {
      todo: editVal,
      isCompleted: true,
    };
    updataTodo(data, word)
      .then((res) => {
        setlist(res.data.todo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //삭제
  const onDel = async (e) => {
    deleteTodo(word)
      .then((res) => {
        setWord({ id: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (word.id === 0) {
    return null;
  }

  return (
    <Todolist>
      <ul key={list.id} className={inputVal ? "show" : ""}>
        <li>
          <input
            className="checkbox"
            type="checkbox"
            checked={inputVal}
            onChange={formEdit}
          />
        </li>
        <div className="text">
          {switchValue[list.id] ? (
            <input onChange={inputTxt} defaultValue={listitem}></input>
          ) : (
            <p>{listitem}</p>
          )}
        </div>
        <li>
          {BtnValue ? (
            <ViewBtn
              onClick={() => {
                let copy = [...switchValue];
                copy[list.id] = !copy[list.id];
                setSwitchValue(copy);
                setisDone(!isDone);
                setBtnValue(!BtnValue);
              }}
            >
              수정
            </ViewBtn>
          ) : (
            <ViewBtn
              onClick={() => {
                let copy = [...switchValue];
                copy[list.id] = !copy[list.id];
                setSwitchValue(copy);
                setisDone(!isDone);
                setBtnValue(!BtnValue);
                onEdit();
              }}
            >
              제출
            </ViewBtn>
          )}
          {isDone ? <CancleBtn onClick={cancle}>취소</CancleBtn> : null}
          {BtnValue ? <DeleteBtn onClick={onDel}>삭제</DeleteBtn> : null}
        </li>
      </ul>
    </Todolist>
  );
}
const Todolist = styled.div`
  .show {
    text-decoration: line-through;
    text-decoration-color: pink;
  }
  ul {
    border: 1.3px solid pink;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .checkbox {
    accent-color: pink;
  }
  .text {
    width: 500px;

    p {
      margin: 0;
    }
    input {
      width: 450px;
      height: 20px;
      font-size: 1em;
    }
  }
`;
const ViewBtn = styled.button``;
const CancleBtn = styled.button``;
const DeleteBtn = styled.button``;

export default TodoList;
