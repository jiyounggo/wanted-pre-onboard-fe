import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function Todo() {
  const [isShow, setShow] = useState(false);
  const [day, setday] = useState([]);
  const [isDone, setisDone] = useState(false);
  const [inputval, setinputval] = useState(false);
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
        console.log(res.data);
        setday(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleDone = () => {
    setShow(!isShow);
  };

  const BtnSwitch = () => {
    setinputval(!inputval);
    console.log(inputval);
    // setisDone(!isDone);
  };
  return (
    <>
      <h2>Todolist</h2>
      <Todolist>
        <table>
          <tbody>
            <tr className={isShow ? "show" : ""}>
              <td>
                <input type="checkbox" checked={isShow} onChange={toggleDone} />
              </td>
              <div>
                {inputval ? <input defaultValue={"안녕"}></input> : <p>안녕</p>}
              </div>

              <td>
                <ViewBtn onClick={BtnSwitch}>수정</ViewBtn>
                {isDone ? <CancleBtn>취소</CancleBtn> : null}
                <DeleteBtn>삭제</DeleteBtn>
              </td>
            </tr>
          </tbody>
        </table>
      </Todolist>
    </>
  );
}
const Todolist = styled.div`
  width: 100%;
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

export default Todo;
