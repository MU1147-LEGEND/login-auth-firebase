import { useState } from "react";
import { auth } from "./components/firebase";
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
    // hooks
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // functions
    const sendResetEmail = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Please enter your email.", {
                position: 'bottom-center',
                pauseOnFocusLoss: false,
                pauseOnHover: false,
            });
        } else {
            try {

                await sendPasswordResetEmail(auth, email);
                toast.success('Password reset email sent!', {
                    position: 'top-center',
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                });
                navigate("/");
            } catch (error) {
                toast.error(error.message, {
                    position: 'bottom-center',
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                });
            }
        }
    }


    return (
        <>
            <section>
                <div className="container m-auto">
                    <div className="flex flex-col items-center justify-center card mt-8">
                        <h2 className="text-2xl mb-10">Forget Password</h2>
                        <form onSubmit={(e) => { sendResetEmail(e) }} className="flex flex-col items-center justify-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-black/50 rounded-md py-2 px-3"
                            />
                            <button type="submit" className="mt-8 bg-stone-500 text-white py-3 px-10 rounded-xl">Send Reset Email</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgetPass;
