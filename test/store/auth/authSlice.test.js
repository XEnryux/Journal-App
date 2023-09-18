import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";


describe('pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {



        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");


    });

    test('debe de realizar la autenticacion', () => {


        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('debe de realizar el logout ', () => {

        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined

        })

    });

    test('debe de realizar el logout y mostrar mensaje de error ', () => {

        const errorMessage = "credenciales invalidas"

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage

        })

    })

    
    test('debe de cambiar el estado a checking ', () => {


        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking')

    })






})