import axios from "axios";
import baseURL from ".";

const token = localStorage.getItem("accessToken");

//조회
export const getTodos = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  try {
    const response = await axios.get(`${baseURL}/todos`, { headers: headers });
    return response;
  } catch (error) {
    console.error(error);
  }
};

//생성
export const createTodo = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  try {
    const response = await axios.post(`${baseURL}/todos`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

//업데이트
export const updataTodo = async (data, word) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  try {
    const response = await axios.put(`${baseURL}/todos/${word.id}`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

//삭제

export const deleteTodo = async (word) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const response = await axios.delete(`${baseURL}/todos/${word.id}`, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
