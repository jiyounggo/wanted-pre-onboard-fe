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
    if (error.request.status === 400) {
      alert("이미 존재하는 이메일 입니다.");
    }
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
    if (error.request.status === 404) {
      alert("존재하지 않는 이메일 입니다.");
    } else if (error.request.status === 401) {
      alert("사용자 정보가 일치하지 않습니다.");
    }
  }
};
