
import { LoginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuth, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';



jest.mock('../../../src/firebase/providers');

describe('pruebas en thunks', () => { 

    const dispatch = jest.fn();

    beforeEach(()=> jest.clearAllMocks());


    test('debe de invocar el checking credentials', async() => {


        await checkingAuth()(dispatch);

        expect(dispatch).toBeCalledWith(checkingCredentials());
       

    });

    test('debe de invocar startGoogleSignIn y login', async() => {

        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
       

    });

    test('debe de invocar startGoogleSignIn y logout', async() => {


        const loginData = {ok: false, errorMessage: 'un error en google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
       

    });

    test('debe de invocar startLoginWithEmailPassword, debe de llamar checking credentials', async() => {


        const loginData = {ok: true, ...demoUser };
        const formData = {email: demoUser.email, password: '123456' };

        await LoginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword (formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith(login(loginData));
       
    
    });

    test('debe de invocar startLogout', async() => {


        await startLogout ()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith(clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith(logout());
       
    
    });
 });