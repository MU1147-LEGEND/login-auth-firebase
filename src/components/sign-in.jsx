import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useNavigate } from "react-router-dom"
import { auth } from "./firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.warning("Please enter your email.", { position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false });
    } else if (pass === "") {
      toast.warning("Please enter password", { position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false });
    } else {

      try {
        await signInWithEmailAndPassword(auth, email, pass);
        toast.success("Logged in Successfully", {
          position: "top-center", pauseOnHover: false, pauseOnFocusLoss: false
        });
        onSignIn();
      } catch (err) {
        toast.error(err.code, {
          position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false
        });
      }
    }
  }

  const goToForget = ()=>{
    navigate("/forget-password");
  }

  const register = () => {
    navigate("/register");
  }
  const onSignIn = () => {
    navigate("/home");
  }
  return (
    <>
      <section className="sign-in main-container card mt-[25%] md:mt-[20%] lg:mt-[10%] font-suse border-[#029FAE80]">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}
          autoComplete="on"
          className="child-container w-[90%] m-auto">

          <h1 className="text-center text-2xl mb-6 font-semibold">Sign In</h1>
          {/* inputs section */}
          <div className="inputs flex flex-col gap-4">
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder="Enter your Email" className="inputBox" autoComplete="on" />
            <input onChange={(e) => { setPass(e.target.value) }} value={pass} type="password" placeholder="Enter Password" className="inputBox" autoComplete="on" />
          </div>

          {/* forget password section */}
          <div className="remember flex justify-between mt-6">
            <div className="checkbox-parent flex gap-1"><input type="checkbox" name="remember" id="remember" className="checkbox" />
              <label htmlFor="remember" className="select-none text-black/70"> Remember Me</label>
            </div>
            <button type="button" onClick={goToForget} className="text-[#029FAE] ">Forget Password</button>
          </div>

          {/* sign in button */}
          <div className="singInBtn flex flex-col justify-center items-center mt-6">
            <button type="submit" className=" bg-[#029FAE] py-4 w-full text-center group text-white rounded-lg hover:bg-[#00b3b3]">Sign In </button>
            <span className="my-6">Don&apos;t have account? <button onClick={register} className="text-[#029FAE] font-semibold">Sign Up</button> </span>
          </div>
        </form>
      </section>
    </>
  )
}
