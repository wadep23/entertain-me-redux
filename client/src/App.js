import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";




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
