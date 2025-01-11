import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try{

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials });

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        

    }catch (error){

        // console.log(error);

        // const errorCode = error.code;
        const errorMessageLogin = error.message;

        return{
            ok: false,
            errorMessageLogin
        }

    }

}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try{

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        // Actualizar displayName de Firebase

        await updateProfile( FirebaseAuth.currentUser, { displayName: displayName } );

        // console.log(resp);

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    }catch(error){

        // console.log(error);
        return { ok: false, errorMessageRegister: error.message }

    }

}

export const loginWithEmailPassword = async({ email, password }) => {

    //singInWithEmailAndPassword

    try{

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );

        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    }catch(error){

        // console.log(error);
        return { ok: false, errorMessageLogin: error.message }

    }

}

export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();
    
}