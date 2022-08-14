import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function TodoList({ list }) {
  const [isShow, setShow] = useState([]);
  const [day, setday] = useState([]);
  const [isDone, setisDone] = useState(false);
  const [switchValue, setSwitchValue] = useState([]);
  const [inputVal, setinputVal] = useState(list.isCompleted);
  const [listVal, setListVal] = useState(list.isCompleted);

  const formEdit = () => {
    setinputVal(!inputVal);
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
          <ViewBtn
            onClick={() => {
              let copy = [...switchValue];
              copy[list.id] = !copy[list.id];
              setSwitchValue(copy);
            }}
          >
            수정
          </ViewBtn>
          {isDone ? <CancleBtn>취소</CancleBtn> : null}
          <DeleteBtn>삭제</DeleteBtn>
        </td>
      </tr>
    </Todolist>
  );
}
const Todolist = styled.div`
  max-width: 1000px;
  width: 600px;
  margin: 0 auto;
  table {
    border: 1.3px solid pink;
    border-collapse: collapse;
  }
  tr,
  td {
    test-align: center;
    border: 1.2px solid pink;
  }
  .show {
    background-color: #f0f0f0;
  }
`;
const ViewBtn = styled.button``;
const CancleBtn = styled.button``;
const DeleteBtn = styled.button``;

export default TodoList;
