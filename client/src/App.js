import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
require('dotenv').config()

function App() {
  return (
    <div>
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
