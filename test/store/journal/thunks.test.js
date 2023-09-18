import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";




describe('pruebas en thunks de journal', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(()=> jest.clearAllMocks());




    test('startNewNote debe de crar una nueva nota', async() => {


        const uid = 'Test-uid'

        getState.mockReturnValue({auth:{uid:uid}})



        await startNewNote()(dispatch,getState);

        expect( dispatch ).toHaveBeenCalledWith(savingNewNote());
        expect (dispatch).toHaveBeenCalledWith(addEmptyNote({
            body: "",
            title: "",
            id:expect.any(String),
            date: expect.any(Number)
        }))
        expect (dispatch).toHaveBeenCalledWith(setActiveNote({
            body: "",
            title: "",
            id:expect.any(String),
            date: expect.any(Number)
        }))


        const collectionRef = collection(FirebaseDB,`${ uid }/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];

        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);



     })
})