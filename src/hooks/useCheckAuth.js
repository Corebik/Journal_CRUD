import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";
import { startLoadingnotes } from "../store/app";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged( FirebaseAuth, async( user ) => {

        if( !user ) return dispatch( logout() );
        
        const { uid, email, displayName, photoURL } = user

        dispatch( login( { uid, email, displayName, photoURL } ) );
        dispatch( startLoadingnotes() );

        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        status
    };

}
