import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";




require('dotenv').config()

function App() {
  return (

    <div>
      <Navbar />
      <Login />
      <SignUpForm />
    </div>
    
  );
}

export default App;
