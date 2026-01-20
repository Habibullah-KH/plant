import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import Loading from "../components/Loading";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  const runWithLoading = async (action) => {
    setLoding(true);
    try {
      return await action();
    } catch (error) {
      setLoding(false);
      throw error;
    }
  };

  //* signup or create new user
  const createUser = (email, password) => {
    return runWithLoading(() =>
      createUserWithEmailAndPassword(auth, email, password)
    );
  };

  //! Google login
  const provider = new GoogleAuthProvider();
  const createUserByGoogl = () => {
    return runWithLoading(() => signInWithPopup(auth, provider));
  };

  //* login with email and password
  const logInUser = (email, password) => {
    return runWithLoading(() =>
      signInWithEmailAndPassword(auth, email, password)
    );
  };

  //* logout
  const logOut = () => {
    return runWithLoading(() => signOut(auth));
  };

  //*Setup profile name and profile picture
  const updateUser = (data) => {
    return updateProfile(auth.currentUser, data);
  };

  //* obsurver
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post(`${import.meta.env.VITE_SERVER_url}/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("JWT login response:", res.data);
          })
          .catch((err) => {
            console.error("Error in axios post:", err);
          });
        setLoding(false);
      } else {
        axios
          .post(
            `${import.meta.env.VITE_SERVER_url}/logout`,
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoding(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    logInUser,
    signIn: logInUser,
    updateUser,
    logOut,
    signOut: logOut,
    loding,
    setLoding,
    loading: loding,
    setLoading: setLoding,
    createUser,
    signUp: createUser,
    createUserByGoogl,
    googleSignIn: createUserByGoogl,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {loding ? (
        <Loading fullScreen message="Preparing your garden…" />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
