import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

function Todo() {
  const [isShow, setShow] = useState(false);
  const [day, setday] = useState([]);
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
              <td>오늘은 밥을 먹어야겠다 하하하</td>
              <td>
                <ViewBtn>수정</ViewBtn>
                <CancleBtn>취소</CancleBtn>
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
