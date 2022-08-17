import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import SingUp from "./pages/Signup";
import SingIn from "./pages/Signin";
import Todo from "./pages/Todo";
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
