import { Routes, Route, Link } from "react-router-dom";
import SingUp from "./pages/Signup";
import SingIn from "./pages/Signin";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
