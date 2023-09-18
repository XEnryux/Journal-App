import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotostoActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadnotes } from "../../helpers";
import { deleteNoteById } from "./journalSlice";


export const startNewNote = ()=>{
    return async(dispatch,getState)=>{

        dispatch(savingNewNote());

const {uid }=getState().auth;


        const newNote={
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB,`${ uid }/journal/notes`));
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

       dispatch(addEmptyNote(newNote));
       dispatch(setActiveNote(newNote));
      
       


    }
}

export const startLoadingNotes =()=>{
    return async(dispatch,getState)=>{

        const {uid }=getState().auth;

       const notes = await loadnotes( uid );
       dispatch(setNotes(notes ));
    }
}

export const startSavingNote = () => {
 return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(activeNote));
 
    }
}

export const startUploadingFiles= (files = []) => {
return async (dispatch) =>{
    dispatch(setSaving());
   

    const fileUploadPromises = [];

    for ( const file of files) {
        fileUploadPromises.push(fileUpload(file))  
    }


    const photoUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotostoActiveNote(photoUrls));

}
}

export const startDeletingNote = () => {

    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        const {active: activeNote} = getState().journal;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${activeNote.id}`);

        const resp = await deleteDoc(docRef);

dispatch(deleteNoteById(activeNote.id));

    }
}