import React, { useState } from "react";
import styled from "@emotion/styled";
import { updataTodo, deleteTodo } from "../apis/todo";

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
    updataTodo(data, word).then((res) => {
      setlist(res.data.todo);
    });
  };

  //삭제
  const onDel = async (e) => {
    deleteTodo(word).then((res) => {
      setWord({ id: 0 });
    });
  };
  if (word.id === 0) {
    return null;
  }

  return (
    <Todolist>
      <ul className={inputVal ? "show" : ""}>
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
            <input
              className="txtInput"
              type="text"
              onChange={inputTxt}
              defaultValue={listitem}
            ></input>
          ) : (
            <p className="listTxt">{listitem}</p>
          )}
        </div>
        <li className="rightBtn">
          {BtnValue ? (
            <button
              className="viewBtn"
              onClick={() => {
                let copy = [...switchValue];
                copy[list.id] = !copy[list.id];
                setSwitchValue(copy);
                setisDone(!isDone);
                setBtnValue(!BtnValue);
              }}
            >
              수정
            </button>
          ) : (
            <button
              className="viewBtn"
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
            </button>
          )}
          {isDone && (
            <button className="cancleBtn" onClick={cancle}>
              취소
            </button>
          )}
          {BtnValue && (
            <button className="deleteBtn" onClick={onDel}>
              삭제
            </button>
          )}
        </li>
      </ul>
    </Todolist>
  );
}
const Todolist = styled.div`
  .show {
    display: flex;
    text-decoration: line-through;
    text-decoration-color: pink;
  }
  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .checkbox {
    accent-color: pink;
  }
  .text {
    width: 400px;
    height: 25px;
  }
  .txtInput {
    width: 350px;
    height: 22px;
    font-size: 18px;
  }
  .listTxt {
    font-size: 18px;
    text-align: left;
    margin: 10 0px;
  }
  .viewBtn,
  .cancleBtn,
  .deleteBtn {
    border: none;
    border-radius: 20px;
    width: 50px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  .viewBtn {
    background-color: #ffdba4;
    margin-right: 10px;
  }
  .cancleBtn {
    background-color: #ffe9ae;
  }
  .deleteBtn {
    background-color: #ffe9ae;
  }
`;

export default TodoList;
