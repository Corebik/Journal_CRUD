import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from "./";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers";
// import { deleteImageCloudinary } from "../../helpers/deleteImageCloudinary";

export const startNewNote = () => {

    return async( dispatch, getState ) => {  //getState regresa el estado del store. (Segundo argunto de la función).

        dispatch( savingNewNote() );

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB,`${uid}/journal/notes` ) );

        await setDoc( newDoc, newNote ); // setDoc pide la referencia al documento donde quiere insertar (primer argumento). Y el nuevo objeto que se va a insertar (segundo argumento)

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );


    }

}

export const startLoadingnotes = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) );

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        //La siguiente línea se utiliza para eliminar una propiedad de un objeto en JS.
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB,`${ uid }/journal/notes/${ note.id }` );
        // Si hay campos en noteToFireStore que no existian anteriormente en la base de datos, entonces merge: True hace que los campos que estaban en la base de datos anteriormente, se mantengan.
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( noteUpdated( note ) );

    } 

}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for( const file of files ) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ));

    }
}

export const startDeletingNote = () => {

    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        // const delImgCloud = await deleteImageCloudinary( note.imageUrls );

        // console.log( delImgCloud );

        const docRef = doc( FirebaseDB,`${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );        

        dispatch( deleteNoteById( note.id ) );

    }
}