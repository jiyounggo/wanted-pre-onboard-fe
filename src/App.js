import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import SingUp from "./pages/Signup";
import SingIn from "./pages/Signin";
import Todolist from "./pages/Todolist";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/todo" element={<Todolist />} />
      </Routes>
    </div>
  );
}

export default App;
