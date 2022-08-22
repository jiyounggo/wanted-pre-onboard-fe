import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import SingUp from "./components/Signup";
import SingIn from "./components/Signin";
import Todo from "./components/Todo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<div>없는페이지 입니다</div>} />
      </Routes>
    </>
  );
}

export default App;
