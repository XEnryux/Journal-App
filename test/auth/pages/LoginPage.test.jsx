import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks"


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks',()=>({
    startGoogleSignIn: ()=> mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email,password})=> {
       return ()=> mockStartLoginWithEmailPassword({email,password})
    }
}));

jest.mock('react-redux', ()=>({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=>(fn)=>fn(),
}));




const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('pruebas en el LoginPage', () => {


    beforeEach(()=>jest.clearAllMocks());

    test('debe de mostrar el componente correctamente ', () => {

        render(
            <Provider store={store} >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);


    });

    test('el boton de google debe de llamar el dispatch con startGoogleSignIn', () => {


        render(
            <Provider store={store} >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );


        const googlebtn = screen.getByLabelText('google-btn');
        fireEvent.click(googlebtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

test('submit debe de llamar startLoginWithEmailPassword ', () => { 

    const email = 'fernando@google.com';
    const password = '123456';
    
    render(
        <Provider store={store} >
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
    );

    const emailField = screen.getByRole('textbox',{name: 'correo'});
    fireEvent.change(emailField,{target: {name:'email',value: email}});

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField,{target: {name:'password',value: password}});

    const form = screen.getByLabelText('submit-form');
    fireEvent.submit(form);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
        email:email,
        password: password
    })




 })

});