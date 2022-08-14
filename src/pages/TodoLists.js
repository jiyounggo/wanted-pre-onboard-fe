import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function TodoList({ list }) {
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);

  const [btnCancle, setbtnCancle] = useState(true);
  const [cancelVal, setCancleVal] = useState(true);
  const [BtnValue, setBtnValue] = useState(true);
  const [editVal, setEditVal] = useState("");
  const [word, setWord] = useState(list);
  const [listitem, setlist] = useState(list.todo);
  const [inputVal, setinputVal] = useState(list.isCompleted);

  const formEdit = () => {
    setinputVal(!inputVal);
    console.log(inputVal);
  };
  //취소버튼 숨기기
  const cancle = () => {
    setBtnValue(true);
    setisDone(!isDone);
    setSwitchValue([false]);
  };

  //수정
  const onEdit = async (e) => {
    const form = {
      todo: editVal,
      isCompleted: true,
    };
    await axios
      .put(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${list.id}`,
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
        setlist(res.data.todo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //삭제
  const onDel = async (e) => {
    await axios
      .delete(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${list.id}`,
        {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setWord({ id: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (word.id === 0) {
    return null;
  }
  const inputTxt = (e) => {
    setEditVal(e.target.value);
    console.log(editVal);
  };
  return (
    <Todolist>
      <tr key={list.id} className={inputVal ? "show" : ""}>
        <td>
          <input type="checkbox" checked={inputVal} onChange={formEdit} />
        </td>
        <div>
          {switchValue[list.id] ? (
            <input onChange={inputTxt} defaultValue={listitem}></input>
          ) : (
            <p>{listitem}</p>
          )}
        </div>
        <td>
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

          <DeleteBtn onClick={onDel}>삭제</DeleteBtn>
        </td>
      </tr>
    </Todolist>
  );
}
const Todolist = styled.div`
  // max-width: 1000px;
  // width: 600px;
  // margin: 0 auto;
  // table {
  //   border: 1.3px solid pink;
  //   border-collapse: collapse;
  // }
  // tr,
  // td {
  //   test-align: center;
  //   border: 1.2px solid pink;
  // }
  .show {
    background-color: #f0f0f0;
  }
`;
const ViewBtn = styled.button``;
const CancleBtn = styled.button``;
const DeleteBtn = styled.button``;

export default TodoList;
