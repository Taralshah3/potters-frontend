import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { constants, endpoints, firebaseConfig } from "../constants";
import { useState } from "react";
import Button from 'react-bootstrap/Button';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



interface AuthGoogleInterfrace {
    redirect: (redirect: boolean) => void;
}


const AuthGoogle = (props: AuthGoogleInterfrace) => {

    const successfulLogin = (token: string) => {
        window.localStorage.setItem(constants.authHeader, token);
        props.redirect(true);
    };

    const handleGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {

            const data = {
                idToken: result.user.uid,
                email: result.user.email,
                profilePicture: result.user.photoURL,
                name: result.user.displayName
            }

            fetch(`${constants.apiUrl}${endpoints.googleAuth}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                if (response.ok) {
                    const data: any = await response.json();
                    const token: string = data.token;
                    successfulLogin(token);
                }
            })
        })
    }
    return (
        <div>
            <Button onClick={handleGoogle} variant="primary">Sign in</Button>
        </div>
    )
}

export default AuthGoogle;


