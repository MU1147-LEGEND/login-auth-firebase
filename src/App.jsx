import { useEffect, useState } from "react";
import Home from "./components/home";
import Register from "./components/register";
import { SignIn } from "./components/sign-in";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";
import ForgetPass from "./forget-pass";

const App = () => {
  const [user,setUser] = useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
  }, [user]);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user? <Navigate to="/home" />: <SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPass />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
