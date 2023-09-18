import { LoginWithEmailPassword, logoutFirebase, registerUserWithEmail, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuth = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())


    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch(logout(result.errorMessage))

        dispatch(login(result))



    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const {ok,uid,photoURL,errorMessage} = await registerUserWithEmail({ email, password, displayName });

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid,displayName,email,photoURL}));

    }
}

export const startLoginWithEmailPassword = ({email,password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result  = await LoginWithEmailPassword({email,password});

        if (!result.ok) return dispatch( logout( result ) )

        dispatch(login(result));
            
        


    }
}
export const startLogout = () => {
    return async(dispatch)=>{

        await logoutFirebase();

        dispatch( clearNotesLogout());

        dispatch(logout());
    }
}