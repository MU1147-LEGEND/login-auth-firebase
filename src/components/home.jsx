import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      auth?.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const docRef = doc(db, 'Users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          toast.info("User not Logged in", {pauseOnFocusLoss:false, pauseOnHover:false,});
        }
      });
    };
    fetchUserData();
  }, []);

  const onLogOut =async () => {
    try {
      if (auth.currentUser) {
        await auth.signOut();
        toast.error("Logout Success", {
          position: 'bottom-center', pauseOnFocusLoss: false, pauseOnHover: false,
        });
        navigate("/");
      } else {
        toast.error("Waiting to logout", {
          position: 'bottom-center', pauseOnFocusLoss: false, pauseOnHover: false,
        });
        navigate("/");
      }
    } catch (err) {
      toast.error(err.code, {
        position: 'bottom-center', pauseOnFocusLoss: false, pauseOnHover: false,
      });
    }
  }

  return (
    <>
      <section className='flex items-center justify-center min-h-screen'>
        <div className="container h-screen flex items-center justify-center">
          <div className="card flex flex-col">
            <h1 className='text-xl'>Name: {userDetails?.name}</h1>
            <p>Email: {userDetails?.email}</p>
            <button onClick={onLogOut} type="submit" className=" bg-[#029FAE] py-4 w-full text-center group mt-8 text-white rounded-lg hover:bg-[#00b3b3]">Log Out </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home