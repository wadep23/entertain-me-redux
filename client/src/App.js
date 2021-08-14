import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Navbar } from "react-bootstrap";

require('dotenv').config()

function App() {
  return (
    
    <div>
      <Navbar />
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
