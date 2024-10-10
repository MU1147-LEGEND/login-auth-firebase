import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Adjust the path as necessary
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setDoc, doc } from 'firebase/firestore';


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.name === "" || formData.email === "" || formData.password === "") {
            toast.warning("Please fill all input fields", { position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false });
        }
        else {
            try {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password, formData.name);
                const user = auth.currentUser;
                if (user) {
                    await setDoc(doc(db, "Users", user.uid), {
                        email: user.email,
                        name: formData.name,
                    });
                }
                toast.success("Account Registration Success", { position: "top-center", pauseOnHover: false, pauseOnFocusLoss: false });
                goToSignIn();
            } catch (err) {
                toast.error(err.code, {
                    position: "bottom-center", pauseOnHover: false, pauseOnFocusLoss: false
                });
            }
        }
    }
    const goToSignIn = () => {
        navigate("/")
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = "Name is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (!Object.keys(formErrors).length === 0) {
            setErrors(formErrors);
        }
        // else {}
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
                <form onSubmit={(e) => { handleSubmit(e); handleRegister(e); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 outline-none rounded-md p-2 focus:ring focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}

                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}

                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4">Have an account? <span onClick={goToSignIn} className="cursor-pointer  text-green-600 font-bold hover:text-green-400">Log in</span></p>
            </div>
        </div>
    );
};

export default Register;
