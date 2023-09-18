import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { logout } from "../../store/auth/authSlice";


export const AuthRouter = () => {

  const {status}= useSelector(state => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async(user)=>{
        if(!user) return dispatch(logout());

        const {uid,email,displayName,photoURL}= user
        dispatch(login({uid,email,displayName,photoURL}))

      })
    
    }, [])
    
    if (status ==='authenticated' ){
      return <Navigate to="/*"/>

    }
  return (
    <>
      <Outlet />
    </>
  );
};
