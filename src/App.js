import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./allfile/loginpage/login.css";
import Login from "./allfile/loginpage/login";
import "./allfile/loginpage/login.css";
import "./allfile/loginpage/mainpage.css";
import Mainpage from "./allfile/loginpage/mainpage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/user" element={<Mainpage></Mainpage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
