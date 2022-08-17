import axios from "axios";
import baseURL from ".";

//회원가입
export const signUp = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

//로그인
export const signIn = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${baseURL}/auth/signin`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
