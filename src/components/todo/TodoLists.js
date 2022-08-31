import React, { useState, memo, useMemo } from "react";
import styled from "@emotion/styled";
import { updataTodo, deleteTodo } from "../../apis/todo";

function TodoList({ list }) {
  console.log("자녀도");
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);
  const [BtnValue, setBtnValue] = useState(true);
  const [editVal, setEditVal] = useState("");
  const [word, setWord] = useState(list);
  const [listitem, setlist] = useState(list.todo);
  const [inputVal, setinputVal] = useState(list.isCompleted);

  const inputTxt = (e) => {
    setEditVal(e.target.value);
  };

  //취소버튼
  const cancle = () => {
    setBtnValue(true);
    setisDone(!isDone);
    setSwitchValue([false]);
  };

  //check box
  const updateCheck = async (e) => {
    setinputVal(!inputVal);
    const data = {
      todo: listitem,
      isCompleted: !inputVal,
    };
    updataTodo(data, word).then((res) => {
      setlist(res.data.todo);
    });
  };

  //수정
  const onEdit = async (e) => {
    const data = {
      todo: editVal,
      isCompleted: inputVal,
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

  const BtnOnclick = () => {
    let copy = [...switchValue];
    copy[list.id] = !copy[list.id];
    setSwitchValue(copy);
    setisDone(!isDone);
    setBtnValue(!BtnValue);
  };

  return (
    <Todolist>
      <ul className={inputVal ? "show" : ""}>
        <li>
          <input
            className="checkbox"
            type="checkbox"
            checked={inputVal}
            onChange={updateCheck}
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
                BtnOnclick();
              }}
            >
              수정
            </button>
          ) : (
            <button
              className="viewBtn"
              onClick={() => {
                BtnOnclick();
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

export default memo(TodoList);
