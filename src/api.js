import axios from "axios";

export const signUp = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup",
      data,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin",
      data,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTodos = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
  };
  try {
    const response = await axios.get(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
  };
  try {
    const response = await axios.post(
      "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos",
      data,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updataTodo = async (data, word) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
  };
  try {
    const response = await axios.put(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${word.id}`,
      data,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (word) => {
  const headers = {
    Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
  };
  try {
    const response = await axios.get(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${word.id}`,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
