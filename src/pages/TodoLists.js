import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function TodoList({ list }) {
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);
  const [inputVal, setinputVal] = useState(list.isCompleted);
  const [btnCancle, setbtnCancle] = useState(true);
  const [BtnValue, setBtnValue] = useState(true);
  const formEdit = () => {
    setinputVal(!inputVal);
  };

  const cancle = () => {
    setbtnCancle(!btnCancle);
  };
  return (
    <Todolist>
      <tr key={list.id} className={inputVal ? "show" : ""}>
        <td>
          <input type="checkbox" checked={inputVal} onChange={formEdit} />
        </td>
        <div>
          {switchValue[list.id] ? (
            <input defaultValue={list.todo}></input>
          ) : (
            <p>{list.todo}</p>
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
              }}
            >
              확인
            </ViewBtn>
          )}
          {isDone ? <CancleBtn onClick={cancle}>취소</CancleBtn> : null}

          <DeleteBtn>삭제</DeleteBtn>
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
