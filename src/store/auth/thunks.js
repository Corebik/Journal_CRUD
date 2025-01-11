import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../app';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( /* email, password*/ ) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();
        
        if( !result.ok ) return dispatch( logout( result.errorMessageLogin ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessageRegister } = await registerUserWithEmailPassword({ email, password, displayName });

        if(!ok) return dispatch( logout({ errorMessageRegister }) );
        dispatch( login({ uid, displayName, email, photoURL }) );

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await loginWithEmailPassword({ email, password });

        if( !resp.ok ) return dispatch( logout( resp ) );

        dispatch( login( resp ) );

    }

}

export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }
}